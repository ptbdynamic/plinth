/**
 * Opens every docs page at the three widths and fails if one scrolls sideways (#70). A wide
 * table, like Storybook's Controls table, has to scroll inside itself instead of widening the
 * page; preview.css does that for tables in `.sbdocs-content`.
 *
 * The three widths load side by side, each in its own page. With a shard (`{ index: 2, total: 4 }`),
 * it checks every fourth docs page, starting with the second, so CI's shards share the pages.
 *
 * A page is measured once Storybook says the docs have rendered (its `docsRendered` event) and
 * the fonts have loaded. Waiting for the network to go quiet instead timed out on a busy machine
 * (#163), though the pages render in under a second.
 */
import { chromium } from 'playwright';

const widths = [390, 768, 1440];

export async function checkDocsWidth(
  url: string,
  shard = { index: 1, total: 1 },
): Promise<string[]> {
  const index = (await (await fetch(`${url}/index.json`)).json()) as {
    entries: Record<string, { id: string; type: string }>;
  };
  const docs = Object.values(index.entries)
    .filter((entry) => entry.type === 'docs')
    .filter((_, position) => position % shard.total === shard.index - 1);

  const browser = await chromium.launch();
  const failures: string[] = [];
  try {
    await Promise.all(
      widths.map(async (width) => {
        const page = await browser.newPage({ viewport: { width, height: 900 } });
        await page.addInitScript(markDocsRendered);
        for (const { id } of docs) {
          await page.goto(`${url}/iframe.html?viewMode=docs&id=${id}`, { waitUntil: 'load' });
          await page.waitForFunction(() => 'plinthDocsRendered' in window);
          await page.evaluate(() => document.fonts.ready);
          await page.locator('.sbdocs-content').waitFor();
          const extra = await page.evaluate(
            () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
          );
          if (extra > 0) failures.push(`${id} at ${width} px scrolls ${extra} px sideways`);
        }
      }),
    );
  } finally {
    await browser.close();
  }
  return failures;
}

/**
 * Runs in the page before Storybook: when the preview sets up its channel, listens on it for
 * `docsRendered` and marks the window.
 */
function markDocsRendered() {
  type Channel = { on: (event: string, listener: () => void) => void };
  let channel: Channel | undefined;
  Object.defineProperty(window, '__STORYBOOK_ADDONS_CHANNEL__', {
    configurable: true,
    get: () => channel,
    set(value: Channel) {
      channel = value;
      value.on('docsRendered', () => Object.assign(window, { plinthDocsRendered: true }));
    },
  });
}

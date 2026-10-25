/**
 * Opens every docs page at the three widths and fails if one scrolls sideways (#70). A wide
 * table, like Storybook's Controls table, has to scroll inside itself instead of widening the
 * page; preview.css does that for tables in `.sbdocs-content`.
 *
 * The three widths load side by side, each in its own page. With a shard (`{ index: 2, total: 4 }`),
 * it checks every fourth docs page, starting with the second, so CI's shards share the pages.
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
        for (const { id } of docs) {
          await page.goto(`${url}/iframe.html?viewMode=docs&id=${id}`, {
            waitUntil: 'networkidle',
          });
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

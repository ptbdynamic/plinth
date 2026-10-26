// Markup contract: packages/css/src/components/code-block.css
import {
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentProps,
  type MouseEvent,
  type ReactNode,
} from 'react';
import { PlinthButton } from './PlinthButton';
import {
  checkedTab,
  codeBlockTabs,
  codeBlockText,
  downloadText,
  type CodeBlockTab,
} from './code-block';
import { classNames, hasContent } from './markup';

interface CodeBlockOptions {
  /** A file name or a short label above the code; it may hold a little markup (a badge). */
  label?: ReactNode;
  /** The highlighter's markup for the code (trusted, not escaped), in place of `children`. */
  html?: string;
  /** Language tabs (up to six), each with its own code; `children` is then not used. */
  tabs?: CodeBlockTab[];
  /** The tab that starts checked (later the browser keeps it); the first when unknown. */
  selected?: string;
  /** The tabs' accessible name. */
  tabsLabel?: string;
  /** Shows the copy button. */
  copy?: boolean;
  copyLabel?: string;
  /** What the button and the status say for two seconds after copying. */
  copiedLabel?: string;
  /** The code was copied to the clipboard (Vue's `copied` event). */
  onCopied?: (text: string) => void;
  /** The file name the download button saves the code as (a .txt); no button without one. */
  download?: string;
  downloadLabel?: string;
  /** What the download button and its status say for two seconds after saving. */
  downloadedLabel?: string;
  /** The code was saved as a file (Vue's `downloaded` event). */
  onDownloaded?: (text: string) => void;
}

export type PlinthCodeBlockProps = CodeBlockOptions &
  Omit<ComponentProps<'div'>, keyof CodeBlockOptions>;

const Code = ({ children, html }: { children?: ReactNode; html?: string }) => (
  <pre className="plinth-code-block-code" dir="ltr" tabIndex={0}>
    {html === undefined ? (
      <code>{children}</code>
    ) : (
      <code dangerouslySetInnerHTML={{ __html: html }} />
    )}
  </pre>
);

export function PlinthCodeBlock({
  id,
  label,
  html,
  tabs: allTabs = [],
  selected,
  tabsLabel = 'Language',
  copy = true,
  copyLabel = 'Copy',
  copiedLabel = 'Copied',
  onCopied,
  download,
  downloadLabel = 'Download',
  downloadedLabel = 'Downloaded',
  onDownloaded,
  className,
  children,
  ...rest
}: PlinthCodeBlockProps) {
  const generatedId = useId();
  const rootId = id?.trim() || undefined;
  const name = `${rootId ?? `plinth-code-block-${generatedId}`}-language`;
  const tabs = codeBlockTabs(allTabs);
  const checked = checkedTab(tabs, selected);
  const filename = download?.trim() || undefined;

  // The clipboard and downloads are only there in the browser, so the buttons show once mounted.
  const [mounted, setMounted] = useState(false);
  const [canCopy, setCanCopy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const downloadTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    setMounted(true);
    setCanCopy(Boolean(navigator.clipboard));
    return () => {
      clearTimeout(timer.current);
      clearTimeout(downloadTimer.current);
    };
  }, []);

  async function copyCode(event: MouseEvent<HTMLButtonElement>) {
    const text = codeBlockText(event.currentTarget);
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return;
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
    onCopied?.(text);
  }

  function downloadCode(event: MouseEvent<HTMLButtonElement>) {
    const text = codeBlockText(event.currentTarget);
    downloadText(filename!, text);
    setDownloaded(true);
    clearTimeout(downloadTimer.current);
    downloadTimer.current = setTimeout(() => setDownloaded(false), 2000);
    onDownloaded?.(text);
  }

  return (
    <div id={rootId} {...rest} className={classNames('plinth-code-block', className)}>
      <div className="plinth-code-block-header">
        {hasContent(label) ? <span className="plinth-code-block-label">{label}</span> : null}
        {tabs.length ? (
          <div className="plinth-code-block-tabs" role="radiogroup" aria-label={tabsLabel}>
            {tabs.map((tab, i) => (
              <label key={i} className="plinth-code-block-tab">
                <input
                  type="radio"
                  className="plinth-code-block-tab-input"
                  name={name}
                  defaultChecked={i === checked}
                />
                <span className="plinth-code-block-tab-label">{tab.label}</span>
              </label>
            ))}
          </div>
        ) : null}
        {copy ? (
          <>
            <PlinthButton
              className="plinth-code-block-copy"
              variant="ghost"
              size="sm"
              hidden={!canCopy}
              onClick={copyCode}
            >
              {copied ? copiedLabel : copyLabel}
            </PlinthButton>
            <span className="plinth-code-block-status" role="status">
              {copied ? copiedLabel : ''}
            </span>
          </>
        ) : null}
        {filename ? (
          <>
            <PlinthButton
              className="plinth-code-block-download"
              variant="ghost"
              size="sm"
              hidden={!mounted}
              onClick={downloadCode}
            >
              {downloaded ? downloadedLabel : downloadLabel}
            </PlinthButton>
            <span className="plinth-code-block-status" role="status">
              {downloaded ? downloadedLabel : ''}
            </span>
          </>
        ) : null}
      </div>
      {tabs.length ? (
        tabs.map((tab, i) => (
          <Code key={i} html={tab.html}>
            {tab.code}
          </Code>
        ))
      ) : (
        <Code html={html}>{children}</Code>
      )}
    </div>
  );
}

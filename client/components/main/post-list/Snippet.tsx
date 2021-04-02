/** @jsxRuntime classic */
/** @jsx jsx */
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism, okaidia } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { jsx, css, useTheme, Theme } from '@emotion/react';

export interface SnippetProps {
  id: number;
  title: string;
  markdown: string;
  writer: string;
  createdAt: string;
}

function Snippet({ id, title, markdown, writer, createdAt }: SnippetProps) {
  const theme: Theme = useTheme();

  const copyCodeToClipboard = () => {
    const t = document.createElement('textarea');
    document.body.appendChild(t);
    const clearMark = markdown.replace(/~~~[a-zA-Z]*\n/g, '').trim();
    t.value = clearMark;
    t.select();
    document.execCommand('copy');
    document.body.removeChild(t);
  };

  const renderLang = () => {
    const part = markdown.match(/~~~[a-zA-Z]*\n/);
    console.log(part);
    if (part) {
      const lang = part[0].match(/[a-zA-Z]*\n/);
      console.log(lang);
      if (lang) return lang[0];
    }
  };

  return (
    <div css={container}>
      <Link href={`/post/[post]`} as={`/post/${id}`}>
        <a css={css``}>
          <h3 css={h3}>{title}</h3>
        </a>
      </Link>
      <div css={main}>
        <span css={$lang}>{renderLang()}</span>
        <button css={clipBtn} onClick={() => copyCodeToClipboard()}>
          copy
        </button>
        <ReactMarkdown
          css={output}
          renderers={{
            code: ({ language, value }: any) => {
              if (!value) {
                return <pre className={language}>{value || ''}</pre>;
              }

              return <SyntaxHighlighter style={theme.mode === 'light' ? prism : okaidia} language={language} children={value} />;
            },
          }}
          children={markdown}
        />
      </div>
      <div css={bottom}>
        Posted on {new Date(createdAt).toLocaleDateString()} By <span css={$writer}>{writer}</span>
      </div>
    </div>
  );
}
// html이 아니라 마크다운 자체를 사용해도 되는듯!

export default Snippet;

const container = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  height: 20rem;

  background: ${theme.mode === 'light' ? '#f5f2f0' : '#272822'};
`;

const h3 = (theme: Theme) => css`
  flex: 0 1 auto;
  padding: 0.9rem;
  width: 100%;
  /* background: darkblue; */
  background: ${theme.color.primary};
  text-align: center;
  color: #ffffffde;
  cursor: pointer;
`;

const main = css`
  position: relative;
  flex: 1 1 auto;
  width: 100%;
  overflow: auto;
  margin-bottom: 0.3rem;
`;

const $lang = (theme: Theme) => css`
  position: absolute;
  top: 0.2rem;
  left: 0.5rem;
  border: none;
  background: none;
  color: ${theme.color.secondaryVariant};
`;

const clipBtn = css`
  position: absolute;
  top: 0.2rem;
  right: 0.5rem;
  border: none;
  background: none;
  color: pink;

  &:hover {
    cursor: pointer;
  }
`;

const output = css`
  width: 100%;
  padding-right: 1rem;
`;

const bottom = (theme: Theme) => css`
  padding: 0.7rem;
  border-top: 1px solid ${theme.mode === 'light' ? '#DDDDDD' : 'rgba(0, 0, 0, 0.3)'};
  color: ${theme.color.onBackgroundLow};
  font-size: 0.8rem;
`;

const $writer = (theme: Theme) => css`
  color: ${theme.color.onBackground};
  font-weight: 700;
  font-size: 0.9rem;
`;

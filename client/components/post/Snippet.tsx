/** @jsxRuntime classic */
/** @jsx jsx */
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism, okaidia } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { jsx, css, useTheme, Theme } from '@emotion/react';

export interface SnippetProps {
  title: string;
  markdown: string;
  writer: string;
  slug: string;
  createdAt: string;
}

function Snippet({ title, markdown, writer, slug, createdAt }: SnippetProps) {
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

  return (
    <div css={container}>
      <h3 css={h3}>{title}</h3>
      <div css={main}>
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
        Posted on {createdAt} By {writer}
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
`;

const main = css`
  position: relative;
  flex: 1 1 auto;
  width: 100%;
  overflow: auto;
  margin-bottom: 0.3rem;
`;

const clipBtn = css`
  position: absolute;
  top: 0.2rem;
  right: 0.2rem;
  border: none;
  background: none;
  color: pink;

  &:hover {
    cursor: pointer;
  }
`;

const output = css`
  width: 100%;
`;

const bottom = (theme: Theme) => css`
  padding: 0.7rem;
  border-top: 1px solid ${theme.mode === 'light' ? '#DDDDDD' : 'rgba(0, 0, 0, 0.3)'};
  color: ${theme.color.secondary};
`;

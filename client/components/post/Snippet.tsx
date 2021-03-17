/** @jsxRuntime classic */
/** @jsx jsx */
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism, okaidia } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { jsx, css, useTheme, Theme } from '@emotion/react';

export interface SnippetProps {
  title: string;
  markdown: string;
}

function Snippet({ title, markdown }: SnippetProps) {
  const theme: Theme = useTheme();

  const copyCodeToClipboard = () => {
    const t = document.createElement('textarea');
    document.body.appendChild(t);
    const clearMark = markdown.replace(/~~~js/, '').trim();
    t.value = clearMark;
    t.select();
    document.execCommand('copy');
    document.body.removeChild(t);
  };

  return (
    <div css={container}>
      <h3>{title}</h3>
      <button onClick={() => copyCodeToClipboard()}>copy</button>
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
  );
}

export default Snippet;

const container = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0.5rem;

  width: 20rem;
  height: 20rem;
`;

const output = css`
  width: 100%;
  height: 100%;
  overflow: auto;
`;

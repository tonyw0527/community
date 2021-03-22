/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism, okaidia } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { jsx, css, useTheme, Theme } from '@emotion/react';
import dynamic from 'next/dynamic';
const CodeWithCodemirror = dynamic(() => import('./CodeMirror'), { ssr: false });

export interface EditorProps {
  markdown: string;
  onSetMarkdown: (markdown: string) => void;
}

function Editor({ markdown, onSetMarkdown }: EditorProps) {
  const theme: Theme = useTheme();

  const handleOnSetMarkdown = (markdown: string) => {
    onSetMarkdown(markdown);
  };

  return (
    <>
      <div css={container}>
        <CodeWithCodemirror css={input} markdown={markdown} onSetMarkdown={handleOnSetMarkdown} />
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
    </>
  );
}

export default Editor;

const container = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30rem;
`;

const input = css`
  width: 20rem;
  height: 100%;
  font-size: 1.3rem;
  border: 1px solid black;

  .CodeMirror {
    height: 100%;
  }
`;

const output = css`
  width: 20rem;
  height: 100%;
  padding: 0 1rem;
  border: 1px solid black;
  overflow: auto;
`;

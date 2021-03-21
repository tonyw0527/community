/** @jsxRuntime classic */
/** @jsx jsx */
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism, okaidia } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { jsx, css, useTheme, Theme } from '@emotion/react';

import dynamic from 'next/dynamic';
const CodeWithCodemirror = dynamic(() => import('./CodeMirror'), { ssr: false });

function Editor() {
  const theme: Theme = useTheme();
  const [markdown, setMarkdown] = useState<string>('~~~ts\n');

  const onSetMarkdown = (markdown: string) => {
    setMarkdown(markdown);
  };

  return (
    <div css={container}>
      <div css={wrapper}>
        <CodeWithCodemirror css={input} markdown={markdown} onSetMarkdown={onSetMarkdown} />
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
    </div>
  );
}

export default Editor;

const container = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const wrapper = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const input = css`
  margin: 0.5rem;
  width: 20rem;
  height: 50vh;
`;

const output = css`
  margin: 0.5rem;
  width: 20rem;
  height: 50vh;
`;

/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { jsx, css, useTheme, Theme } from '@emotion/react';
import dynamic from 'next/dynamic';
const CodeWithCodemirror = dynamic(() => import('./CodeMirror'), { ssr: false });
import ReactMarkdown from './ReactMarkdown';

export interface EditorProps {
  markdown: string;
  onSetMarkdown: (markdown: string) => void;
}

function Editor({ markdown, onSetMarkdown }: EditorProps) {
  const handleOnSetMarkdown = (markdown: string) => {
    onSetMarkdown(markdown);
  };

  return (
    <>
      <div css={container}>
        <CodeWithCodemirror css={input} markdown={markdown} onSetMarkdown={handleOnSetMarkdown} />
        <ReactMarkdown css={output} markdown={markdown} />
      </div>
    </>
  );
}

export default Editor;

const container = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70%;
`;

const input = css`
  width: 40%;
  height: 100%;
  font-size: 1.3rem;
  border: 1px solid black;

  .CodeMirror {
    height: 100%;
  }
`;

const output = css`
  width: 40%;
  height: 100%;
  padding: 0 1rem;
  border: 1px solid black;
  overflow: auto;
`;

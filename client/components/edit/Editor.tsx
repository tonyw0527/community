/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/react';
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
      <div css={$container}>
        <CodeWithCodemirror css={$input} markdown={markdown} onSetMarkdown={handleOnSetMarkdown} />
        <div css={$cutline} />
        <ReactMarkdown css={$output} markdown={markdown} />
      </div>
    </>
  );
}

export default Editor;

const $container = css`
  display: flex;
  justify-content: center;

  width: 100%;
  height: 100%;
  min-height: 100vh;
`;

const $input = css`
  flex: 1;
  height: 100%;
  font-size: 1.3rem;

  .CodeMirror {
    height: 100%;
  }
`;

const $cutline = css`
  background: gray;
  width: 0.2rem;
  margin: 0 1rem;
  height: 100%;
`;

const $output = css`
  flex: 1;
  height: 100%;
  overflow: auto;
`;

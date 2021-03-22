/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState } from 'react';
import { jsx, css, useTheme, Theme } from '@emotion/react';
import Editor from './Editor';
import { Button } from '../common';
import { useRootState, useAppDispatch } from '../../store/store';
import { setMarkdown } from '../../store/slices/editor';

interface NewProps {
  markdown: string;
  onSetMarkdown: (markdown: string) => void;
}

function New({ markdown, onSetMarkdown }: NewProps) {
  return (
    <div css={container}>
      <Editor markdown={markdown} onSetMarkdown={onSetMarkdown} />
      <div css={btnBox}>
        <Button>Cancel</Button>
        <Button>Post</Button>
      </div>
    </div>
  );
}

export default function connect() {
  const { markdown } = useRootState((state) => state.editor);
  const dispatch = useAppDispatch();

  const onSetMarkdown = (markdown: string) => {
    dispatch(setMarkdown(markdown));
  };

  return <New markdown={markdown} onSetMarkdown={onSetMarkdown} />;
}

const container = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;
`;

const btnBox = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

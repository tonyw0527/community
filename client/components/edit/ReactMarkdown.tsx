import React from 'react';
import ReactMarkdownOrigin from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism, okaidia } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { useTheme, Theme } from '@emotion/react';

interface ReactMarkdownProps {
  markdown: string;
}

function ReactMarkdown(props: ReactMarkdownProps) {
  const theme: Theme = useTheme();

  return (
    <ReactMarkdownOrigin
      renderers={{
        code: ({ language, value }: any) => {
          if (!value) {
            return <pre className={language}>{value || ''}</pre>;
          }

          return <SyntaxHighlighter style={theme.mode === 'light' ? prism : okaidia} language={language} children={value} />;
        },
      }}
      children={props.markdown}
      {...props}
    />
  );
}

export default ReactMarkdown;

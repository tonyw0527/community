import { css, Global, Theme } from '@emotion/react';
import emotionNormalize from 'emotion-normalize';

export const GlobalStyle = () => {
  return (
    <Global
      styles={(theme: Theme) => css`
        ${emotionNormalize}
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        html,
        body {
          background: ${theme.color.background};
          color: ${theme.color.onBackground};
        }
      `}
    />
  );
};

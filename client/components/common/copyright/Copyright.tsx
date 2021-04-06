/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css, Theme } from '@emotion/react';

function Copyright() {
  return (
    <div css={Div}>
      {'Copyright © '}
      <a css={A} href="https://tonyw.tistory.com/">
        Snippet Bank
      </a>{' '}
      {new Date().getFullYear()}
      {'.'}
    </div>
  );
}

export default Copyright;

const Div = (theme: Theme) => css`
  margin: 1rem 0;
  text-align: center;
  font-size: 0.9rem;
  background: none;
  color: ${theme.color.onBackgroundLow};
`;

const A = (theme: Theme) => css`
  color: ${theme.color.onBackgroundLow};
  text-decoration: none;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

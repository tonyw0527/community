/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css, Theme } from '@emotion/react';

function Copyright() {
  return (
    <div css={Div}>
      {'Copyright © '}
      <a css={A} href="https://tonyw.tistory.com/">
        Community.com
      </a>{' '}
      {new Date().getFullYear()}
      {'.'}
    </div>
  );
}

export default Copyright;

const Div = (theme: Theme) => css`
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

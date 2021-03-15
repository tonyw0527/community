/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css, Theme } from '@emotion/react';

export interface InputProps {}

function Input(props: InputProps) {
  return <input css={style} {...props} />;
}

export default Input;

const style = (theme: Theme) => css`
  padding: 1.1rem 0.9rem;

  border-radius: 0.3rem;
  border: 1px solid gray;

  outline: 0;

  background: ${theme.color.background};
  color: ${theme.color.onBackground};

  &:hover {
    border: 1px solid ${theme.mode === 'light' ? '#63C5DA' : 'white'};
  }

  &:focus {
    border: 1px solid ${theme.color.secondaryVariant};
    background: ${theme.color.background};
  }
`;

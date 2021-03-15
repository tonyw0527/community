/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css, Theme } from '@emotion/react';

export interface ButtonProps {
  children: React.ReactNode;
}

function Button(props: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button css={style} {...props}>
      {props.children}
    </button>
  );
}

Button.defaultProps = {};

export default Button;

const style = (theme: Theme) => css`
  width: 10rem;
  margin: 1rem 0.5rem;
  padding: 1.1rem 0.9rem;

  border: 1px solid #79c0ff;
  border-radius: 0.5rem;
  outline: 0;

  background: ${theme.color.secondary};

  color: ${theme.color.onSecondary};

  &:hover {
    cursor: pointer;
    opacity: 0.9;
  }

  @media screen and (min-width: 769px) {
    font-size: 1.3rem;
  }
`;

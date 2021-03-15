/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css, Theme } from '@emotion/react';

export interface AnchorProps {
  children: React.ReactNode;
}

function Anchor(props: AnchorProps) {
  return (
    <a css={style} {...props}>
      {props.children}
    </a>
  );
}

Anchor.defaultProps = {};

export default Anchor;

const style = (theme: Theme) => css`
  font-size: 0.8rem;
  color: ${theme.color.secondaryVariant};
  text-decoration: none;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

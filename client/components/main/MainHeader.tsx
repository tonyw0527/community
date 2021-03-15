/** @jsxRuntime classic */
/** @jsx jsx */
import DropdownMenu from './DropdownMenu/DropdownMenu';
import { jsx, css, Theme } from '@emotion/react';

function MainHeader({ onToggleTheme }: any) {
  return (
    <header>
      <div css={Container}>
        <div css={RightSideBox}>
          <DropdownMenu onToggleTheme={onToggleTheme} />
        </div>
      </div>
    </header>
  );
}

export default MainHeader;

const Container = (theme: Theme) => css`
  width: 100vw;
  height: 3rem;
  background: ${theme.color.primary};
`;

const RightSideBox = css`
  position: absolute;
  top: 0.7rem;
  right: 1rem;
`;

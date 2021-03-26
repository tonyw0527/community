/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css, Theme } from '@emotion/react';
import Dropdown from './dropdown/Dropdown';
import Sidebar from './sidebar/Sidebar';

function MainHeader({ onToggleTheme }: any) {
  return (
    <header css={$header}>
      <Sidebar />
      <span css={$title}>{'$nippet Library'}</span>
      <div css={RightSideBox}>
        <Dropdown onToggleTheme={onToggleTheme} />
      </div>
    </header>
  );
}

export default MainHeader;

const $header = css`
  position: relative;
  width: 100vw;
  height: 3rem;
  padding: 1rem;
`;

const $title = css`
  display: inline-block;
  margin-left: 2rem;
  font-size: 1.7rem;
  font-weight: 700;
`;

const RightSideBox = css`
  position: absolute;
  top: 1.2rem;
  right: 1rem;
`;

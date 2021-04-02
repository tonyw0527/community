/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css, Theme } from '@emotion/react';
import Link from 'next/link';
import Dropdown from '../dropdown/Dropdown';
import Sidebar from '../sidebar/Sidebar';

function Header({ onToggleTheme }: any) {
  return (
    <header css={$header}>
      <Sidebar />
      <Link href="/main">
        <a css={{ textDecoration: 'none', cursor: 'pointer' }}>
          <span css={$title}>{'Snippet Bank'}</span>
        </a>
      </Link>
      <div css={RightSideBox}>
        <Dropdown onToggleTheme={onToggleTheme} />
      </div>
    </header>
  );
}

export default Header;

const $header = css`
  position: relative;
  width: 100vw;
  height: 3rem;
  padding: 1rem 6rem;

  @media screen and (max-width: 769px) {
    padding: 1rem;
  }
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
  right: 6rem;

  @media screen and (max-width: 769px) {
    right: 1rem;
  }
`;

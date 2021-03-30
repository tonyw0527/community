/** @jsxRuntime classic */
/** @jsx jsx */
import React, { ReactNode } from 'react';
import { jsx, css } from '@emotion/react';
import Header from './Header';
import { Copyright } from '../index';

interface LayoutProps {
  children: ReactNode;
  onToggleTheme: any;
}

function Layout({ children, onToggleTheme }: LayoutProps) {
  return (
    <div css={$container}>
      <Header onToggleTheme={onToggleTheme} />
      <div css={$children}>{children}</div>
      <Copyright />
    </div>
  );
}

export default Layout;

const $container = css`
  display: flex;
  flex-direction: column;
  width: 100vw;
`;

const $children = css`
  padding: 1rem 6rem;

  @media screen and (max-width: 769px) {
    padding: 1rem;
  }
`;

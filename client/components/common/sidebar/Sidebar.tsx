/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { jsx, css, Theme } from '@emotion/react';

function Sidebar() {
  return (
    <>
      <input type="checkbox" id="hamicon" css={$sidebar} />
      <label htmlFor="hamicon">
        <span></span>
        <span></span>
        <span></span>
      </label>
      <div>
        <ul>
          <li>
            <a>메뉴01</a>
          </li>
          <li>
            <a>메뉴02</a>
          </li>
          <li>
            <a>메뉴03</a>
          </li>
        </ul>
      </div>
      <label htmlFor="hamicon"></label>
    </>
  );
}

export default Sidebar;

const $sidebar = (theme: Theme) => css`
  display: none;

  & + label {
    display: inline-block;
    width: 30px;
    height: 20px;
    position: relative;
    cursor: pointer;
  }

  & + label span {
    display: block;
    position: absolute;
    width: 100%;
    height: 4px;
    border-radius: 15px;
    background: ${theme.color.onBackground};
    transition: all 0.35s;
  }

  & + label span:nth-child(1) {
    top: 0;
  }

  & + label span:nth-child(2) {
    top: 50%;
    transform: translateY(-50%);
  }

  & + label span:nth-child(3) {
    bottom: 0;
  }

  &:checked + label span:nth-child(1) {
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
  }

  &:checked + label span:nth-child(2) {
    opacity: 0;
  }

  &:checked + label span:nth-child(3) {
    bottom: 50%;
    transform: translateY(50%) rotate(-45deg);
  }

  & + label + div {
    position: fixed;
    top: 50px;
    left: -250px;
    width: 250px;
    height: 100%;
    background: ${theme.mode === 'light' ? '#FFFFFF' : '#21262D'};
    z-index: 30;
    transition: 0.35s;
  }

  &:checked + label + div {
    display: block;
    left: 0;
  }

  & + label + div + label {
    display: none;
  }

  &:checked + label + div + label {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    z-index: 1;
  }
`;

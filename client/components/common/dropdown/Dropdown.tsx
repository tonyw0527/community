/** @jsxRuntime classic */
/** @jsx jsx */
import { useRef, forwardRef } from 'react';
import Link from 'next/link';
import { useDetectOutsideClick } from '../../../lib/useDetectOutsideClick';
import DarkModeToggleButton from '../darkmode-toggle-button/DarkModeToggleButton';
import styled from '@emotion/styled';
import { jsx, css, useTheme, Theme } from '@emotion/react';
import { useRootState, useAppDispatch } from '../../../store/store';
import * as AuthActions from '../../../store/slices/auth';

export interface DropdownProps {
  nickname: string;
  email: string;
  onLogout: () => void;
  onToggleTheme: () => void;
}

export function Dropdown({ nickname, email, onLogout, onToggleTheme }: DropdownProps) {
  const dropdownRef = useRef<HTMLElement>(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const theme = useTheme();

  const onClick = () => setIsActive(!isActive);

  const onClickLogout = () => {
    onLogout();
  };

  return (
    <MenuContainer>
      <MenuTriggerBtn role="button" theme={theme} type="button" onClick={onClick}>
        <Span>User</Span>
        {/* <Img src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/df/df7789f313571604c0e4fb82154f7ee93d9989c6.jpg" alt="User avatar" /> */}
      </MenuTriggerBtn>
      <Nav data-testid="dropdown-nav" theme={theme} ref={dropdownRef} isActive={isActive ? true : false}>
        <Ul>
          <Li>
            <UserBox>
              <NickBox>{nickname ? nickname : null}</NickBox>
              <EmailBox>{email ? email : null}</EmailBox>
            </UserBox>
          </Li>
          <Li>
            <Link href="/new">
              <A>글쓰기</A>
            </Link>
          </Li>
          <Li>
            <Link href="/manage">
              <A>글관리</A>
            </Link>
          </Li>
          <Li>
            <A onClick={onClickLogout}>로그아웃</A>
          </Li>
          <Li>
            <DarkModeToggleButton onToggleTheme={onToggleTheme} />
          </Li>
        </Ul>
      </Nav>
    </MenuContainer>
  );
}

export default function connect({ onToggleTheme }: any) {
  const { authResult, logoutDone } = useRootState((state) => state.auth);
  const dispatch = useAppDispatch();

  const onLogout = () => {
    dispatch(AuthActions.logout());
  };

  return <Dropdown nickname={authResult.me.nickname} email={authResult.me.email} onLogout={onLogout} onToggleTheme={onToggleTheme} />;
}

const MenuContainer = styled.div`
  position: relative;
`;

const MenuTriggerBtn = styled.button`
  background: ${({ theme }) => theme.color.onPrimary};
  border-radius: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 6px;
  outline: 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  border: none;
  vertical-align: middle;
  transition: box-shadow 0.4s ease;

  &:hover {
    cursor: pointer;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  }
`;

const Span = styled.span`
  font-weight: 700;
  vertical-align: middle;
  font-size: 14px;
  margin: 0 10px;
`;
const Img = styled.img`
  border-radius: 90px;
`;

const menuActive = css`
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
`;

const Nav = styled.nav<{ isActive: boolean }>`
  background: ${({ theme }) => (theme.mode === 'light' ? '#FFFFFF' : '#21262D')};
  border-radius: 8px;
  position: absolute;
  top: 40px;
  right: 5px;
  width: 140px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-20px);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  text-align: center;
  ${({ isActive }) => isActive && menuActive};
  z-index: 1000;
`;

const Ul = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListStyle = (theme: Theme) => css`
  display: flex;
  justify-content: center;
  &:first-of-type {
    border-bottom: 1px solid ${theme.mode === 'light' ? '#DDDDDD' : 'rgba(0, 0, 0, 0.6)'};
  }
  &:last-child {
    border-top: 1px solid ${theme.mode === 'light' ? '#DDDDDD' : 'rgba(0, 0, 0, 0.6)'};
    border-bottom: 0;
  }
`;

function Li(props: React.LiHTMLAttributes<HTMLLIElement>) {
  return (
    <li css={ListStyle} {...props}>
      {props.children}
    </li>
  );
}

const UserBox = styled.div`
  padding: 1rem;
`;

const NickBox = styled.div`
  margin-bottom: 0.3rem;
  font-size: 1.1rem;
  font-weight: 700;
`;

const EmailBox = styled.div``;

const AnchorStyle = (theme: Theme) => css`
  display: block;
  padding: 13px 20px;
  width: 100%;
  font-size: 0.95rem;
  text-decoration: none;
  color: ${theme.mode === 'light' ? '#000000' : '#c9d1d9'};
  &:hover {
    cursor: pointer;
    background: ${theme.mode === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(0, 0, 0, 0.3)'};
  }
`;

const A: any = forwardRef(function A(props, ref): any {
  return (
    <a css={AnchorStyle} {...props}>
      {props.children}
    </a>
  );
});

import { useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { useRef } from 'react';
import { useDetectOutsideClick } from '../../lib/useDetectOutsideClick';
import styled, { css } from 'styled-components';
import { useRootState, useAppDispatch } from '../../store/store';
import * as AuthActions from '../../store/slices/auth';

function DropdownMenu() {
  const dropdownRef = useRef<HTMLElement>(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

  const { logoutDone } = useRootState((state) => state.auth);
  const dispatch = useAppDispatch();

  const onClick = () => setIsActive(!isActive);

  const onClickLogout = () => {
    dispatch(AuthActions.logout());
  };

  useEffect(() => {
    if (logoutDone) {
      alert('로그아웃 되었습니다.');
      Router.push('/');
    }
  }, [logoutDone]);

  return (
    <MenuContainer>
      <MenuTriggerBtn type="button" onClick={onClick}>
        <Span>User</Span>
        {/* <Img src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/df/df7789f313571604c0e4fb82154f7ee93d9989c6.jpg" alt="User avatar" /> */}
      </MenuTriggerBtn>
      <Nav ref={dropdownRef} isActive={isActive ? true : false}>
        <Ul>
          <Li>
            <Link href="/main">
              <A>Main</A>
            </Link>
          </Li>
          <Li>
            <A onClick={onClickLogout}>로그아웃</A>
          </Li>
          <Li>
            <A
              onClick={() => {
                dispatch(AuthActions.loadMyInfo());
              }}
            >
              토큰 체크
            </A>
          </Li>
        </Ul>
      </Nav>
    </MenuContainer>
  );
}

export default DropdownMenu;

const MenuContainer = styled.div`
  position: relative;
`;

const MenuTriggerBtn = styled.button`
  background: ${({ theme }) => theme.color.on_primary};
  border-radius: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
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
  background: #ffffff;
  border-radius: 8px;
  position: absolute;
  top: 40px;
  right: 5px;
  width: 100px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-20px);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  text-align: center;

  ${({ isActive }) => isActive && menuActive};
`;

const Ul = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Li = styled.li`
  border-bottom: 1px solid #dddddd;
  &:last-child {
    border-bottom: 0;
  }
`;

const A = styled.a`
  text-decoration: none;
  color: #333333;
  padding: 15px 20px;
  display: block;
  &:hover {
    cursor: pointer;
    background: rgba(0, 0, 0, 0.3);
  }
`;

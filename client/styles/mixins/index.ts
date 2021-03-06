import { css } from 'styled-components';

export const flex_column_center = css`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

export const default_button = css`
  padding: 1.1rem 0.9rem;
  border: 0;
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.color.on_secondary + theme.overlay.high};
  background: ${({ theme }) => theme.color.secondary};
  outline: 0;
  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.color.secondary + theme.overlay.hover};
  }
`;

export const default_input = css`
  padding: 1.1rem 0.9rem;
  border-radius: 0.3rem;
  border: 1px solid gray;
  outline: 0;
  background: ${({ theme }) => theme.color.background};
  color: ${({ theme }) => theme.color.on_background};
  &:hover {
    border: 1px solid ${({theme})=>theme.mode === 'light' ? '#63C5DA' : 'white'};
  }
  &:focus {
    border: 1px solid ${({ theme }) => theme.color.secondary_variant};
    background: ${({ theme }) => theme.color.background + theme.overlay.focus};
  }
`;

export const default_Anchor = css`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.color.secondary_variant};
  text-decoration: none;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;
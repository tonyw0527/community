import { css } from 'styled-components';

export const flex_column_center = css`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

export const default_button = css`
  border: 0;
  color: ${({ theme }) => theme.color.on_secondary + theme.overlay.high};
  background: ${({ theme }) => theme.color.secondary};
  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.color.secondary + theme.overlay.hover};
  }
`;

export const default_input = css`
  outline: 0;
  &:focus {
    background: ${({ theme }) => '#FFFFFF' + theme.overlay.focus};
  }
`;
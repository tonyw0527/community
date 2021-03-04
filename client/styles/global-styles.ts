import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

export const GlobalStyle = createGlobalStyle`
    ${normalize}
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      }
    html,
    body {
        background: ${({ theme }) => theme.color.background};
        color: ${({ theme }) => theme.color.on_background + theme.overlay.high};
    }
`;
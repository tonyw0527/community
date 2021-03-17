
import React from 'react';
import { useDarkMode } from 'storybook-dark-mode'
import { ThemeProvider } from '@emotion/react';
import { GlobalStyle } from '../styles/global-styles';
import { lightTheme, darkTheme } from '../styles/theme';

export const decorators = [
  (Story) => {
  
    return (
    <ThemeProvider theme={useDarkMode() ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Story />
    </ThemeProvider>
  )}
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: 'centered',
}
// following material design guide
import { Theme } from '@emotion/react';

// lightTheme
const lightTheme: Theme = {
    mode: 'light',
    modeImg: './icons/sun.svg',

    color: {
      primary: '#00af91',
      primaryVariant: '#184d47',
      secondary: '#1976D2',
      secondaryVariant: '#0366D6',
      background: '#FFFFFF',
      surface: '#FFFFFF',
      error: '#B00020',

      onPrimary: '#FFFFFF',
      onSecondary: '#FFFFFF',
      onBackground: '#000000DE',
      onBackgroundLow: '#0000008A',
      onSurface: '#000000',
      onError: '#FFFFFF',
    },
}

// darkTheme
const darkTheme: Theme = {
    mode: 'dark',
    modeImg: './icons/moon.svg',

    color: {
      primary: '#007965',
      primaryVariant: '#184d47',
      secondary: '#90CAF9',
      secondaryVariant: '#79C0FF',
      background: '#121212',
      surface: '#121212',
      error: '#CF6679',

      onPrimary: '#FFFFFF',
      onSecondary: '#000000DE',
      onBackground: '#FFFFFFDE',
      onBackgroundLow: '#FFFFFFB3',
      onSurface: '#FFFFFF',
      onError: '#000000',
    },
}

export { lightTheme, darkTheme };
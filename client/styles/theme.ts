// following material design guide
import { DefaultTheme } from 'styled-components';

// lightTheme
const lightTheme: DefaultTheme = {
    mode: 'light',
    mode_img: './icons/sun.svg',

    color: {
      primary: '#00af91',
      primary_variant: '#184d47',
      secondary: '#A5D6FF',
      secondary_variant: '#0366D6',
      background: '#FFFFFF',
      surface: '#FFFFFF',
      error: '#B00020',

      on_primary: '#FFFFFF',
      on_secondary: '#000000',
      on_background: '#000000',
      on_surface: '#000000',
      on_error: '#FFFFFF',
    },

    overlay: {
      hover: 'F5', // alpha 96(%)
      focus: 'E0', // 88 
      dp01: 'F2', // 95
      dp02: 'ED', // 93
      dp03: 'EB', // 92
      dp04: 'E8', // 91
      dp06: 'E3', // 89
      dp08: 'E0', // 88
      dp12: 'DB', // 86
      dp16: 'D9', // 85
      dp24: 'D6', // 84
      high: '', // 87
      medium: '', // 60
      disabled: '61', // 38
    }
}

// darkTheme
const darkTheme: DefaultTheme = {
    mode: 'dark',
    mode_img: './icons/moon.svg',

    color: {
      primary: '#007965',
      primary_variant: '#184d47',
      secondary: '#58A6FF',
      secondary_variant: '#79C0FF',
      background: '#121212',
      surface: '#121212',
      error: '#CF6679',

      on_primary: '#FFFFFF',
      on_secondary: '#FFFFFF',
      on_background: '#FFFFFF',
      on_surface: '#FFFFFF',
      on_error: '#000000',
    },

    overlay: {
      hover: 'F5',
      focus: 'E0', 
      dp01: 'F2',
      dp02: 'ED',
      dp03: 'EB',
      dp04: 'E8',
      dp06: 'E3',
      dp08: 'E0',
      dp12: 'DB',
      dp16: 'D9',
      dp24: 'D6',
      high: 'DE',
      medium: '99',
      disabled: '61',
    }
}

export { lightTheme, darkTheme };
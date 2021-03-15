// interface for theme
import '@emotion/react'

declare module '@emotion/react' {
  export interface Theme {
    mode: string;
    modeImg: string;

    color: {
        primary: string;
        primaryVariant: string;
        secondary: string;
        secondaryVariant: string;
        background: string;
        surface: string;
        error: string;

        onPrimary: string;
        onSecondary: string;
        onBackground: string;
        onBackgroundLow: string; 
        onSurface: string;
        onError: string;
    };
  }
}
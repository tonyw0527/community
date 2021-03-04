import 'styled-components';

// interface for theme
declare module 'styled-components' {
    export interface DefaultTheme {
        mode: string;
        mode_img: string;

        color: {
            primary: string;
            primary_variant: string;
            secondary: string;
            secondary_variant: string;
            background: string;
            surface: string;
            error: string;

            on_primary: string;
            on_secondary: string;
            on_background: string;
            on_surface: string;
            on_error: string;
        };

        overlay: {
          hover: string;
          focus: string;
          dp01: string;
          dp02: string;
          dp03: string;
          dp04: string;
          dp06: string;
          dp08: string;
          dp12: string;
          dp16: string;
          dp24: string;
          // for light text
          high: string;
          medium: string;
          disabled: string;
        }
    }
}
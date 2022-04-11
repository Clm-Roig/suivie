// Coolors URL: https://coolors.co/80cbc4-eeeeee-2e4057-db7f8e-ffe66d
import { PaletteMode, PaletteOptions } from '@mui/material';
import { grey } from '@mui/material/colors';

import ThemeMode from '../models/ThemeMode';

const CHARCOAL = {
  main: '#2E4057'
};
const YELLOW_CRAYOLA = {
  main: '#FFE66D'
};
/*
const WHITE = {
  main: '#EEEEEE'
}
const SHIMMERING_BLUSH = {
  main: '#DB7F8E'
}
*/
const MIDDLE_BLUE = {
  main: '#80CBC4'
};

export const components = {
  MuiTabs: {
    styleOverrides: {
      indicator: {
        backgroundColor: MIDDLE_BLUE.main
      },
      root: {
        color: MIDDLE_BLUE.main
      }
    }
  },
  MuiTab: {
    styleOverrides: {
      root: {
        '&.Mui-selected': {
          color: MIDDLE_BLUE.main
        }
      }
    }
  }
};

const commonTheme = {
  accent: MIDDLE_BLUE,
  primary: CHARCOAL,
  secondary: YELLOW_CRAYOLA,
  text: {
    primary: CHARCOAL.main
  }
};

export const getPalette = (mode: PaletteMode): PaletteOptions => ({
  mode,
  ...(mode === ThemeMode.LIGHT
    ? {
        // palette values for light mode
        ...commonTheme
      }
    : {
        // palette values for dark mode
        ...commonTheme,
        background: {
          default: grey[900]
        },
        primary: {
          main: '#7792BB'
        },
        text: {
          primary: '#7792BB'
        }
      })
});

export const typography = {
  h1: {
    fontSize: '4.3rem'
  }
};

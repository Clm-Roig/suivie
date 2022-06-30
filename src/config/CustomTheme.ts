// Coolors URL: https://coolors.co/80cbc4-eeeeee-2e4057-db7f8e-ffe66d
import { PaletteMode, PaletteOptions } from '@mui/material';
import { grey } from '@mui/material/colors';

import ThemeMode from '../models/ThemeMode';

const BLACK = '#111';
const WHITE = '#EEE';

const CHARCOAL = {
  main: '#2E4057',
  contrastText: WHITE
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
  main: '#80CBC4',
  contrastText: BLACK
};

const LIGHT_BLUE = {
  main: '#7792BB',
  contrastText: BLACK
};

const THEME_MODE_TRANSITION = '0.5s ease';

export const components = {
  MuiPaper: {
    styleOverrides: {
      root: {
        transition:
          'background-image ' + THEME_MODE_TRANSITION + ', background ' + THEME_MODE_TRANSITION + ''
      }
    }
  },
  MuiContainer: {
    styleOverrides: {
      root: {
        transition:
          'background-image ' + THEME_MODE_TRANSITION + ', background ' + THEME_MODE_TRANSITION + ''
      }
    }
  },
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
  MuiCard: {
    styleOverrides: {
      root: {
        // Lock font color for card independently from the theme because of varying tracker card color
        color: CHARCOAL.main,
        '&.tracker-card button': {
          color: CHARCOAL.main
        }
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
  },
  common: {
    white: WHITE,
    black: BLACK
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
        primary: LIGHT_BLUE,
        text: {
          primary: LIGHT_BLUE.main
        }
      })
});

export const typography = {
  fontFamily: ['Poppins', 'sans-serif'].join(','),
  h1: {
    fontSize: '4.3rem'
  },
  caption: {
    color: grey[700]
  },
  subtitle2: {
    color: grey[700]
  }
};

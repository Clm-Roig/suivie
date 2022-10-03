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
const YELLOW_CORN = {
  main: '#FFEf8D'
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
        backgroundColor: LIGHT_BLUE.main
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
          color: LIGHT_BLUE.main
        }
      }
    }
  }
};

const commonTheme = {
  accent: MIDDLE_BLUE,
  primary: CHARCOAL,
  secondary: YELLOW_CORN,
  text: {
    primary: CHARCOAL.main
  },
  common: {
    white: WHITE,
    black: BLACK
  },
  info: {
    main: '#5fa7ce',
    contrastText: WHITE
  },
  warning: {
    main: '#ffba55'
  },
  error: {
    main: '#db5f5f'
  },
  success: {
    main: '#67916a'
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
    fontSize: '4.2rem'
  },
  h2: {
    fontSize: '3rem'
  },
  h3: {
    fontSize: '2.5rem'
  },
  h4: {
    fontSize: '2.1rem'
  },
  h5: {
    fontSize: '1.7rem'
  },
  h6: {
    fontSize: '1.4rem'
  },
  caption: {
    color: grey[700]
  },
  subtitle2: {
    color: grey[700]
  }
};

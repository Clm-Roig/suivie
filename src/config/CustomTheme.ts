// Coolors URL: https://coolors.co/80cbc4-eeeeee-2e4057-db7f8e-ffe66d
import { PaletteMode, PaletteOptions } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Shadows } from '@mui/material/styles';

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

const commonThemePalette = {
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
        ...commonThemePalette
      }
    : {
        // palette values for dark mode
        ...commonThemePalette,
        background: {
          default: grey[900]
        },
        primary: LIGHT_BLUE,
        text: {
          primary: LIGHT_BLUE.main
        }
      })
});

export const shape = {
  borderRadius: 8
};

const shadowColor1 = 'rgba(0,0,100,0.2)';
const shadowColor2 = 'rgba(0,0,100,0.14)';
const shadowColor3 = 'rgba(0,0,100,0.12)';

// Default MUI shadows
export const shadows: Shadows = [
  'none',
  '0px 2px 1px -1px ' +
    shadowColor1 +
    ',0px 1px 1px 0px ' +
    shadowColor2 +
    ',0px 1px 3px 0px ' +
    shadowColor3 +
    '',
  '0px 3px 1px -2px ' +
    shadowColor1 +
    ',0px 2px 2px 0px ' +
    shadowColor2 +
    ',0px 1px 5px 0px ' +
    shadowColor3 +
    '',
  '0px 3px 3px -2px ' +
    shadowColor1 +
    ',0px 3px 4px 0px ' +
    shadowColor2 +
    ',0px 1px 8px 0px ' +
    shadowColor3 +
    '',
  '0px 2px 4px -1px ' +
    shadowColor1 +
    ',0px 4px 5px 0px ' +
    shadowColor2 +
    ',0px 1px 10px 0px ' +
    shadowColor3 +
    '',
  '0px 3px 5px -1px ' +
    shadowColor1 +
    ',0px 5px 8px 0px ' +
    shadowColor2 +
    ',0px 1px 14px 0px ' +
    shadowColor3 +
    '',
  '0px 3px 5px -1px ' +
    shadowColor1 +
    ',0px 6px 10px 0px ' +
    shadowColor2 +
    ',0px 1px 18px 0px ' +
    shadowColor3 +
    '',
  '0px 4px 5px -2px ' +
    shadowColor1 +
    ',0px 7px 10px 1px ' +
    shadowColor2 +
    ',0px 2px 16px 1px ' +
    shadowColor3 +
    '',
  '0px 5px 5px -3px ' +
    shadowColor1 +
    ',0px 8px 10px 1px ' +
    shadowColor2 +
    ',0px 3px 14px 2px ' +
    shadowColor3 +
    '',
  '0px 5px 6px -3px ' +
    shadowColor1 +
    ',0px 9px 12px 1px ' +
    shadowColor2 +
    ',0px 3px 16px 2px ' +
    shadowColor3 +
    '',
  '0px 6px 6px -3px ' +
    shadowColor1 +
    ',0px 10px 14px 1px ' +
    shadowColor2 +
    ',0px 4px 18px 3px ' +
    shadowColor3 +
    '',
  '0px 6px 7px -4px ' +
    shadowColor1 +
    ',0px 11px 15px 1px ' +
    shadowColor2 +
    ',0px 4px 20px 3px ' +
    shadowColor3 +
    '',
  '0px 7px 8px -4px ' +
    shadowColor1 +
    ',0px 12px 17px 2px ' +
    shadowColor2 +
    ',0px 5px 22px 4px ' +
    shadowColor3 +
    '',
  '0px 7px 8px -4px ' +
    shadowColor1 +
    ',0px 13px 19px 2px ' +
    shadowColor2 +
    ',0px 5px 24px 4px ' +
    shadowColor3 +
    '',
  '0px 7px 9px -4px ' +
    shadowColor1 +
    ',0px 14px 21px 2px ' +
    shadowColor2 +
    ',0px 5px 26px 4px ' +
    shadowColor3 +
    '',
  '0px 8px 9px -5px ' +
    shadowColor1 +
    ',0px 15px 22px 2px ' +
    shadowColor2 +
    ',0px 6px 28px 5px ' +
    shadowColor3 +
    '',
  '0px 8px 10px -5px ' +
    shadowColor1 +
    ',0px 16px 24px 2px ' +
    shadowColor2 +
    ',0px 6px 30px 5px ' +
    shadowColor3 +
    '',
  '0px 8px 11px -5px ' +
    shadowColor1 +
    ',0px 17px 26px 2px ' +
    shadowColor2 +
    ',0px 6px 32px 5px ' +
    shadowColor3 +
    '',
  '0px 9px 11px -5px ' +
    shadowColor1 +
    ',0px 18px 28px 2px ' +
    shadowColor2 +
    ',0px 7px 34px 6px ' +
    shadowColor3 +
    '',
  '0px 9px 12px -6px ' +
    shadowColor1 +
    ',0px 19px 29px 2px ' +
    shadowColor2 +
    ',0px 7px 36px 6px ' +
    shadowColor3 +
    '',
  '0px 10px 13px -6px ' +
    shadowColor1 +
    ',0px 20px 31px 3px ' +
    shadowColor2 +
    ',0px 8px 38px 7px ' +
    shadowColor3 +
    '',
  '0px 10px 13px -6px ' +
    shadowColor1 +
    ',0px 21px 33px 3px ' +
    shadowColor2 +
    ',0px 8px 40px 7px ' +
    shadowColor3 +
    '',
  '0px 10px 14px -6px ' +
    shadowColor1 +
    ',0px 22px 35px 3px ' +
    shadowColor2 +
    ',0px 8px 42px 7px ' +
    shadowColor3 +
    '',
  '0px 11px 14px -7px ' +
    shadowColor1 +
    ',0px 23px 36px 3px ' +
    shadowColor2 +
    ',0px 9px 44px 8px ' +
    shadowColor3 +
    '',
  '0px 11px 15px -7px ' +
    shadowColor1 +
    ',0px 24px 38px 3px ' +
    shadowColor2 +
    ',0px 9px 46px 8px ' +
    shadowColor3 +
    ''
];

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

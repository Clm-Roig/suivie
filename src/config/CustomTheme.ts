// Coolors URL: https://coolors.co/80cbc4-eeeeee-2e4057-db7f8e-ffe66d

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

export const palette = {
  primary: CHARCOAL,
  secondary: YELLOW_CRAYOLA,
  accent: MIDDLE_BLUE
};

export const typography = {
  h1: {
    fontSize: '4.3rem'
  },
  allVariants: {
    color: CHARCOAL.main
  }
};

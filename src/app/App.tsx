import CloseIcon from '@mui/icons-material/Close';
import { Container, IconButton } from '@mui/material';
import {
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
  styled
} from '@mui/material/styles';
import { LocalizationProvider, frFR } from '@mui/x-date-pickers';
import { AdapterDateFns as DateAdapter } from '@mui/x-date-pickers/AdapterDateFns';
import frLocale from 'date-fns/locale/fr';
import { SnackbarKey, SnackbarProvider } from 'notistack';
import { createRef, useEffect, useMemo, useState } from 'react';

import { DRAWER_MENU_WIDTH } from '../config/Constants';
import { components, getPalette, shadows, shape, typography } from '../config/CustomTheme';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import ThemeMode from '../models/ThemeMode';
import { selectThemeMode } from '../store/theme/theme.selectors';
import { toggleThemeMode } from '../store/theme/themeSlice';
import { setSelectedDate } from '../store/trackers/trackersSlice';
import AppBar from './AppBar';
import DrawerMenu from './DrawerMenu';
import MainContent from './MainContent';
import Router from './Router';

const StyledSnackbarProvider = styled(SnackbarProvider)`
  &.SnackbarItem-variantInfo {
    background-color: ${({ theme }) => theme.palette.info.main};
  }
  ,
  &.SnackbarItem-variantError {
    background-color: ${({ theme }) => theme.palette.error.main};
  }
  ,
  &.SnackbarItem-variantSuccess {
    background-color: ${({ theme }) => theme.palette.success.main};
  }
  ,
  &.SnackbarItem-variantWarning {
    background-color: ${({ theme }) => theme.palette.warning.main};
  }
`;

const MainContainer = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh'
}));

const App = () => {
  const dispatch = useAppDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const notistackRef = createRef<SnackbarProvider>();
  const onClickDismiss = (key: SnackbarKey) => () => {
    notistackRef.current?.closeSnackbar(key);
  };

  useEffect(() => {
    dispatch(setSelectedDate(new Date().toString()));
  }, []);

  const toggleDrawerMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Theme configuration
  const themeMode = useAppSelector(selectThemeMode);
  let theme = useMemo(() => {
    return createTheme({
      components,
      palette: getPalette(themeMode === ThemeMode.LIGHT ? 'light' : 'dark'),
      shadows: shadows,
      shape: shape,
      typography: typography
    });
  }, [themeMode]);
  theme = responsiveFontSizes(theme);

  return (
    <LocalizationProvider
      dateAdapter={DateAdapter}
      adapterLocale={frLocale}
      localeText={frFR.components.MuiLocalizationProvider.defaultProps.localeText}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <MainContainer disableGutters maxWidth={'md'}>
            <StyledSnackbarProvider
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center'
              }}
              dense
              maxSnack={3}
              ref={notistackRef}
              action={(key) => (
                <IconButton
                  onClick={onClickDismiss(key)}
                  size="small"
                  sx={{ color: 'common.white' }}>
                  <CloseIcon />
                </IconButton>
              )}>
              <AppBar toggleDrawerMenu={toggleDrawerMenu} />
              <DrawerMenu
                width={DRAWER_MENU_WIDTH}
                open={isMenuOpen}
                toggleDrawerMenu={toggleDrawerMenu}
                toggleThemeMode={() => dispatch(toggleThemeMode())}
              />
              <MainContent>
                <Router />
              </MainContent>
            </StyledSnackbarProvider>
          </MainContainer>
        </ThemeProvider>
      </StyledEngineProvider>
    </LocalizationProvider>
  );
};

export default App;

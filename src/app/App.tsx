import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDateFns';
import { Container, IconButton, Paper } from '@mui/material';
import {
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
  styled
} from '@mui/material/styles';
import frLocale from 'date-fns/locale/fr';
import { SnackbarKey, SnackbarProvider } from 'notistack';
import { createRef, useMemo, useState } from 'react';

import { DRAWER_MENU_WIDTH } from '../config/Constants';
import { components, getPalette, typography } from '../config/CustomTheme';
import ThemeMode from '../models/ThemeMode';
import { selectThemeMode } from '../store/theme/theme.selectors';
import { toggleThemeMode } from '../store/theme/themeSlice';
import AppBar from './AppBar';
import DrawerMenu from './DrawerMenu';
import Router from './Router';
import { useAppDispatch, useAppSelector } from './hooks';

const MainContent = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2)
}));

const MainContainer = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh'
}));

// Main component
function App() {
  // Theme configuration
  const themeMode = useAppSelector(selectThemeMode);
  const dispatch = useAppDispatch();

  let theme = useMemo(() => {
    return createTheme({
      components,
      palette: getPalette(themeMode === ThemeMode.LIGHT ? 'light' : 'dark'),
      typography: typography
    });
  }, [themeMode]);

  theme = responsiveFontSizes(theme);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const notistackRef = createRef<SnackbarProvider>();
  const onClickDismiss = (key: SnackbarKey) => () => {
    notistackRef.current?.closeSnackbar(key);
  };

  const toggleDrawerMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <LocalizationProvider dateAdapter={DateAdapter} locale={frLocale}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <MainContainer disableGutters maxWidth={'md'}>
            <SnackbarProvider
              dense
              maxSnack={3}
              ref={notistackRef}
              action={(key) => (
                <IconButton onClick={onClickDismiss(key)} size="small">
                  <VisibilityOffIcon />
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
            </SnackbarProvider>
          </MainContainer>
        </ThemeProvider>
      </StyledEngineProvider>
    </LocalizationProvider>
  );
}

export default App;

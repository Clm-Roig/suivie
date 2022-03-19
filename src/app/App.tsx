import { createRef, useState } from 'react';
import { IconButton, Container } from '@mui/material';
import styled from '@emotion/styled';
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
  responsiveFontSizes
} from '@mui/material/styles';
import DateAdapter from '@mui/lab/AdapterDateFns';
import frLocale from 'date-fns/locale/fr';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { SnackbarKey, SnackbarProvider } from 'notistack';
import { LocalizationProvider } from '@mui/lab';
import { palette, typography } from '../config/CustomTheme';
import { DRAWER_MENU_WIDTH } from '../config/Constants';
import AppBar from './AppBar';
import DrawerMenu from './DrawerMenu';
import Router from './Router';

const MainContent = styled(Container)`
  padding: 1rem;
`;

// Theme configuration
let theme = createTheme({
  palette: palette,
  typography: typography
});
theme = responsiveFontSizes(theme);

// Main component
function App() {
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
          <Container disableGutters maxWidth={false}>
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
              />
              <MainContent>
                <Router />
              </MainContent>
            </SnackbarProvider>
          </Container>
        </ThemeProvider>
      </StyledEngineProvider>
    </LocalizationProvider>
  );
}

export default App;

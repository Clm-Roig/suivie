import { useState } from 'react';
import { Container, Paper } from '@mui/material';
import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import palette from '../config/CustomTheme';
import './App.css';
import AppBar from './AppBar';
import DrawerMenu from './DrawerMenu';
import Router from './Router';

const theme = createTheme({
  palette: palette
});

const DRAWER_MENU_WIDTH = 250;

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDrawerMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Container
          style={isMenuOpen ? { marginLeft: DRAWER_MENU_WIDTH } : {}}
          maxWidth={false}
          disableGutters>
          <AppBar toggleDrawerMenu={toggleDrawerMenu} />
          <DrawerMenu
            width={DRAWER_MENU_WIDTH}
            open={isMenuOpen}
            toggleDrawerMenu={toggleDrawerMenu}
          />
          <Paper style={{ margin: '1rem' }}>
            <Router />
          </Paper>
        </Container>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;

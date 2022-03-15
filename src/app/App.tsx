import { useState } from 'react';
import { Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import palette from '../config/CustomTheme';
import './App.css';
import AppBar from './AppBar';
import DrawerMenu from './DrawerMenu';
import Router from './Router';

const theme = createTheme({
  palette: palette
});


function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const toggleDrawerMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <AppBar toggleDrawerMenu={toggleDrawerMenu}/>
        <DrawerMenu open={isMenuOpen} toggleDrawerMenu={toggleDrawerMenu}/>
        <Router />
      </Container>
    </ThemeProvider>
  );
}

export default App;

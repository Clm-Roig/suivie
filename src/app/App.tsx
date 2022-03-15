import { useState } from 'react';
import { Container } from '@mui/material';
import TrackerList from '../components/trackerList/TrackerList'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import palette from '../config/CustomTheme';
import './App.css';
import AppBar from './AppBar';
import DrawerMenu from './DrawerMenu';

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
        <TrackerList />
      </Container>
    </ThemeProvider>
  );
}

export default App;

import { useState } from 'react';
import { Container, Paper } from '@mui/material';
import styled from '@emotion/styled';
import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import palette from '../config/CustomTheme';
import AppBar from './AppBar';
import DrawerMenu from './DrawerMenu';
import Router from './Router';

const DRAWER_MENU_WIDTH = '250px';

const StyledContainer = styled(Container)<{ isMenuOpen: boolean }>`
  margin-left: ${(props) => (props.isMenuOpen ? DRAWER_MENU_WIDTH : '')};
`;

const MainContent = styled(Paper)`
  margin: 1rem;
  padding: 1rem;
`;

const theme = createTheme({
  palette: palette
});

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDrawerMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <StyledContainer disableGutters isMenuOpen={isMenuOpen} maxWidth={false}>
          <AppBar toggleDrawerMenu={toggleDrawerMenu} />
          <DrawerMenu
            width={DRAWER_MENU_WIDTH}
            open={isMenuOpen}
            toggleDrawerMenu={toggleDrawerMenu}
          />
          <MainContent>
            <Router />
          </MainContent>
        </StyledContainer>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;

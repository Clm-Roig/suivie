import { Container } from '@mui/material';
import TrackerList from '../components/trackerList/TrackerList'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import palette from '../config/CustomTheme';
import './App.css';
import AppBar from './AppBar';

const theme = createTheme({
  palette: palette
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <AppBar/>
        <TrackerList />
      </Container>
    </ThemeProvider>
  );
}

export default App;

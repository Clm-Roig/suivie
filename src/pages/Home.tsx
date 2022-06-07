import { Box, Button, List, ListItemText, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import AppLogo from '../components/AppLogo';
import { useAppSelector } from '../hooks/redux';
import { selectThemeMode } from '../store/theme/theme.selectors';

const Home = () => {
  const themeMode = useAppSelector(selectThemeMode);
  return (
    <>
      <Typography
        align="center"
        variant="h2"
        component="h1"
        sx={{
          color: themeMode === 'dark' ? 'secondary.main' : 'secondary.dark',
          fontWeight: 'bold',
          textDecoration: 'none'
        }}>
        <AppLogo height="90px" color="lightBlue" />
      </Typography>
      <List>
        <ListItemText primary={'✨ Suivez vos habitudes'} />
        <ListItemText primary={'✅ Complétez vos objectifs'} />
        <ListItemText primary={'📊 Consultez vos statistiques à tout moment'} />
        <ListItemText primary={'🔐 Données stockées sur votre appareil'} />
      </List>
      <Box display="flex" justifyContent="center">
        <Button component={Link} size="large" to="/trackers" variant="contained">
          🚀 Commencer
        </Button>
      </Box>
    </>
  );
};

export default Home;

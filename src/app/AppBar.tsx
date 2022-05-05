import MenuIcon from '@mui/icons-material/Menu';
import { Box, IconButton, AppBar as MuiAppBar, Toolbar } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import AppLogo from '../assets/images/app-logo.png';
import ThemeMode from '../models/ThemeMode';
import { selectThemeMode } from '../store/theme/theme.selectors';
import { useAppSelector } from './hooks';

// Filter generated using https://codepen.io/sosuke/pen/Pjoqqp
const filterToLightBlueColor =
  'invert(62%) sepia(49%) saturate(295%) hue-rotate(177deg) brightness(84%) contrast(84%)';

interface Props {
  toggleDrawerMenu: () => void;
}

const AppBar: FC<Props> = ({ toggleDrawerMenu }) => {
  const themeMode = useAppSelector(selectThemeMode);

  return (
    <Box
      sx={{
        flexGrow: 1
      }}>
      <MuiAppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawerMenu}>
            <MenuIcon />
          </IconButton>
          <Link to="/">
            <img
              style={{
                filter: themeMode === ThemeMode.DARK ? filterToLightBlueColor : 'invert(1)'
              }}
              height="40px"
              src={AppLogo}
              alt="App logo"
            />
          </Link>
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
};

export default AppBar;

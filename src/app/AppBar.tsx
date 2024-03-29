import MenuIcon from '@mui/icons-material/Menu';
import { Box, IconButton, AppBar as MuiAppBar, Toolbar } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import AppLogo from './../components/AppLogo';

interface Props {
  toggleDrawerMenu: () => void;
}

const AppBar: FC<Props> = ({ toggleDrawerMenu }) => {
  return (
    <Box>
      <MuiAppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawerMenu}>
            <MenuIcon />
          </IconButton>
          <Link to="/">
            <AppLogo height="40px" />
          </Link>
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
};

export default AppBar;

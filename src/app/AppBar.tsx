import MenuIcon from '@mui/icons-material/Menu';
import { Box, IconButton, AppBar as MuiAppBar, Toolbar, Typography } from '@mui/material';
import { FC } from 'react';

interface Props {
  toggleDrawerMenu: () => void;
}

const AppBar: FC<Props> = ({ toggleDrawerMenu }) => {
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
          <Typography color="#eee" variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BUJO TRACKER
          </Typography>
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
};

export default AppBar;

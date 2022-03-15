import PropTypes, { InferProps } from 'prop-types';
import { AppBar as MuiAppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function AppBar({ toggleDrawerMenu }: InferProps<typeof AppBar.propTypes>) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawerMenu}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Bujo Tracker
          </Typography>
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
}

AppBar.propTypes = {
  toggleDrawerMenu: PropTypes.func.isRequired
};

export default AppBar;

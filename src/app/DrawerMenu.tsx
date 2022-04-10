import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import ListAltIcon from '@mui/icons-material/ListAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import TimelineIcon from '@mui/icons-material/Timeline';
import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer
} from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import { useThemeMode } from './hooks';

interface MenuItemProps {
  icon: React.ReactNode;
  name: string;
  onClick: () => void;
  url: string;
}
const MenuItem: FC<MenuItemProps> = ({ icon, name, onClick, url }) => (
  <ListItem component={Link} to={url} button key={name} onClick={onClick}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={name} />
  </ListItem>
);

interface Props {
  open: boolean;
  toggleDrawerMenu: () => void;
  toggleThemeMode: () => void;
  width: string;
}

const DrawerMenu: FC<Props> = ({ open, toggleDrawerMenu, toggleThemeMode, width }) => {
  const themeMode = useThemeMode();
  return (
    <SwipeableDrawer
      anchor="left"
      onClose={toggleDrawerMenu}
      onOpen={toggleDrawerMenu}
      open={open}
      sx={{
        width: width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: width,
          boxSizing: 'border-box'
        }
      }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <IconButton sx={{ ml: 1 }} onClick={toggleThemeMode} color="inherit">
          {themeMode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
        <IconButton onClick={toggleDrawerMenu}>
          <ChevronLeftIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        <MenuItem
          icon={<ListAltIcon />}
          name={'Mes Trackers'}
          onClick={toggleDrawerMenu}
          url="/trackers"
        />
        <MenuItem
          icon={<TimelineIcon />}
          name={'Statistiques'}
          onClick={toggleDrawerMenu}
          url="/stats"
        />
        <MenuItem
          icon={<SettingsIcon />}
          name={'Paramètres'}
          onClick={toggleDrawerMenu}
          url="/settings"
        />
      </List>
      <Divider />
      <Box display="flex" justifyContent="center" paddingY={1}>
        <Button variant="contained" component={Link} onClick={toggleDrawerMenu} to="/about">
          À Propos
        </Button>
      </Box>
    </SwipeableDrawer>
  );
};

export default DrawerMenu;

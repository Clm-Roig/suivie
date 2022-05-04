import CheckIcon from '@mui/icons-material/Check';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import HomeIcon from '@mui/icons-material/Home';
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
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer
} from '@mui/material';
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { selectThemeMode } from '../store/theme/theme.selectors';
import { useAppSelector } from './hooks';

interface MenuItemProps {
  icon: React.ReactNode;
  name: string;
  onClick: () => void;
  selected: boolean;
  url: string;
}
const MenuItem: FC<MenuItemProps> = ({ icon, name, onClick, selected, url }) => (
  <ListItemButton selected={selected} component={Link} to={url} key={name} onClick={onClick}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={name} />
  </ListItemButton>
);

interface Props {
  open: boolean;
  toggleDrawerMenu: () => void;
  toggleThemeMode: () => void;
  width: string;
}

const DrawerMenu: FC<Props> = ({ open, toggleDrawerMenu, toggleThemeMode, width }) => {
  const themeMode = useAppSelector(selectThemeMode);
  const currentPathName = useLocation().pathname;
  const menuItems = [
    {
      icon: <HomeIcon />,
      name: 'Accueil',
      url: '/'
    },
    {
      icon: <CheckIcon />,
      name: 'Valider mes trackers',
      url: '/trackers'
    },
    {
      icon: <ListAltIcon />,
      name: 'Tous mes trackers',
      url: '/all-trackers'
    },
    {
      icon: <TimelineIcon />,
      name: 'Statistiques',
      url: '/stats'
    },
    {
      icon: <SettingsIcon />,
      name: 'Paramètres',
      url: '/settings'
    }
  ];

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
        {menuItems.map((mi) => (
          <MenuItem
            key={mi.name}
            icon={mi.icon}
            name={mi.name}
            onClick={toggleDrawerMenu}
            selected={currentPathName === mi.url}
            url={mi.url}
          />
        ))}
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

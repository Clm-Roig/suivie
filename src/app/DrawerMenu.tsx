import { FC } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListAltIcon from '@mui/icons-material/ListAlt';
import TimelineIcon from '@mui/icons-material/Timeline';
import SettingsIcon from '@mui/icons-material/Settings';

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
  width: string;
}

const DrawerMenu: FC<Props> = ({ open, toggleDrawerMenu, width }) => {
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
      <Box sx={{ display: 'flex', justifyContent: 'right' }}>
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
    </SwipeableDrawer>
  );
};

export default DrawerMenu;

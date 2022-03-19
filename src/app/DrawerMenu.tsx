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
        <ListItem component={Link} to="/trackers" button key={'Mes Trackers'}>
          <ListItemIcon>
            <ListAltIcon />
          </ListItemIcon>
          <ListItemText primary={'Mes Trackers'} />
        </ListItem>
        <ListItem component={Link} to="/stats" button key={'Statistiques'}>
          <ListItemIcon>
            <TimelineIcon />
          </ListItemIcon>
          <ListItemText primary={'Statistiques'} />
        </ListItem>
      </List>
    </SwipeableDrawer>
  );
};

export default DrawerMenu;

import PropTypes, { InferProps } from 'prop-types';
import { Link } from 'react-router-dom';
import { Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListAltIcon from '@mui/icons-material/ListAlt';
import TimelineIcon from '@mui/icons-material/Timeline';

function DrawerMenu({ toggleDrawerMenu, open, width }: InferProps<typeof DrawerMenu.propTypes>) {
  return (
    <Drawer
      sx={{
        width: width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: width,
          boxSizing: 'border-box'
        }
      }}
      variant="persistent"
      anchor="left"
      open={open}>
      <IconButton onClick={toggleDrawerMenu}>
        <ChevronLeftIcon />
      </IconButton>
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
    </Drawer>
  );
}

DrawerMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleDrawerMenu: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired
};

export default DrawerMenu;

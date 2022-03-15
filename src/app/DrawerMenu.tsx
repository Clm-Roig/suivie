import PropTypes, { InferProps } from "prop-types";
import { Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListAltIcon from '@mui/icons-material/ListAlt';
import TimelineIcon from '@mui/icons-material/Timeline';
import './DrawerMenu.css';

function DrawerMenu({ toggleDrawerMenu, open }: InferProps<typeof DrawerMenu.propTypes>) {
  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
    >
      <IconButton onClick={toggleDrawerMenu}>
        <ChevronLeftIcon />
      </IconButton>
      <List>
        <ListItem button key={'Mes Trackers'}>
          <ListItemIcon>
            <ListAltIcon />
          </ListItemIcon>
          <ListItemText primary={'Mes Trackers'} />
        </ListItem>
        <ListItem button key={'Statistiques'}>
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
}

export default DrawerMenu;
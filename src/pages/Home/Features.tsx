import { List, ListItem, ListItemText } from '@mui/material';

const Features = () => (
  <List>
    <ListItem disableGutters disablePadding>
      <ListItemText primary={'✨ Suivez vos habitudes'} />
    </ListItem>
    <ListItem disableGutters disablePadding>
      <ListItemText primary={'✅ Complétez vos objectifs'} />
    </ListItem>
    <ListItem disableGutters disablePadding>
      <ListItemText primary={'📊 Consultez vos statistiques à tout moment'} />
    </ListItem>
    <ListItem disableGutters disablePadding>
      <ListItemText primary={'🔐 Données stockées sur votre appareil'} />
    </ListItem>
  </List>
);
export default Features;

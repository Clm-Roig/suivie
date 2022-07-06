import { List, ListItem, ListItemText } from '@mui/material';
import { FC } from 'react';

import ChildrenProp from '../../types/ChildrenProp';

const DenseListItem: FC<ChildrenProp> = ({ children }) => (
  <ListItem disablePadding disableGutters>
    {children}
  </ListItem>
);

const Features = () => (
  <List>
    <DenseListItem>
      <ListItemText primary={'✨ Suivez vos habitudes'} />
    </DenseListItem>
    <DenseListItem>
      <ListItemText primary={'✅ Complétez vos objectifs'} />
    </DenseListItem>
    <DenseListItem>
      <ListItemText primary={'📊 Consultez vos statistiques à tout moment'} />
    </DenseListItem>
    <DenseListItem>
      <ListItemText primary={'🔐 Données stockées sur votre appareil'} />
    </DenseListItem>
  </List>
);
export default Features;

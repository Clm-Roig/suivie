import { ListItem, ListItemProps, ListItemText } from '@mui/material';
import { FC } from 'react';

import Tracker from '../../../models/Tracker';

interface Props {
  listItemProps?: ListItemProps;
  tracker: Tracker;
}
const TrackerCard: FC<Props> = ({ tracker, listItemProps }) => {
  return (
    <ListItem divider {...listItemProps}>
      <ListItemText primary={tracker.name} />
    </ListItem>
  );
};

export default TrackerCard;

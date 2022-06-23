import { Checkbox, ListItem, ListItemButton, ListItemProps, ListItemText } from '@mui/material';
import { FC } from 'react';

import Tracker from '../../../models/Tracker';
import formatDate from '../../../utils/formatDate';

interface Props extends ListItemProps {
  checked: boolean;
  toggleTrackerChecked: (tracker: Tracker) => void;
  tracker: Tracker;
}
const TrackerListItem: FC<Props> = ({
  checked,
  toggleTrackerChecked,
  tracker,
  ...listItemProps
}) => {
  return (
    <ListItem disablePadding divider {...listItemProps}>
      <ListItemButton onClick={() => toggleTrackerChecked(tracker)} dense>
        <Checkbox edge="start" checked={checked} tabIndex={-1} disableRipple />
        <ListItemText
          primary={tracker.name}
          secondary={'débuté le ' + formatDate(new Date(tracker.beginDate))}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default TrackerListItem;

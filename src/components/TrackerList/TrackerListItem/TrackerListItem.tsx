import styled from '@emotion/styled';
import { Checkbox, ListItem, ListItemButton, ListItemProps, ListItemText } from '@mui/material';
import { FC } from 'react';

import Tracker from '../../../models/Tracker';
import formatDate from '../../../utils/formatDate';

interface ColorBlockProps {
  color: string;
}
const ColorBlock = styled.span<ColorBlockProps>((props) => ({
  background: props.color,
  height: '20px',
  width: '20px'
}));

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
        <Checkbox edge="start" checked={checked} tabIndex={-1} />
        <ListItemText
          primary={tracker.name}
          secondary={'débuté le ' + formatDate(new Date(tracker.beginDate))}
        />
        <ColorBlock color={tracker.color} />
      </ListItemButton>
    </ListItem>
  );
};

export default TrackerListItem;

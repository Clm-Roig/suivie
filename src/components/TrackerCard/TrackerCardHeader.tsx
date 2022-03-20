import { FC, useState } from 'react';
import {
  CardHeader,
  CardHeaderProps,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { isAfter } from 'date-fns';

import formatDate from '../../utils/formatDate';
import TrackerStatus from '../../models/TrackerStatus';
import Tracker from '../../models/Tracker';
import Emoji from '../Emoji/Emoji';
import { useAppDispatch } from '../../app/hooks';
import { deleteTracker } from '../../store/trackers/trackersSlice';

interface Props {
  cardHeaderProps?: CardHeaderProps;
  tracker: Tracker;
}

const TrackerCardHeader: FC<Props> = ({ cardHeaderProps, tracker }) => {
  const { beginDate, id, name, remainingDays, status } = tracker;
  const dispatch = useAppDispatch();

  // Top left menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMoreActionsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMoreMenu = () => {
    setAnchorEl(null);
  };
  const handleDeleteTracker = () => {
    dispatch(deleteTracker(id));
    closeMoreMenu();
  };

  const beginVerb = isAfter(new Date(beginDate), new Date()) ? 'Commencera le' : 'Commencé le';
  const trackerIsOver = status === TrackerStatus.over;

  return (
    <CardHeader
      {...cardHeaderProps}
      action={
        <>
          <IconButton aria-label="tracker-settings" onClick={handleMoreActionsClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="tracker-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={closeMoreMenu}
            MenuListProps={{
              'aria-labelledby': 'basic-button'
            }}>
            <MenuItem onClick={handleDeleteTracker} dense>
              <ListItemIcon>
                <DeleteIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Delete</ListItemText>
            </MenuItem>
          </Menu>
        </>
      }
      title={name}
      subheader={
        <>
          <Typography display="block" variant="subtitle2">
            {`${beginVerb} ${formatDate(new Date(beginDate))}`}
          </Typography>
          {trackerIsOver && (
            <>
              <Typography component="span">Terminé</Typography>{' '}
              <Emoji label="green check" symbol="✔️" />
            </>
          )}
          {remainingDays && !trackerIsOver && (
            <Typography display="block" variant="subtitle2">
              Reste {remainingDays} jours
            </Typography>
          )}
        </>
      }
    />
  );
};

export default TrackerCardHeader;

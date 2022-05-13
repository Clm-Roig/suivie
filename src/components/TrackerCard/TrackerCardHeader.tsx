import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
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
import { isAfter } from 'date-fns';
import { useSnackbar } from 'notistack';
import React, { FC, useState } from 'react';

import { useAppDispatch } from '../../app/hooks';
import Tracker from '../../models/Tracker';
import TrackerStatus from '../../models/TrackerStatus';
import { archiveTracker, deleteTracker } from '../../store/trackers/trackersSlice';
import formatDate from '../../utils/formatDate';
import Emoji from '../Emoji/Emoji';
import TrackerEditDialog from '../TrackerEditDialog/TrackerEditDialog';

interface Props {
  cardHeaderProps?: CardHeaderProps;
  tracker: Tracker;
}

const TrackerCardHeader: FC<Props> = ({ cardHeaderProps, tracker }) => {
  const { beginDate, id, name, remainingDays, status } = tracker;
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Top right menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMoreActionsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMoreMenu = () => {
    setAnchorEl(null);
  };
  const handleArchiveTracker = () => {
    dispatch(archiveTracker({ id: id }));
    closeMoreMenu();
    enqueueSnackbar('Tracker archivé !', {
      variant: 'info'
    });
  };
  const handleDeleteTracker = () => {
    dispatch(deleteTracker(id));
    closeMoreMenu();
    enqueueSnackbar('Tracker supprimé !', {
      variant: 'info'
    });
  };
  const onEditValidation = () => {
    setIsEditOpen(false);
    closeMoreMenu();
    enqueueSnackbar('Tracker édité !', {
      variant: 'success'
    });
  };

  const onEditClick = () => {
    setIsEditOpen(true);
  };

  const beginVerb = isAfter(new Date(beginDate), new Date()) ? 'Commencera le' : 'Commencé le';
  const trackerIsArchived = status === TrackerStatus.ARCHIVED;

  return (
    <>
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
              <MenuItem onClick={onEditClick} dense>
                <ListItemIcon>
                  <EditIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Éditer</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleArchiveTracker} dense>
                <ListItemIcon>
                  <ArchiveIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Archiver</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleDeleteTracker} dense>
                <ListItemIcon>
                  <DeleteIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Supprimer</ListItemText>
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
            {trackerIsArchived && (
              <>
                <Typography component="span">Terminé</Typography>{' '}
                <Emoji label="green check" symbol="✔️" />
              </>
            )}
            {remainingDays && !trackerIsArchived && (
              <Typography display="block" variant="subtitle2">
                Reste {remainingDays} jours
              </Typography>
            )}
          </>
        }
      />
      <TrackerEditDialog
        dialogProps={{
          fullScreen: true,
          open: isEditOpen,
          onClose: () => setIsEditOpen(false)
        }}
        tracker={tracker}
        onValidation={onEditValidation}
      />
    </>
  );
};

export default TrackerCardHeader;

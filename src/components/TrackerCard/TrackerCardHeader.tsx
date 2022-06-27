import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
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
  Stack,
  Typography
} from '@mui/material';
import { isAfter } from 'date-fns';
import { useSnackbar } from 'notistack';
import React, { FC, useState } from 'react';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';

import { useAppDispatch } from '../../hooks/redux';
import Tracker from '../../models/Tracker';
import TrackerStatus from '../../models/TrackerStatus';
import { archiveTracker, deleteTracker } from '../../store/trackers/trackersSlice';
import formatDate from '../../utils/formatDate';
import Emoji from '../Emoji/Emoji';
import TrackerEditDialog from '../TrackerEditDialog/TrackerEditDialog';

interface Props extends CardHeaderProps {
  dragHandleProps?: DraggableProvidedDragHandleProps;
  tracker: Tracker;
}

const TrackerCardHeader: FC<Props> = ({ dragHandleProps, tracker, ...cardHeaderProps }) => {
  const { beginDate, frequency, id, name, remainingDays, status } = tracker;
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
  const frequencyText =
    frequency === 1
      ? 'Quotidien'
      : frequency === 7
      ? 'Hedbomadaire'
      : `Tous les ${frequency} jours`;
  const trackerIsArchived = status === TrackerStatus.ARCHIVED;

  return (
    <>
      <CardHeader
        {...cardHeaderProps}
        disableTypography
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
        title={
          <Stack direction="row" alignItems="center" gap={1}>
            {dragHandleProps && (
              <span {...dragHandleProps}>
                <DragIndicatorIcon sx={{ fontSize: 18 }} aria-label="tracker-drag-handle" />
              </span>
            )}
            <Typography variant="h5">{name}</Typography>
          </Stack>
        }
        subheader={
          <>
            <Typography display="block" variant="subtitle2">
              {`${beginVerb} ${formatDate(new Date(beginDate))}`}
            </Typography>
            <Typography display="block" variant="caption">
              <b>{frequencyText}</b>
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

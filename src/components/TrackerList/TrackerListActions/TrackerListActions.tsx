import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeselectIcon from '@mui/icons-material/Deselect';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MovingIcon from '@mui/icons-material/Moving';
import SelectAllIcon from '@mui/icons-material/SelectAll';
import SortIcon from '@mui/icons-material/Sort';
import { Box, IconButton, Menu, Typography } from '@mui/material';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { VariantType, useSnackbar } from 'notistack';
import { FC, useState } from 'react';

import { useAppDispatch } from '../../../app/hooks';
import Tracker from '../../../models/Tracker';
import TrackerStatus from '../../../models/TrackerStatus';
import {
  archiveTrackers,
  deleteTrackers,
  markTrackersAsActive
} from '../../../store/trackers/trackersSlice';
import TrackerEditDialog from '../../TrackerEditDialog/TrackerEditDialog';
import Order from '../Order';
import MenuItemWithTooltip from './MenuItemWithTooltip';

interface Props {
  order: Order;
  setOrder: (order: Order) => void;
  selectedTrackers: Tracker[];
  setSelectedTrackers: (trackers: Tracker[]) => void;
  trackers: Tracker[];
}

const TrackerListActions: FC<Props> = ({
  order,
  selectedTrackers,
  setOrder,
  setSelectedTrackers,
  trackers
}) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const displayMenu = Boolean(anchorEl);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const atLeastOneSelectedArchived = selectedTrackers.some(
    (t) => t.status === TrackerStatus.archived
  );
  const atLeastOneSelectedActive = selectedTrackers.some((t) => t.status === TrackerStatus.active);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const afterAction = () => {
    handleMenuClose();
    setSelectedTrackers([]);
  };

  const onEditValidation = () => {
    setIsEditOpen(false);
    enqueueSnackbar('Tracker édité !', { variant: 'success' });
    afterAction();
  };

  const handleAction = (
    action: ActionCreatorWithPayload<string[], string>,
    adjective: string,
    variant: VariantType
  ) => {
    dispatch(action(selectedTrackers.map((t) => t.id)));
    const plural = selectedTrackers.length > 1 ? 's' : '';
    enqueueSnackbar('Tracker' + plural + ' ' + adjective + plural + ' !', { variant: variant });
    afterAction();
  };

  const handleArchiveTrackers = () => {
    handleAction(archiveTrackers, 'archivé', 'success');
  };
  const handleDeleteTrackers = () => {
    handleAction(deleteTrackers, 'supprimé', 'info');
  };
  const handlemarkTrackersAsActive = () => {
    handleAction(markTrackersAsActive, 'actif', 'success');
  };
  const handleOpenTrackerEdit = () => {
    setIsEditOpen(true);
  };

  return (
    <>
      <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography>
            <b>{selectedTrackers.length}</b> sélectionné{selectedTrackers.length > 1 ? 's' : ''}
          </Typography>
        </Box>
        <Box>
          <IconButton onClick={() => setOrder(order === Order.asc ? Order.desc : Order.asc)}>
            <SortIcon sx={{ transform: `rotateX(${order === Order.asc ? '180deg' : '0'})` }} />
          </IconButton>

          {selectedTrackers.length === trackers.length ? (
            <IconButton onClick={() => setSelectedTrackers([])}>
              <DeselectIcon />
            </IconButton>
          ) : (
            <IconButton onClick={() => setSelectedTrackers(trackers)}>
              <SelectAllIcon />
            </IconButton>
          )}
          <IconButton onClick={handleMenuClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            id="tracker-list-actions-menu"
            open={displayMenu}
            onClose={handleMenuClose}>
            <MenuItemWithTooltip
              disabled={selectedTrackers.length !== 1}
              icon={<EditIcon />}
              onClick={handleOpenTrackerEdit}
              text={'Éditer'}
              tooltipTitle={
                selectedTrackers.length <= 1
                  ? ''
                  : "Vous ne pouvez éditer qu'un seul tracker à la fois."
              }
            />
            <MenuItemWithTooltip
              disabled={selectedTrackers.length === 0 || atLeastOneSelectedActive}
              icon={<MovingIcon />}
              onClick={handlemarkTrackersAsActive}
              text={'Rendre actif'}
              tooltipTitle={
                selectedTrackers.length === 0 || !atLeastOneSelectedActive
                  ? ''
                  : 'Vous ne pouvez pas rendre actif un tracker actif.'
              }
            />
            <MenuItemWithTooltip
              disabled={selectedTrackers.length === 0}
              icon={<DeleteForeverIcon />}
              onClick={handleDeleteTrackers}
              text={'Supprimer'}
            />
            <MenuItemWithTooltip
              disabled={selectedTrackers.length === 0 || atLeastOneSelectedArchived}
              icon={<ArchiveIcon />}
              onClick={handleArchiveTrackers}
              text={'Archiver'}
              tooltipTitle={
                selectedTrackers.length === 0 || !atLeastOneSelectedArchived
                  ? ''
                  : 'Vous ne pouvez pas archiver un tracker déjà archivé.'
              }
            />
          </Menu>
        </Box>
      </Box>
      {selectedTrackers.length === 1 && (
        <TrackerEditDialog
          dialogProps={{
            fullScreen: true,
            open: isEditOpen,
            onClose: () => setIsEditOpen(false)
          }}
          tracker={selectedTrackers[0]}
          onValidation={onEditValidation}
        />
      )}
    </>
  );
};

export default TrackerListActions;

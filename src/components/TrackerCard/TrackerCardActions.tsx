import AddTaskIcon from '@mui/icons-material/AddTask';
import CloseIcon from '@mui/icons-material/Close';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Box, Button, CardActions, CardActionsProps, IconButton } from '@mui/material';
import { isToday } from 'date-fns';
import { SnackbarKey, useSnackbar } from 'notistack';
import { FC, useState } from 'react';

import { useAppDispatch } from '../../app/hooks';
import Completion from '../../models/Completion';
import Tracker from '../../models/Tracker';
import {
  cancelLatestEntry,
  completelyValidate,
  customValidate,
  hideTracker,
  markTrackerAsVisible
} from '../../store/trackers/trackersSlice';
import CompleteValidationDialog from '../TrackerValidationDialog/CompleteValidationDialog';
import CustomValidationDialog from '../TrackerValidationDialog/CustomValidationDialog';
import MakeHiddenDialog from '../TrackerValidationDialog/MakeHiddenDialog';
import MakeVisibleValidationDialog from '../TrackerValidationDialog/MakeVisibleDialog';

interface Props {
  cardActionsProps?: CardActionsProps;
  onChipClick?: (completion: Completion) => void;
  selectedCompletions?: Completion[];
  setSelectedCompletions: (completions: Completion[]) => void;
  tracker: Tracker;
}

const TrackerCardActions: FC<Props> = ({
  cardActionsProps,
  onChipClick,
  selectedCompletions,
  setSelectedCompletions,
  tracker
}) => {
  const { requiredCompletions } = tracker;
  const dispatch = useAppDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [isCompleteValidationOpen, setIsCompleteValidationOpen] = useState(false);
  const [isCustomValidationOpen, setIsCustomValidationOpen] = useState(false);
  const [isMakeVisibleOpen, setIsMakeVisibleOpen] = useState(false);
  const [isMakeHiddenOpen, setIsMakeHiddenOpen] = useState(false);

  const cancelLatestValidation = () => {
    dispatch(cancelLatestEntry(tracker.id));
    enqueueSnackbar('Validation annulée', { variant: 'info' });
  };
  const CancelSnackbarActions = (key: SnackbarKey) => (
    <>
      <Button sx={{ color: 'white' }} onClick={cancelLatestValidation}>
        ANNULER
      </Button>
      <IconButton onClick={() => closeSnackbar(key)} size="small" sx={{ color: 'common.white' }}>
        <CloseIcon />
      </IconButton>
    </>
  );

  const handleCompleteValidation = () => {
    dispatch(completelyValidate(tracker.id));
    setIsCompleteValidationOpen(false);
    enqueueSnackbar('Tracker validé !', { variant: 'success', action: CancelSnackbarActions });
  };

  const handleCustomValidation = (completions: Completion[]) => {
    dispatch(customValidate({ id: tracker.id, completions: completions }));
    setIsCustomValidationOpen(false);
    setSelectedCompletions([]);
    enqueueSnackbar('Tracker validé !', { variant: 'success', action: CancelSnackbarActions });
  };

  const handleMakeVisible = () => {
    dispatch(markTrackerAsVisible(tracker.id));
    setIsMakeVisibleOpen(false);
    enqueueSnackbar('Tracker affiché !', { variant: 'success' });
  };

  const handleMakeHidden = () => {
    dispatch(hideTracker(tracker.id));
    setIsMakeHiddenOpen(false);
    enqueueSnackbar('Tracker masqué !', { variant: 'success' });
  };

  const isHidden = tracker.dateHidden && isToday(new Date(tracker.dateHidden));

  return (
    <CardActions {...cardActionsProps}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: isHidden ? 'right' : 'space-between',
          width: '100%'
        }}>
        {!isHidden && (
          <>
            <IconButton
              color="primary"
              size="large"
              onClick={() => setIsCompleteValidationOpen(true)}>
              <TaskAltIcon fontSize="large" />
            </IconButton>

            {requiredCompletions.length > 0 && (
              <IconButton
                color="primary"
                size="large"
                onClick={() => setIsCustomValidationOpen(true)}>
                <AddTaskIcon fontSize="large" />
              </IconButton>
            )}
          </>
        )}
        {isHidden ? (
          <IconButton color="primary" size="large" onClick={() => setIsMakeVisibleOpen(true)}>
            <VisibilityIcon fontSize="large" />
          </IconButton>
        ) : (
          <IconButton color="primary" size="large" onClick={() => setIsMakeHiddenOpen(true)}>
            <VisibilityOffIcon fontSize="large" />
          </IconButton>
        )}
      </Box>

      <CompleteValidationDialog
        dialogProps={{
          open: isCompleteValidationOpen,
          onClose: () => setIsCompleteValidationOpen(false)
        }}
        onValidation={handleCompleteValidation}
        tracker={tracker}
      />
      <CustomValidationDialog
        dialogProps={{
          open: isCustomValidationOpen,
          onClose: () => setIsCustomValidationOpen(false)
        }}
        onChipClick={onChipClick}
        onValidation={handleCustomValidation}
        selectedCompletions={selectedCompletions}
        tracker={tracker}
      />
      <MakeVisibleValidationDialog
        dialogProps={{
          open: isMakeVisibleOpen,
          onClose: () => setIsMakeVisibleOpen(false)
        }}
        onValidation={handleMakeVisible}
        tracker={tracker}
      />
      <MakeHiddenDialog
        dialogProps={{
          open: isMakeHiddenOpen,
          onClose: () => setIsMakeHiddenOpen(false)
        }}
        onValidation={handleMakeHidden}
        tracker={tracker}
      />
    </CardActions>
  );
};

export default TrackerCardActions;

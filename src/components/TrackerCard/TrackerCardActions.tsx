import CheckIcon from '@mui/icons-material/Check';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Box, CardActions, CardActionsProps, IconButton } from '@mui/material';
import { isToday } from 'date-fns';
import { useSnackbar } from 'notistack';
import { FC, useState } from 'react';

import { useAppDispatch } from '../../app/hooks';
import Completion from '../../models/Completion';
import Tracker from '../../models/Tracker';
import {
  completelyValidate,
  customValidate,
  hideTracker,
  makeTrackerVisible
} from '../../store/trackers/trackersSlice';
import CompleteValidationDialog from '../TrackerValidationDialog/CompleteValidationDialog';
import CustomValidationDialog from '../TrackerValidationDialog/CustomValidationDialog';
import MakeHiddenDialog from '../TrackerValidationDialog/MakeHiddenDialog';
import MakeVisibleValidationDialog from '../TrackerValidationDialog/MakeVisibleDialog';

interface Props {
  cardActionsProps?: CardActionsProps;
  selectedCompletions?: Completion[];
  onChipClick?: (completion: Completion) => void;
  tracker: Tracker;
}

const TrackerCardActions: FC<Props> = ({
  cardActionsProps,
  onChipClick,
  selectedCompletions,
  tracker
}) => {
  const { requiredCompletions } = tracker;
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [isCompleteValidationOpen, setIsCompleteValidationOpen] = useState(false);
  const [isCustomValidationOpen, setIsCustomValidationOpen] = useState(false);
  const [isMakeVisibleOpen, setIsMakeVisibleOpen] = useState(false);
  const [isMakeHiddenOpen, setIsMakeHiddenOpen] = useState(false);

  const handleCompleteValidation = () => {
    dispatch(completelyValidate(tracker.id));
    setIsCompleteValidationOpen(false);
    enqueueSnackbar('Tracker validé !', { variant: 'success' });
  };

  const handleCustomValidation = (completions: Completion[]) => {
    dispatch(customValidate({ id: tracker.id, completions: completions }));
    setIsCustomValidationOpen(false);
    enqueueSnackbar('Tracker validé !', { variant: 'success' });
  };

  const handleMakeVisible = () => {
    dispatch(makeTrackerVisible(tracker.id));
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
              <CheckIcon fontSize="large" />
            </IconButton>

            {requiredCompletions.length > 0 && (
              <IconButton
                color="primary"
                size="large"
                onClick={() => setIsCustomValidationOpen(true)}>
                <CheckCircleIcon fontSize="large" />
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
          onClose: () => setIsCompleteValidationOpen(false),
          sx: {
            '.MuiDialog-paper': { bgcolor: 'secondary' }
          }
        }}
        onValidation={handleCompleteValidation}
        tracker={tracker}
      />
      <CustomValidationDialog
        dialogProps={{
          open: isCustomValidationOpen,
          onClose: () => setIsCustomValidationOpen(false),
          sx: {
            '.MuiDialog-paper': { bgcolor: 'secondary' }
          }
        }}
        onChipClick={onChipClick}
        onValidation={handleCustomValidation}
        selectedCompletions={selectedCompletions}
        tracker={tracker}
      />
      <MakeVisibleValidationDialog
        dialogProps={{
          open: isMakeVisibleOpen,
          onClose: () => setIsMakeVisibleOpen(false),
          sx: {
            '.MuiDialog-paper': { bgcolor: 'secondary' }
          }
        }}
        onValidation={handleMakeVisible}
        tracker={tracker}
      />
      <MakeHiddenDialog
        dialogProps={{
          open: isMakeHiddenOpen,
          onClose: () => setIsMakeHiddenOpen(false),
          sx: {
            '.MuiDialog-paper': { bgcolor: 'secondary' }
          }
        }}
        onValidation={handleMakeHidden}
        tracker={tracker}
      />
    </CardActions>
  );
};

export default TrackerCardActions;

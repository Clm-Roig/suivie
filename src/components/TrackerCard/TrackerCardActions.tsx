import { FC, useState } from 'react';
import { Box, CardActions, CardActionsProps, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckIcon from '@mui/icons-material/Check';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CompleteValidationDialog from '../TrackerValidationDialog/CompleteValidationDialog';
import CustomValidationDialog from '../TrackerValidationDialog/CustomValidationDialog';
import MakeHiddenDialog from '../TrackerValidationDialog/MakeHiddenDialog';
import MakeVisibleValidationDialog from '../TrackerValidationDialog/MakeVisibleDialog';
import { completelyValidate, customValidate } from '../../store/trackers/trackersSlice';
import Tracker from '../../models/Tracker';
import Completion from '../../models/Completion';
import { useAppDispatch } from '../../app/hooks';
import { useSnackbar } from 'notistack';
import { isToday } from 'date-fns';

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
  const dispatch = useAppDispatch();
  const [isCompleteValidationOpen, setIsCompleteValidationOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [isCustomValidationOpen, setIsCustomValidationOpen] = useState(false);
  const [isMakeVisible, setIsMakeVisible] = useState(false);
  const [isMakeHidden, setIsMakeHidden] = useState(false);

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

  // TODO: remove next line when feature is implemented
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleMakeVisible = () => {
    // eslint-disable-next-line no-console
    console.log('make visible to be implementend');
  };

  // TODO: remove next line when feature is implemented
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleMakeHidden = () => {
    // eslint-disable-next-line no-console
    console.log('make hidden to be implementend');
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
            <IconButton
              color="primary"
              size="large"
              onClick={() => setIsCustomValidationOpen(true)}>
              <CheckCircleIcon fontSize="large" />
            </IconButton>
          </>
        )}
        {isHidden ? (
          <IconButton color="primary" size="large" onClick={() => setIsMakeVisible(true)}>
            <VisibilityIcon fontSize="large" />
          </IconButton>
        ) : (
          <IconButton color="primary" size="large" onClick={() => setIsMakeHidden(true)}>
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
          open: isMakeVisible,
          onClose: () => setIsMakeVisible(false),
          sx: {
            '.MuiDialog-paper': { bgcolor: 'secondary' }
          }
        }}
        onValidation={handleMakeVisible}
        tracker={tracker}
      />
      <MakeHiddenDialog
        dialogProps={{
          open: isMakeHidden,
          onClose: () => setIsMakeHidden(false),
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

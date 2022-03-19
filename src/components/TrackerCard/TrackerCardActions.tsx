import { FC, useState } from 'react';
import { Box, CardActions, CardActionsProps, IconButton, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckIcon from '@mui/icons-material/Check';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CompleteValidationDialog from '../TrackerValidationDialog/CompleteValidationDialog';
import CustomValidationDialog from '../TrackerValidationDialog/CustomValidationDialog';
import { completelyValidate } from '../../store/trackers/trackersSlice';
import Tracker from '../../models/Tracker';
import Completion from '../../models/Completion';
import { useAppDispatch } from '../../app/hooks';
import { useSnackbar } from 'notistack';

interface Props {
  cardActionsProps?: CardActionsProps;
  tracker: Tracker;
}

const TrackerCardActions: FC<Props> = ({ cardActionsProps, tracker }) => {
  const dispatch = useAppDispatch();
  const [isCompleteValidationOpen, setIsCompleteValidationOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [isCustomValidationOpen, setIsCustomValidationOpen] = useState(false);

  const handleCompleteValidation = () => {
    dispatch(completelyValidate(tracker.id));
    setIsCompleteValidationOpen(false);
    enqueueSnackbar('Tracker validé !', { variant: 'success' });
  };

  const handleCustomValidation = (completions: Completion[]) => {
    console.log('custom validation');
  };

  return (
    <CardActions {...cardActionsProps}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <IconButton color="primary" size="large" onClick={() => setIsCompleteValidationOpen(true)}>
          <CheckIcon fontSize="large" />
        </IconButton>
        <IconButton color="primary" size="large" onClick={() => setIsCustomValidationOpen(true)}>
          <CheckCircleIcon fontSize="large" />
        </IconButton>
        <IconButton color="primary" size="large">
          <VisibilityOffIcon fontSize="large" />
        </IconButton>
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
        onValidation={handleCustomValidation}
        tracker={tracker}
      />
    </CardActions>
  );
};

export default TrackerCardActions;

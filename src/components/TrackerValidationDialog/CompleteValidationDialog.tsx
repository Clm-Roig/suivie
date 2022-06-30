import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle
} from '@mui/material';
import { isToday } from 'date-fns';
import { FC } from 'react';

import { useAppSelector } from '../../hooks/redux';
import Tracker from '../../models/Tracker';
import { selectSelectedDate } from '../../store/trackers/trackers.selectors';
import { getDefaultValidationCompletions } from '../../store/trackers/utils';
import formatDate from '../../utils/formatDate';
import CompletionChipList from '../CompletionChipList/CompletionChipList';

interface Props {
  dialogProps: DialogProps;
  onValidation: () => void;
  tracker: Tracker;
}

const CompleteValidationDialog: FC<Props> = ({ dialogProps, onValidation, tracker }) => {
  const selectedDate = new Date(useAppSelector(selectSelectedDate));
  const { name, defaultCompletions, requiredCompletions } = tracker;
  const completionsUsed = getDefaultValidationCompletions(tracker);
  return (
    <Dialog {...dialogProps}>
      <DialogTitle id="alert-dialog-title">
        {'Tracker : '}
        <b>{name}</b>
      </DialogTitle>
      <DialogContent sx={{ pb: 0 }}>
        {requiredCompletions.length > 0 && (
          <>
            <DialogContentText>Valider avec :</DialogContentText>
            <CompletionChipList sx={{ mb: 1 }} completions={completionsUsed} />
          </>
        )}
        {defaultCompletions && defaultCompletions.length > 0 && (
          <Alert icon={false} severity="info">
            Cette validation utilise des réalisations par défaut
          </Alert>
        )}
        {!isToday(selectedDate) && (
          <Alert icon={false} severity="warning">
            Vous validez ce tracker pour le <b>{formatDate(selectedDate)}</b>.
          </Alert>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onValidation} autoFocus>
          Valider
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CompleteValidationDialog;

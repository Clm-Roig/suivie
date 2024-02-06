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
import { FC, useEffect } from 'react';

import { useAppSelector } from '../../hooks/redux';
import Completion from '../../models/Completion';
import Tracker from '../../models/Tracker';
import { selectSelectedDate } from '../../store/trackers/trackers.selectors';
import formatDate from '../../utils/formatDate';
import CompletionChipList from '../CompletionChipList/CompletionChipList';
import ValidateCompletionsForm from '../forms/ValidateCompletionsForm/ValidateCompletionsForm';

interface Props {
  dialogProps: DialogProps;
  onChipClick?: (completion: Completion) => void;
  onValidation: (completions: Completion[]) => void;
  selectedCompletions?: Completion[];
  setSelectedCompletions: (completions: Completion[]) => void;
  tracker: Tracker;
}

const CustomValidationDialog: FC<Props> = ({
  dialogProps,
  onChipClick,
  onValidation,
  selectedCompletions,
  setSelectedCompletions,
  tracker
}) => {
  const selectedDate = new Date(useAppSelector(selectSelectedDate));
  const { name, requiredCompletions } = tracker;

  useEffect(() => {
    // Default select the only completion when opening (and unselect it when closing)
    if (requiredCompletions?.length === 1) {
      setSelectedCompletions(dialogProps.open ? requiredCompletions : []);
    }
  }, [setSelectedCompletions, requiredCompletions, dialogProps.open]);

  return (
    <Dialog {...dialogProps}>
      <DialogTitle id="alert-dialog-title">
        {'Tracker : '}
        <b>{name}</b>
      </DialogTitle>
      <DialogContent sx={{ pb: 0 }}>
        <DialogContentText gutterBottom>
          Sélectionnez les objectifs à valider parmi ceux ci-dessous :
        </DialogContentText>
        <CompletionChipList
          completions={requiredCompletions}
          onChipClick={onChipClick}
          selectedCompletions={selectedCompletions}
          sx={{ mb: 1 }}
        />
        <ValidateCompletionsForm
          completions={selectedCompletions || []}
          formId={'completions-form-' + tracker.name}
          onSubmit={onValidation}
        />
        {!isToday(selectedDate) && (
          <Alert icon={false} severity="warning">
            Vous validez ce tracker pour le <b>{formatDate(selectedDate)}</b>.
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          type="submit"
          disabled={selectedCompletions && selectedCompletions.length === 0}
          form={'completions-form-' + tracker.name}>
          Valider
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomValidationDialog;

import { FC } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogProps
} from '@mui/material';
import Completion from '../../models/Completion';
import Tracker from '../../models/Tracker';
import CompletionChipList from '../CompletionChipList/CompletionChipList';
import ValidateCompletionsForm from '../ValidateCompletionsForm/ValidateCompletionsForm';

interface Props {
  dialogProps: DialogProps;
  onChipClick?: (completion: Completion) => void;
  onValidation: (completions: Completion[]) => void;
  selectedCompletions?: Completion[];
  tracker: Tracker;
}

const CustomValidationDialog: FC<Props> = ({
  dialogProps,
  onChipClick,
  onValidation,
  selectedCompletions,
  tracker
}) => {
  const { name, requiredCompletions } = tracker;
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
          boxProps={{ sx: { mb: 2 } }}
          completions={requiredCompletions}
          onChipClick={onChipClick}
          selectedCompletions={selectedCompletions}
        />
        <ValidateCompletionsForm
          completions={selectedCompletions || []}
          formId={'completions-form-' + tracker.name}
          onSubmit={onValidation}
        />
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

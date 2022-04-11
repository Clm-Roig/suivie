import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle
} from '@mui/material';
import { FC } from 'react';

import Tracker from '../../models/Tracker';
import CompletionChipList from '../CompletionChipList/CompletionChipList';

interface Props {
  dialogProps: DialogProps;
  onValidation: () => void;
  tracker: Tracker;
}

const CompleteValidationDialog: FC<Props> = ({ dialogProps, onValidation, tracker }) => {
  const { name, requiredCompletions } = tracker;
  return (
    <Dialog {...dialogProps}>
      <DialogTitle id="alert-dialog-title">
        {'Tracker : '}
        <b>{name}</b>
      </DialogTitle>
      <DialogContent sx={{ pb: 0 }}>
        <DialogContentText>Valider avec :</DialogContentText>
        <CompletionChipList completions={requiredCompletions} />
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

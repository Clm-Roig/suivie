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

interface Props {
  dialogProps: DialogProps;
  onValidation: (completions: Completion[]) => void;
  tracker: Tracker;
}

const CustomValidationDialog: FC<Props> = ({ dialogProps, onValidation, tracker }) => {
  const { name, requiredCompletions } = tracker;
  return (
    <Dialog {...dialogProps}>
      <DialogTitle id="alert-dialog-title">
        {'Tracker : '}
        <b>{name}</b>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>En cours de développement...</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus>En cours de développement...</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomValidationDialog;

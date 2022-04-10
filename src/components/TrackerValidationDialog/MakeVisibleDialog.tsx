// TODO : remove next line when the feature is implemented

/* eslint-disable @typescript-eslint/no-unused-vars */
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

interface Props {
  dialogProps: DialogProps;
  onValidation: () => void;
  tracker: Tracker;
}

const MakeVisibleValidationDialog: FC<Props> = ({ dialogProps, onValidation, tracker }) => {
  const { name, requiredCompletions } = tracker;
  return (
    <Dialog {...dialogProps}>
      <DialogTitle id="alert-dialog-title">
        {'Tracker : '}
        <b>{name}</b>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>[Rendre visible] En cours de développement...</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus>En cours de développement...</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MakeVisibleValidationDialog;

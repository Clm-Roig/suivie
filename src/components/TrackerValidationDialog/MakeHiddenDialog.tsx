// TODO : remove next line when the feature is implemented
/* eslint-disable @typescript-eslint/no-unused-vars */

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
import Tracker from '../../models/Tracker';

interface Props {
  dialogProps: DialogProps;
  onValidation: () => void;
  tracker: Tracker;
}

const MakeHiddenDialog: FC<Props> = ({ dialogProps, onValidation, tracker }) => {
  const { name, requiredCompletions } = tracker;
  return (
    <Dialog {...dialogProps}>
      <DialogTitle id="alert-dialog-title">
        {'Tracker : '}
        <b>{name}</b>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>[Masquer tracker] En cours de développement...</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus>En cours de développement...</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MakeHiddenDialog;

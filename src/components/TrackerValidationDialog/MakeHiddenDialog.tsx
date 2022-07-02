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

const MakeHiddenDialog: FC<Props> = ({ dialogProps, onValidation, tracker }) => {
  const { name } = tracker;
  return (
    <Dialog {...dialogProps}>
      <DialogTitle id="alert-dialog-title">
        {'Tracker : '}
        <b>{name}</b>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Voulez-vous masquer ce tracker pendant un jour ?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onValidation} autoFocus>
          Masquer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MakeHiddenDialog;

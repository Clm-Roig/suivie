import CloseIcon from '@mui/icons-material/Close';
import {
  AppBar,
  Dialog,
  DialogContent,
  DialogProps,
  IconButton,
  Slide,
  Toolbar,
  Typography
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React, { FC } from 'react';

import { useAppDispatch } from '../../app/hooks';
import Tracker from '../../models/Tracker';
import { editTracker } from '../../store/trackers/trackersSlice';
import TrackerForm from '../forms/TrackerForm/TrackerForm';

const DialogTransitionUp = React.forwardRef(function DialogTransitionUp(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  dialogProps: DialogProps;
  onValidation: () => void;
  tracker: Tracker;
}

const TrackerEditDialog: FC<Props> = ({ dialogProps, onValidation, tracker }) => {
  const { name } = tracker;
  const dispatch = useAppDispatch();

  const onSubmit = (tracker: Tracker) => {
    dispatch(editTracker(tracker));
    onValidation();
  };

  const handleOnClose = (event: object) => {
    if (dialogProps.onClose) dialogProps.onClose(event, 'escapeKeyDown');
  };

  return (
    <Dialog TransitionComponent={DialogTransitionUp} {...dialogProps}>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleOnClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ flex: 1 }} variant="h6">
            {'Édition de '}
            <b>{name}</b>
          </Typography>
        </Toolbar>
      </AppBar>
      <DialogContent sx={{ pb: 0 }}>
        <TrackerForm initialValues={tracker} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default TrackerEditDialog;

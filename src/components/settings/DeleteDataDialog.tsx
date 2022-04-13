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

interface Props {
  dialogProps: DialogProps;
  onDelete: () => void;
}

const DeleteDataDialog: FC<Props> = ({ dialogProps, onDelete }) => {
  return (
    <Dialog {...dialogProps}>
      <DialogTitle>Suppression de vos données</DialogTitle>
      <DialogContent>
        <DialogContentText gutterBottom>
          Êtes vous sûr·e de vouloir supprimer toutes vos données ? Cette action est{' '}
          <b>irréversible</b>.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDelete} color="error" autoFocus>
          Supprimer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDataDialog;

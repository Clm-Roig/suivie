import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Alert, Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

import { useAppDispatch } from '../../app/hooks';
import { deleteStore } from '../../store/app/appSlice';
import DeleteDataDialog from './DeleteDataDialog';

const DeleteSection = () => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleOnDelete = () => {
    dispatch(deleteStore());
    setIsDeleteDialogOpen(false);
    enqueueSnackbar('Données supprimées !', { variant: 'info' });
  };
  return (
    <>
      <Alert severity="error">Cette action est irréversible !</Alert>
      <Button
        size="large"
        startIcon={<DeleteForeverIcon />}
        onClick={() => setIsDeleteDialogOpen(true)}
        variant="contained"
        color="error">
        Supprimer toutes les données
      </Button>
      <DeleteDataDialog
        dialogProps={{ open: isDeleteDialogOpen, onClose: () => setIsDeleteDialogOpen(false) }}
        onDelete={handleOnDelete}
      />
    </>
  );
};
export default DeleteSection;

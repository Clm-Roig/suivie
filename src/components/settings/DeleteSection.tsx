import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Alert, Button, Stack, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

import { useAppDispatch } from '../../app/hooks';
import { APP_NAME } from '../../config/Constants';
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
    <Stack spacing={1} alignItems={'center'}>
      <Typography>
        Cette action videra votre stockage local de toutes les données créées par {APP_NAME}.
      </Typography>
      <Alert severity="error">Cette action est irréversible !</Alert>
      <Button
        fullWidth
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
    </Stack>
  );
};
export default DeleteSection;

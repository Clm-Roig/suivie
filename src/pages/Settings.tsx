import { Button, Stack, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

import { useAppDispatch } from '../app/hooks';
import DeleteDataDialog from '../components/settings/DeleteDataDialog';
import { deleteStore } from '../store/app/appSlice';

const Settings = () => {
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
      <Typography gutterBottom variant="h1">
        Paramètres
      </Typography>
      <Stack spacing={2} direction="column">
        <Typography>Fonctionnalités en cours de développement</Typography>
        <Button disabled variant="contained">
          Importer des données
        </Button>
        <Button disabled variant="contained">
          Exporter les données
        </Button>
        <Button onClick={() => setIsDeleteDialogOpen(true)} variant="contained" color="error">
          Supprimer toutes les données
        </Button>
        <DeleteDataDialog
          dialogProps={{ open: isDeleteDialogOpen, onClose: () => setIsDeleteDialogOpen(false) }}
          onDelete={handleOnDelete}
        />
      </Stack>
    </>
  );
};
export default Settings;

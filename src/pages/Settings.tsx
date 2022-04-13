import { Button, Stack, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import DeleteDataDialog from '../components/settings/DeleteDataDialog';
import { selectWholeStore } from '../store/app/app.selector';
import { deleteStore } from '../store/app/appSlice';
import formatDate from '../utils/formatDate';

const Settings = () => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const store = useAppSelector(selectWholeStore);

  const handleDataImport = () => {};

  const handleDataExport = () => {
    const jsonStore = JSON.stringify(store);

    // Trigger download code taken from
    // https://stackoverflow.com/questions/3665115/how-to-create-a-file-in-memory-for-user-to-download-but-not-through-server/18197341#18197341
    const element = document.createElement('a');
    element.style.display = 'none';
    element.setAttribute(
      'href',
      'data:application/json;charset=utf-8,' + encodeURIComponent(jsonStore)
    );
    element.setAttribute(
      'download',
      'bujo-tracker-data-' + formatDate(new Date(), "dd-MMMM-yyyy_HH'h'mm'm'ss's'") + '.json'
    );
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

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
        <Button onClick={handleDataImport} variant="contained">
          Importer des données
        </Button>
        <Button onClick={handleDataExport} variant="contained">
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

import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Alert, Button, CircularProgress, Stack, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { ChangeEvent, useState } from 'react';

import { useAppDispatch } from '../../app/hooks';
import { JSON_DATA_EXTENSION } from '../../config/Constants';
import { createStoreFromJSONString } from '../../store/app/appSlice';

const ImportSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const fileInputId = 'import-json-data-file-input';

  const onImportClick = () => {
    const input = document.getElementById(fileInputId);
    if (input) {
      input.click();
    }
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    event.stopPropagation();
    event.preventDefault();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      file
        .text()
        .then((data) => {
          dispatch(createStoreFromJSONString(data));
          setIsLoading(false);
          enqueueSnackbar('Importation réussie ! 🥳', {
            variant: 'success'
          });
        })
        .catch(() => {
          setIsLoading(false);
          enqueueSnackbar('Quelque chose ne va pas avec votre fichier...', {
            variant: 'error'
          });
        });
    }
  };
  return (
    <Stack spacing={1} alignItems={'center'}>
      <Typography>
        {
          "L'import de données se fait grâce à un fichier exporté au préalable via BujoTracker. Son extension est "
        }
        <b>{JSON_DATA_EXTENSION}</b>
        {'. '}
      </Typography>
      <Alert severity="warning">
        {' '}
        <b>Attention</b>
        {", l'importation de nouvelles données écrasera celles déjà présentes."}
      </Alert>
      <Button
        fullWidth
        size="large"
        startIcon={<FileUploadIcon />}
        onClick={onImportClick}
        variant="contained">
        Importer des données
        {isLoading && <CircularProgress size="small" />}
      </Button>
      <input
        accept={JSON_DATA_EXTENSION}
        id={fileInputId}
        onChange={handleFileUpload}
        style={{ display: 'none' }}
        type="file"
      />
    </Stack>
  );
};

export default ImportSection;

import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Button, Stack, Typography } from '@mui/material';

import { useAppSelector } from '../../app/hooks';
import { JSON_DATA_EXTENSION } from '../../config/Constants';
import { selectWholeStore } from '../../store/app/app.selector';
import formatDate from '../../utils/formatDate';

const Settings = () => {
  const store = useAppSelector(selectWholeStore);

  const handleDataExport = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _persist, ...storeToExport } = store; // _persist is created by redux-persists and is causing an error when reimported
    const jsonStore = JSON.stringify(storeToExport);

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
      'bujo-tracker-data-' +
        formatDate(new Date(), "dd-MMMM-yyyy_HH'h'mm'm'ss's'") +
        JSON_DATA_EXTENSION
    );
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <Stack spacing={1} alignItems={'center'}>
      <Typography>
        Téléchargez vos données pour pouvoir les importer plus tard, ici ou sur un autre appareil.
      </Typography>
      <Button
        fullWidth
        size="large"
        startIcon={<FileDownloadIcon />}
        onClick={handleDataExport}
        variant="contained">
        Télécharger les données
      </Button>
    </Stack>
  );
};
export default Settings;

import { Button, Divider, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { useSnackbar } from 'notistack';

import TrackerCard from '../../components/TrackerCard/TrackerCard';
import TrackerList from '../../components/TrackerList/TrackerList';
import TrackerColor from '../../models/TrackerColor';
import makeFakeCompletion from '../../models/factories/makeFakeCompletion';
import makeFakeTracker from '../../models/factories/makeFakeTracker';

const tracker = makeFakeTracker({ name: 'Tracker de test' });
const complexTracker = makeFakeTracker({
  name: 'Tracker complexe',
  requiredCompletions: [
    makeFakeCompletion({ unit: 'pommes' }),
    makeFakeCompletion({ unit: 'poires' })
  ]
});

const trackers = [1, 2, 3, 4].map((i) =>
  makeFakeTracker({ name: 'Tracker ' + i, color: Object.values(TrackerColor)[i] })
);

const Components = () => {
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Box>
      <Typography variant="h3" component="h2" gutterBottom>
        Composants
      </Typography>
      <Stack divider={<Divider />} spacing={4}>
        <Box>
          <Typography>Carte de tracker simple</Typography>
          <TrackerCard tracker={tracker} />
        </Box>
        <Box>
          <Typography>Carte de tracker complexe</Typography>
          <TrackerCard tracker={complexTracker} />
        </Box>
        <Box>
          <Typography>Liste de trackers</Typography>
          <TrackerList trackers={trackers} />
        </Box>
        <Box>
          <Typography>Notifications</Typography>
          <Box display="flex" gap={1} flexWrap="wrap">
            <Button
              variant="contained"
              color={'info'}
              onClick={() => enqueueSnackbar('Info', { variant: 'info' })}>
              Info
            </Button>
            <Button
              variant="contained"
              color={'warning'}
              onClick={() => enqueueSnackbar('Info', { variant: 'warning' })}>
              Avertissement
            </Button>
            <Button
              variant="contained"
              color={'error'}
              onClick={() => enqueueSnackbar('Erreur', { variant: 'error' })}>
              Erreur
            </Button>
            <Button
              variant="contained"
              color={'success'}
              onClick={() => enqueueSnackbar('Succès', { variant: 'success' })}>
              Succès
            </Button>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default Components;

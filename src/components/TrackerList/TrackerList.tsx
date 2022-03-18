import { Box, CircularProgress, IconButton, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { useAppSelector } from '../../app/hooks';
import formatDate from '../../utils/formatDate';
import SliceStatus from '../../models/SliceStatus';
import selectTrackers from '../../store/trackers/trackers.selectors';
import TrackerCard from '../TrackerCard/TrackerCard';
import AddTrackerCard from './AddTrackerCard';

function TrackerList() {
  const { status, trackers } = useAppSelector(selectTrackers);
  const cardSxProp = { mt: 2, bgcolor: 'secondary.main' };

  return (
    <Box>
      {status === SliceStatus.loading && <CircularProgress />}

      <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', width: '100%' }}>
        <IconButton>
          <ChevronLeftIcon color="primary" fontSize="large" />
        </IconButton>
        <Typography variant="h5">{formatDate(new Date())}</Typography>
        <IconButton>
          <ChevronRightIcon color="primary" fontSize="large" />
        </IconButton>
      </Box>

      {((trackers && trackers.length === 0) || !trackers) && (
        <Typography align="center">{"Vous n'avez pas encore de trackers."}</Typography>
      )}

      <AddTrackerCard cardProps={{ sx: cardSxProp }} />

      {trackers && trackers.length > 0 && (
        <>
          {trackers.map((t) => (
            <TrackerCard tracker={t} key={t.id} cardProps={{ sx: cardSxProp }} />
          ))}
        </>
      )}
    </Box>
  );
}

export default TrackerList;

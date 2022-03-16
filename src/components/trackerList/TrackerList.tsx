import { Box, CircularProgress, Typography } from '@mui/material';

import { useAppSelector } from '../../app/hooks';
import SliceStatus from '../../models/SliceStatus';
import selectTrackers from '../../store/trackers/trackers.selectors';

import TrackerCard from '../TrackerCard/TrackerCard';

function TrackerList() {
  const { status, trackers } = useAppSelector(selectTrackers);

  return (
    <Box>
      {status === SliceStatus.loading && <CircularProgress />}
      {trackers && trackers.length === 0 && <Typography>There are no trackers.</Typography>}
      {trackers && trackers.length > 0 && (
        <>
          {trackers.map((t) => (
            <TrackerCard tracker={t} key={t.name} cardProps={{ sx: { m: 1 } }} />
          ))}
        </>
      )}
    </Box>
  );
}

export default TrackerList;

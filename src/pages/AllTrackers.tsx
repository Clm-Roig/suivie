import { Box, Typography } from '@mui/material';

import { useAppSelector } from '../app/hooks';
import AddTrackerCard from '../components/TrackerCardList/AddTrackerCard';
import TrackerList from '../components/TrackerList/TrackerList';
import { selectAllTrackers } from '../store/trackers/trackers.selectors';

function AllTrackers() {
  const { trackers } = useAppSelector(selectAllTrackers);

  return (
    <Box>
      {trackers.length === 0 && (
        <Typography align="center">{"Vous n'avez pas encore de trackers."}</Typography>
      )}

      <AddTrackerCard />

      <TrackerList trackers={trackers} />
    </Box>
  );
}
export default AllTrackers;

import { Typography } from '@mui/material';

import DefaultPageLayout from '../../components/DefaultPageLayout/DefaultPageLayout';
import AddTrackerCard from '../../components/TrackerCardList/AddTrackerCard';
import TrackerList from '../../components/TrackerList/TrackerList';
import { useAppSelector } from '../../hooks/redux';
import { selectAllTrackers } from '../../store/trackers/trackers.selectors';

function ManageTrackers() {
  const { trackers } = useAppSelector(selectAllTrackers);

  return (
    <DefaultPageLayout>
      {trackers.length === 0 && (
        <Typography align="center">{"Vous n'avez pas encore de trackers."}</Typography>
      )}

      <AddTrackerCard />

      <TrackerList trackers={trackers} />
    </DefaultPageLayout>
  );
}
export default ManageTrackers;

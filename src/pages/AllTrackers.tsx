import { Box, Typography, useTheme } from '@mui/material';

import { useAppSelector } from '../app/hooks';
import AddTrackerCard from '../components/TrackerCardList/AddTrackerCard';
import TrackerList from '../components/TrackerList/TrackerList';
import ThemeMode from '../models/ThemeMode';
import { selectThemeMode } from '../store/theme/theme.selectors';
import { selectAllTrackers } from '../store/trackers/trackers.selectors';

function AllTrackers() {
  const { trackers } = useAppSelector(selectAllTrackers);
  const theme = useTheme();
  const themeMode = useAppSelector(selectThemeMode);

  const cardSxProp = {
    mb: 2,
    bgcolor: themeMode === ThemeMode.LIGHT ? 'secondary.main' : theme.palette.grey[900]
  };

  return (
    <Box>
      {trackers.length === 0 && (
        <Typography align="center">{"Vous n'avez pas encore de trackers."}</Typography>
      )}

      <AddTrackerCard cardProps={{ sx: cardSxProp }} />

      <TrackerList trackers={trackers} />
    </Box>
  );
}
export default AllTrackers;

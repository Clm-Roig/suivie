import BallotIcon from '@mui/icons-material/Ballot';
import CheckIcon from '@mui/icons-material/Check';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Alert, Box, Tab, Tabs, Typography, useTheme } from '@mui/material';
import { useState } from 'react';

import { useAppSelector } from '../app/hooks';
import TabPanel from '../components/TabPanel/TabPanel';
import AddTrackerCard from '../components/TrackerList/AddTrackerCard';
import DateSelector from '../components/TrackerList/DateSelector';
import TrackerList from '../components/TrackerList/TrackerList';
import ThemeMode from '../models/ThemeMode';
import { selectThemeMode } from '../store/theme/theme.selectors';
import {
  selectHiddenTrackers,
  selectTodoTrackers,
  selectTrackersDone
} from '../store/trackers/trackers.selectors';

function Trackers() {
  const { trackers: doneTrackers } = useAppSelector(selectTrackersDone);
  const { trackers: hiddenTrackers } = useAppSelector(selectHiddenTrackers);
  const { trackers: todoTrackers } = useAppSelector(selectTodoTrackers);
  const [selectedTab, setSelectedTab] = useState(0);
  const handleTabChange = (event: React.SyntheticEvent, newTab: number) => {
    setSelectedTab(newTab);
  };
  const theme = useTheme();
  const themeMode = useAppSelector(selectThemeMode);

  const cardSxProp = {
    mb: 2,
    bgcolor: themeMode === ThemeMode.LIGHT ? 'secondary.main' : theme.palette.grey[900]
  };

  return (
    <Box>
      <DateSelector />

      {doneTrackers.length + hiddenTrackers.length + todoTrackers.length === 0 && (
        <Typography align="center">{"Vous n'avez pas encore de trackers."}</Typography>
      )}

      <Tabs
        aria-label="icon label tabs"
        centered
        onChange={handleTabChange}
        sx={{ mb: 2 }}
        TabIndicatorProps={{ style: { backgroundColor: 'main.accent' } }}
        variant="fullWidth"
        value={selectedTab}>
        <Tab icon={<BallotIcon />} label="À FAIRE" />
        <Tab icon={<CheckIcon />} label="FAIT(S)" />
        <Tab icon={<VisibilityOffIcon />} label="MASQUÉ(S)" />
      </Tabs>

      <TabPanel value={selectedTab} index={0}>
        <AddTrackerCard cardProps={{ sx: cardSxProp }} />
        {todoTrackers.length === 0 ? (
          <Alert severity="info">{"Vous n'avez aucun tracker à compléter aujourd'hui."}</Alert>
        ) : (
          <TrackerList trackers={todoTrackers} cardProps={{ sx: cardSxProp }} />
        )}
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        {doneTrackers.length === 0 ? (
          <Alert severity="info">{"Vous n'avez complété aucun tracker aujourd'hui."}</Alert>
        ) : (
          <TrackerList trackers={doneTrackers} cardProps={{ sx: cardSxProp }} />
        )}
      </TabPanel>
      <TabPanel value={selectedTab} index={2}>
        {hiddenTrackers.length === 0 ? (
          <Alert severity="info">{"Vous n'avez aucun tracker masqué aujourd'hui."}</Alert>
        ) : (
          <TrackerList trackers={hiddenTrackers} cardProps={{ sx: cardSxProp }} />
        )}
      </TabPanel>
    </Box>
  );
}
export default Trackers;

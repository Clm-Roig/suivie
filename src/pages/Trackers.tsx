import { useState } from 'react';
import { Alert, Box, Tab, Tabs, Typography } from '@mui/material';
import BallotIcon from '@mui/icons-material/Ballot';
import CheckIcon from '@mui/icons-material/Check';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { useAppSelector } from '../app/hooks';
import DateSelector from '../components/TrackerList/DateSelector';
import TrackerList from '../components/TrackerList/TrackerList';
import AddTrackerCard from '../components/TrackerList/AddTrackerCard';
import {
  selectDoneTrackers,
  selectHiddenTrackers,
  selectTodoTrackers
} from '../store/trackers/trackers.selectors';
import TabPanel from '../components/TabPanel/TabPanel';

function Trackers() {
  const { trackers: doneTrackers } = useAppSelector(selectDoneTrackers);
  const { trackers: hiddenTrackers } = useAppSelector(selectHiddenTrackers);
  const { trackers: todoTrackers } = useAppSelector(selectTodoTrackers);
  const [selectedTab, setSelectedTab] = useState(0);
  const handleTabChange = (event: React.SyntheticEvent, newTab: number) => {
    setSelectedTab(newTab);
  };

  const cardSxProp = { mb: 2, bgcolor: 'secondary.main' };

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

import { SelectChangeEvent, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';
import { addDays, startOfDay } from 'date-fns';
import { useAppSelector } from '../app/hooks';
import TabPanel from '../components/TabPanel/TabPanel';
import { ALL_TRACKERS_ID, SEVEN_DAYS_AGO_DATE } from '../config/Constants';
import TrackerSelect from '../components/TrackerSelect/TrackerSelect';
import { selectAllTrackers } from '../store/trackers/trackers.selectors';
import Tracker from '../models/Tracker';
import WeekPanel from '../components/Statistics/WeekPanel/WeekPanel';
import MonthPanel from '../components/Statistics/MonthPanel/MonthPanel';
import YearPanel from '../components/Statistics/YearPanel/YearPanel';

const defaultBeginDate = startOfDay(addDays(SEVEN_DAYS_AGO_DATE, 1));

function Statistics() {
  const { trackers } = useAppSelector(selectAllTrackers);
  const [beginDate, setBeginDate] = useState<Date>(defaultBeginDate);
  const [selectedTab, setSelectedTab] = useState(0);
  const handleTabChange = (event: React.SyntheticEvent, newTab: number) => {
    setSelectedTab(newTab);
  };
  const [selectedTracker, setSelectedTracker] = useState<null | Tracker>(null);
  const handleTrackerChange = (event: SelectChangeEvent) => {
    const newId = event.target.value;
    if (newId === ALL_TRACKERS_ID) {
      // TODO: find a solution to handle "all trackers"
      setSelectedTracker(null);
    } else {
      const newTracker = trackers.find((t) => t.id === event.target.value);
      if (newTracker) {
        setSelectedTracker(newTracker);
      } else {
        throw Error('The selected tracker was not found.');
      }
    }
  };

  const minTrackerList = [
    { id: ALL_TRACKERS_ID, name: 'Tous les trackers' },
    ...trackers
      .map((t) => ({ id: t.id, name: t.name }))
      .sort((t1, t2) => t1.name.localeCompare(t2.name))
  ];

  return (
    <>
      <Typography gutterBottom variant="h1">
        Statistiques
      </Typography>

      <TrackerSelect
        trackers={minTrackerList}
        selectedTrackerId={selectedTracker ? selectedTracker.id : ''}
        onSelect={handleTrackerChange}
      />

      <Tabs
        aria-label="icon label tabs"
        centered
        onChange={handleTabChange}
        sx={{ mb: 2 }}
        TabIndicatorProps={{ style: { backgroundColor: 'main.accent' } }}
        variant="fullWidth"
        value={selectedTab}>
        <Tab label="SEMAINES" />
        <Tab label="MOIS" />
        <Tab label="ANNÉES" />
      </Tabs>

      <TabPanel value={selectedTab} index={0}>
        {selectedTracker ? (
          <WeekPanel beginDate={beginDate} setBeginDate={setBeginDate} tracker={selectedTracker} />
        ) : (
          <Typography>Veuillez sélectionner un (ou tous les) tracker(s).</Typography>
        )}
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        {selectedTracker ? (
          <MonthPanel beginDate={beginDate} setBeginDate={setBeginDate} tracker={selectedTracker} />
        ) : (
          <Typography>Veuillez sélectionner un (ou tous les) tracker(s).</Typography>
        )}
      </TabPanel>
      <TabPanel value={selectedTab} index={2}>
        {selectedTracker ? (
          <YearPanel beginDate={beginDate} setBeginDate={setBeginDate} tracker={selectedTracker} />
        ) : (
          <Typography>Veuillez sélectionner un (ou tous les) tracker(s).</Typography>
        )}
      </TabPanel>
    </>
  );
}
export default Statistics;

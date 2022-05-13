import BallotIcon from '@mui/icons-material/Ballot';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ViewListIcon from '@mui/icons-material/ViewList';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  Alert,
  Box,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Tab,
  Tabs,
  Typography
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../app/hooks';
import TabPanel from '../components/TabPanel/TabPanel';
import AddTrackerCard from '../components/TrackerCardList/AddTrackerCard';
import DateSelector from '../components/TrackerCardList/DateSelector';
import TrackerCardList from '../components/TrackerCardList/TrackerCardList';
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
  const navigate = useNavigate();

  const actions = [
    {
      icon: <ViewListIcon />,
      name: 'Voir tous mes trackers',
      onClick: () => navigate('/all-trackers')
    }
  ];

  const handleTabChange = (event: React.SyntheticEvent, newTab: number) => {
    setSelectedTab(newTab);
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
        <AddTrackerCard />
        {todoTrackers.length === 0 ? (
          <Alert severity="info">{"Vous n'avez aucun tracker à compléter aujourd'hui."}</Alert>
        ) : (
          <TrackerCardList trackers={todoTrackers} />
        )}
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        {doneTrackers.length === 0 ? (
          <Alert severity="info">{"Vous n'avez complété aucun tracker aujourd'hui."}</Alert>
        ) : (
          <TrackerCardList trackers={doneTrackers} />
        )}
      </TabPanel>
      <TabPanel value={selectedTab} index={2}>
        {hiddenTrackers.length === 0 ? (
          <Alert severity="info">{"Vous n'avez aucun tracker masqué aujourd'hui."}</Alert>
        ) : (
          <TrackerCardList trackers={hiddenTrackers} />
        )}
      </TabPanel>

      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon icon={<MoreVertIcon />} openIcon={<CloseIcon />} />}>
        {actions.map((action) => (
          <SpeedDialAction
            onClick={action.onClick}
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
export default Trackers;

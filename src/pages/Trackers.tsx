import BallotIcon from '@mui/icons-material/Ballot';
import BugReportIcon from '@mui/icons-material/BugReport';
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
import { isToday } from 'date-fns';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TabPanel from '../components/TabPanel/TabPanel';
import AddTrackerCard from '../components/TrackerCardList/AddTrackerCard';
import DateSelector from '../components/TrackerCardList/DaySelector';
import TrackerCardList from '../components/TrackerCardList/TrackerCardList';
import { BUG_REPORT_FORM_URL } from '../config/Constants';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import {
  selectHiddenTrackers,
  selectSelectedDate,
  selectTodoTrackers,
  selectTrackersDone
} from '../store/trackers/trackers.selectors';
import { setSelectedDate } from '../store/trackers/trackersSlice';

function Trackers() {
  const selectedDate = new Date(useAppSelector(selectSelectedDate));
  const isTodaySelected = isToday(new Date(selectedDate));
  const { trackers: doneTrackers } = useAppSelector((state) =>
    selectTrackersDone(state, selectedDate)
  );
  const { trackers: todoTrackers } = useAppSelector((state) =>
    selectTodoTrackers(state, selectedDate)
  );

  const { trackers: hiddenTrackers } = useAppSelector(selectHiddenTrackers);

  const dispatch = useAppDispatch();
  const [selectedTab, setSelectedTab] = useState(0);
  const navigate = useNavigate();

  const actions = [
    {
      icon: <ViewListIcon />,
      name: 'Voir tous mes trackers',
      onClick: () => navigate('/trackers/manage')
    },
    {
      icon: <BugReportIcon />,
      name: 'Signaler un bug',
      onClick: () => window.open(BUG_REPORT_FORM_URL, '_blank')
    }
  ];

  const handleSetDate = (date: Date) => {
    dispatch(setSelectedDate(date.toString()));
  };

  const handleTabChange = (event: React.SyntheticEvent, newTab: number) => {
    setSelectedTab(newTab);
  };

  return (
    <Box>
      <DateSelector date={selectedDate} setDate={handleSetDate} />

      {doneTrackers.length + hiddenTrackers.length + todoTrackers.length === 0 && (
        <Typography align="center">{'Aucun tracker pour ce jour-ci.'}</Typography>
      )}

      <Tabs
        aria-label="icon label tabs"
        centered
        onChange={handleTabChange}
        sx={{ mb: 2 }}
        TabIndicatorProps={{ style: { backgroundColor: 'main.accent' } }}
        variant="fullWidth"
        value={selectedTab}>
        <Tab icon={<BallotIcon />} label="?? FAIRE" />
        <Tab icon={<CheckIcon />} label="FAIT(S)" />
        {isTodaySelected && <Tab icon={<VisibilityOffIcon />} label="MASQU??(S)" />}
      </Tabs>

      <TabPanel value={selectedTab} index={0}>
        <AddTrackerCard />
        {todoTrackers.length === 0 ? (
          <Alert severity="info">{"Vous n'avez aucun tracker ?? compl??ter pour ce jour-ci."}</Alert>
        ) : (
          <TrackerCardList trackers={todoTrackers} />
        )}
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        {doneTrackers.length === 0 ? (
          <Alert severity="info">{"Vous n'avez compl??t?? aucun tracker pour ce jour-ci."}</Alert>
        ) : (
          <TrackerCardList trackers={doneTrackers} />
        )}
      </TabPanel>
      {isTodaySelected && (
        <TabPanel value={selectedTab} index={2}>
          {hiddenTrackers.length === 0 ? (
            <Alert severity="info">{"Vous n'avez aucun tracker masqu?? pour ce jour-ci."}</Alert>
          ) : (
            <TrackerCardList trackers={hiddenTrackers} />
          )}
        </TabPanel>
      )}

      <SpeedDial
        ariaLabel="SuiVie SpeedDial menu"
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

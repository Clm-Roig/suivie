import BallotIcon from '@mui/icons-material/Ballot';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TimelineIcon from '@mui/icons-material/Timeline';
import ViewListIcon from '@mui/icons-material/ViewList';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  Alert,
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

import DefaultPageLayout from '../../components/DefaultPageLayout/DefaultPageLayout';
import TabPanel from '../../components/TabPanel/TabPanel';
import AddTrackerCard from '../../components/TrackerCardList/AddTrackerCard';
import DateSelector from '../../components/TrackerCardList/DaySelector';
import TrackerCardList from '../../components/TrackerCardList/TrackerCardList';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  selectHiddenTrackers,
  selectSelectedDate,
  selectTodoTrackers,
  selectTrackersDone
} from '../../store/trackers/trackers.selectors';
import { setSelectedDate } from '../../store/trackers/trackersSlice';

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
      icon: <TimelineIcon />,
      name: 'Statistiques',
      onClick: () => navigate('/stats')
    }
  ];

  const handleSetDate = (date: Date) => {
    dispatch(setSelectedDate(date.toString()));
  };

  const handleTabChange = (event: React.SyntheticEvent, newTab: number) => {
    setSelectedTab(newTab);
  };

  return (
    <>
      {/* Add a little margin to avoid the speed dial button to overlap the last tracker card */}
      <DefaultPageLayout sx={{ mb: 10 }}>
        <DateSelector date={selectedDate} setDate={handleSetDate} />

        {doneTrackers.length + hiddenTrackers.length + todoTrackers.length === 0 && (
          <Typography align="center">Aucun tracker pour ce jour-ci.</Typography>
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
          {isTodaySelected && <Tab icon={<VisibilityOffIcon />} label="MASQUÉ(S)" />}
        </Tabs>

        <TabPanel value={selectedTab} index={0}>
          <AddTrackerCard sx={{ mb: 2 }} />
          {todoTrackers.length === 0 ? (
            <Alert severity="info">
              {"Vous n'avez aucun tracker à compléter pour ce jour-ci."}
            </Alert>
          ) : (
            <TrackerCardList trackers={todoTrackers} />
          )}
        </TabPanel>
        <TabPanel value={selectedTab} index={1}>
          {doneTrackers.length === 0 ? (
            <Alert severity="info">{"Vous n'avez complété aucun tracker pour ce jour-ci."}</Alert>
          ) : (
            <TrackerCardList trackers={doneTrackers} />
          )}
        </TabPanel>
        {isTodaySelected && (
          <TabPanel value={selectedTab} index={2}>
            {hiddenTrackers.length === 0 ? (
              <Alert severity="info">{"Vous n'avez aucun tracker masqué pour ce jour-ci."}</Alert>
            ) : (
              <TrackerCardList trackers={hiddenTrackers} />
            )}
          </TabPanel>
        )}
      </DefaultPageLayout>
      <SpeedDial
        direction="up"
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
    </>
  );
}
export default Trackers;

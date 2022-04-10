import { Box } from '@mui/material';
import { startOfDay } from 'date-fns';
import { FC, useState } from 'react';

import { useAppSelector } from '../../../app/hooks';
import Tracker from '../../../models/Tracker';
import { selectMonthEntries, selectWeekEntries } from '../../../store/trackers/trackers.selectors';
import { getAggregatedCompletions } from '../../../store/trackers/utils';
import WeekPicker from '../../WeekPicker/WeekPicker';
import WeekChart from '../../charts/WeekChart/WeekChart';
import TotalText from './TotalText';

interface Props {
  beginDate: Date;
  setBeginDate: (date: Date) => void;
  tracker: Tracker;
}

const WeekPanel: FC<Props> = ({ beginDate, setBeginDate, tracker }) => {
  const [selectedMonth, setSelectedMonth] = useState<Date>(beginDate);
  const monthEntries = useAppSelector((state) =>
    selectMonthEntries(state, selectedMonth, tracker.id)
  );
  const weekEntries = useAppSelector((state) => selectWeekEntries(state, beginDate, tracker.id));

  const handleOnMonthChange = (date: Date) => {
    setSelectedMonth(date);
  };

  const handleBeginDateChange = (newBeginDate: Date | null) => {
    if (newBeginDate) setBeginDate(startOfDay(newBeginDate));
  };

  return (
    <>
      <Box sx={{ mb: 1 }}>
        <WeekPicker
          highlightedDates={monthEntries.map((e) => new Date(e.date))}
          onChange={handleBeginDateChange}
          onMonthChange={handleOnMonthChange}
          value={beginDate}
        />
      </Box>
      <Box sx={{ mb: 1 }}>
        <TotalText completions={getAggregatedCompletions(weekEntries)} />
      </Box>
      {weekEntries.length > 0 && <WeekChart beginDate={beginDate} entries={weekEntries} />}
    </>
  );
};

export default WeekPanel;

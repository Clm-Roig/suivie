import { startOfDay } from 'date-fns';
import { FC, useState } from 'react';
import { Box } from '@mui/material';
import { addDays } from 'date-fns/esm';
import { SEVEN_DAYS_AGO_DATE } from '../../../config/Constants';
import Tracker from '../../../models/Tracker';
import { getAggregatedCompletions } from '../../../store/trackers/utils';
import TotalText from './TotalText';
import WeekChart from '../WeekChart/WeekChart';
import WeekPicker from '../../WeekPicker/WeekPicker';
import { useAppSelector } from '../../../app/hooks';
import { selectMonthEntries, selectWeekEntries } from '../../../store/trackers/trackers.selectors';

interface Props {
  tracker: Tracker;
}

const defaultBeginDate = startOfDay(addDays(SEVEN_DAYS_AGO_DATE, 1));

const WeekPanel: FC<Props> = ({ tracker }) => {
  const [beginDate, setBeginDate] = useState<Date>(defaultBeginDate);
  const [selectedMonth, setSelectedMonth] = useState<Date>(defaultBeginDate);
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
      <WeekPicker
        highlightedDates={monthEntries.map((e) => new Date(e.date))}
        onChange={handleBeginDateChange}
        onMonthChange={handleOnMonthChange}
        value={beginDate}
      />
      <Box sx={{ mb: 1 }}>
        <TotalText completions={getAggregatedCompletions(weekEntries)} />
      </Box>
      {weekEntries.length > 0 && <WeekChart beginDate={beginDate} entries={weekEntries} />}
    </>
  );
};

export default WeekPanel;

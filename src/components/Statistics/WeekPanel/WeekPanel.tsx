import { startOfDay } from 'date-fns';
import { FC, useEffect, useState } from 'react';
import { SEVEN_DAYS_AGO_DATE } from '../../../config/Constants';
import Tracker from '../../../models/Tracker';
import TrackerEntry from '../../../models/TrackerEntry';
import {
  getAggregatedCompletions,
  getMonthEntries,
  getWeekEntries
} from '../../../store/trackers/utils';
import TotalText from './TotalText';
import WeekPicker from '../../WeekPicker/WeekPicker';
import { addDays } from 'date-fns/esm';

interface Props {
  tracker: Tracker;
}

const defaultBeginDate = startOfDay(addDays(SEVEN_DAYS_AGO_DATE, 1));

const WeekPanel: FC<Props> = ({ tracker }) => {
  const [beginDate, setBeginDate] = useState<Date>(defaultBeginDate);
  const [weekEntries, setWeekEntries] = useState<TrackerEntry[]>([]);
  const [monthEntries, setMonthEntries] = useState<TrackerEntry[]>(
    getMonthEntries(defaultBeginDate, tracker.entries)
  );

  useEffect(() => {
    setWeekEntries(getWeekEntries(startOfDay(beginDate), tracker.entries));
  }, [beginDate, tracker]);

  const handleOnMonthChange = (date: Date) => {
    setMonthEntries(getMonthEntries(date, tracker.entries));
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
      <TotalText completions={getAggregatedCompletions(weekEntries)} />
    </>
  );
};

export default WeekPanel;

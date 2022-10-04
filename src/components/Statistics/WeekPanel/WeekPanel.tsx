import { startOfDay } from 'date-fns';
import { FC, useState } from 'react';

import { useAppSelector } from '../../../hooks/redux';
import Tracker from '../../../models/Tracker';
import { selectMonthEntries, selectWeekEntries } from '../../../store/trackers/trackers.selectors';
import WeekPicker from '../../WeekPicker/WeekPicker';
import WeekChart from '../../charts/WeekChart/WeekChart';
import SpacedBox from '../SpacedBox';
import TotalText from '../TotalText/TotalText';

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
      <SpacedBox>
        <WeekPicker
          highlightedDates={monthEntries.map((e) => new Date(e.date))}
          onChange={handleBeginDateChange}
          onMonthChange={handleOnMonthChange}
          value={beginDate}
        />
      </SpacedBox>
      <SpacedBox>
        <TotalText
          entries={weekEntries}
          noCompletionsText="Il n'y a pas eu d'activité durant la semaine pour le tracker sélectionné."
        />
      </SpacedBox>
      <WeekChart beginDate={beginDate} entries={weekEntries} />
    </>
  );
};

export default WeekPanel;

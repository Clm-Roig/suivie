import { FC, useState } from 'react';
import { Box, TextField } from '@mui/material';
import { DatePicker } from '@mui/lab';
import Tracker from '../../../models/Tracker';
import { getAggregatedCompletions } from '../../../store/trackers/utils';
import TotalText from './TotalText';
import MonthChart from '../../charts/MonthChart/MonthChart';
import { useAppSelector } from '../../../app/hooks';
import { selectMonthEntries } from '../../../store/trackers/trackers.selectors';
import { endOfMonth } from 'date-fns';
import { TRACKERS_BEGIN_IN } from '../../../config/Constants';

interface Props {
  tracker: Tracker;
}

const MonthPanel: FC<Props> = ({ tracker }) => {
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const monthEntries = useAppSelector((state) =>
    selectMonthEntries(state, selectedMonth, tracker.id)
  );

  const handleOnMonthChange = (date: unknown) => {
    if (date) setSelectedMonth(date as Date);
  };

  return (
    <>
      <Box sx={{ mb: 1 }}>
        <DatePicker
          views={['year', 'month']}
          disableFuture
          maxDate={endOfMonth(new Date())}
          minDate={TRACKERS_BEGIN_IN}
          onChange={handleOnMonthChange}
          value={selectedMonth}
          renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} />}
        />
      </Box>
      <Box sx={{ mb: 1 }}>
        <TotalText completions={getAggregatedCompletions(monthEntries)} />
      </Box>
      {monthEntries.length > 0 && <MonthChart beginDate={selectedMonth} entries={monthEntries} />}
    </>
  );
};

export default MonthPanel;

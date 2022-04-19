import { Box, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { endOfMonth, startOfMonth } from 'date-fns';
import { FC } from 'react';

import { useAppSelector } from '../../../app/hooks';
import { TRACKERS_BEGIN_IN } from '../../../config/Constants';
import Tracker from '../../../models/Tracker';
import { selectMonthEntries } from '../../../store/trackers/trackers.selectors';
import { getAggregatedCompletions } from '../../../store/trackers/utils';
import MonthChart from '../../charts/MonthChart/MonthChart';
import TotalText from './TotalText';

interface Props {
  beginDate: Date;
  setBeginDate: (date: Date) => void;
  tracker: Tracker;
}

const MonthPanel: FC<Props> = ({ beginDate, setBeginDate, tracker }) => {
  const monthEntries = useAppSelector((state) => selectMonthEntries(state, beginDate, tracker.id));

  const handleOnMonthChange = (date: unknown) => {
    if (date) setBeginDate(startOfMonth(date as Date));
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
          value={beginDate}
          renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} />}
        />
      </Box>
      <Box sx={{ mb: 1 }}>
        <TotalText completions={getAggregatedCompletions(monthEntries)} />
      </Box>
      {monthEntries.length > 0 && <MonthChart beginDate={beginDate} entries={monthEntries} />}
    </>
  );
};

export default MonthPanel;

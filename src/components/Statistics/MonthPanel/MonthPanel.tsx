import { TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { endOfMonth, startOfMonth } from 'date-fns';
import { FC } from 'react';

import { TRACKERS_BEGIN_IN } from '../../../config/Constants';
import { useAppSelector } from '../../../hooks/redux';
import Tracker from '../../../models/Tracker';
import { selectMonthEntries } from '../../../store/trackers/trackers.selectors';
import MonthChart from '../../charts/MonthChart/MonthChart';
import SpacedBox from '../SpacedBox';
import { getFavoriteDays } from '../Stats';
import TotalText from '../TotalText/TotalText';

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

  const favoriteDaysStats = getFavoriteDays(monthEntries);
  const plural = favoriteDaysStats.days.length > 1 ? 's' : '';

  return (
    <>
      <SpacedBox>
        <DatePicker
          views={['year', 'month']}
          disableFuture
          maxDate={endOfMonth(new Date())}
          minDate={TRACKERS_BEGIN_IN}
          onChange={handleOnMonthChange}
          value={beginDate}
          renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} />}
        />
      </SpacedBox>
      <SpacedBox>
        <TotalText
          entries={monthEntries}
          noCompletionsText="Il n'y a pas eu d'activité durant le mois pour le tracker sélectionné."
        />
      </SpacedBox>
      <MonthChart beginDate={beginDate} entries={monthEntries} />
      {favoriteDaysStats.days.length > 0 && (
        <Typography>
          <b>
            Jour{plural} favori{plural} :
          </b>{' '}
          {favoriteDaysStats.days.join(' - ')}
        </Typography>
      )}
    </>
  );
};

export default MonthPanel;

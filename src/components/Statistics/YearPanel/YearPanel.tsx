import { TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { endOfYear, startOfYear } from 'date-fns';
import { FC } from 'react';

import { TRACKERS_BEGIN_IN } from '../../../config/Constants';
import { useAppSelector } from '../../../hooks/redux';
import Tracker from '../../../models/Tracker';
import { selectYearEntries } from '../../../store/trackers/trackers.selectors';
import YearChart from '../../charts/YearChart/YearChart';
import SpacedBox from '../SpacedBox';
import { getFavoriteDays } from '../Stats';
import TotalText from '../TotalText/TotalText';

interface Props {
  beginDate: Date;
  setBeginDate: (date: Date) => void;
  tracker: Tracker;
}

const YearPanel: FC<Props> = ({ beginDate, setBeginDate, tracker }) => {
  const yearEntries = useAppSelector((state) => selectYearEntries(state, beginDate, tracker.id));

  const handleOnYearChange = (date: unknown) => {
    if (date) setBeginDate(startOfYear(date as Date));
  };

  const favoriteDaysStats = getFavoriteDays(yearEntries);
  const plural = favoriteDaysStats.days.length > 1 ? 's' : '';

  return (
    <>
      <SpacedBox>
        <DatePicker
          views={['year']}
          disableFuture
          maxDate={endOfYear(new Date())}
          minDate={TRACKERS_BEGIN_IN}
          onChange={handleOnYearChange}
          value={beginDate}
          renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} />}
        />
      </SpacedBox>
      <SpacedBox>
        <TotalText
          entries={yearEntries}
          noCompletionsText="Il n'y a pas eu d'activité durant le mois pour le tracker sélectionné."
        />
      </SpacedBox>
      <YearChart beginDate={beginDate} entries={yearEntries} />
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

export default YearPanel;

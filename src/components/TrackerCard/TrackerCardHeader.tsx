import { FC } from 'react';
import { CardHeader, CardHeaderProps, Typography } from '@mui/material';
import { isAfter } from 'date-fns';
import formatDate from '../../utils/formatDate';
import TrackerStatus from '../../models/TrackerStatus';
import Tracker from '../../models/Tracker';
import Emoji from '../Emoji/Emoji';

interface Props {
  cardHeaderProps?: CardHeaderProps;
  tracker: Tracker;
}

const TrackerCardHeader: FC<Props> = ({ cardHeaderProps, tracker }) => {
  const { beginDate, name, remainingDays, status } = tracker;
  const beginVerb = isAfter(new Date(beginDate), new Date()) ? 'Commencera le' : 'Commencé le';
  const trackerIsOver = status === TrackerStatus.over;

  return (
    <CardHeader
      {...cardHeaderProps}
      title={name}
      subheader={
        <>
          <Typography display="block" variant="subtitle2">
            {`${beginVerb} ${formatDate(new Date(beginDate))}`}
          </Typography>
          {trackerIsOver && (
            <>
              <Typography component="span">Terminé</Typography>{' '}
              <Emoji label="green check" symbol="✔️" />
            </>
          )}
          {remainingDays && !trackerIsOver && (
            <Typography display="block" variant="subtitle2">
              Reste {remainingDays} jours
            </Typography>
          )}
        </>
      }
    />
  );
};

export default TrackerCardHeader;

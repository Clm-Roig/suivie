import { FC } from 'react';
import { CardHeader, CardHeaderProps, Typography } from '@mui/material';
import formatDate from '../../utils/formatDate';

interface Props {
  beginDate: string;
  cardHeaderProps?: CardHeaderProps;
  name: string;
  remainingDays?: number;
}

const TrackerCardHeader: FC<Props> = ({ beginDate, cardHeaderProps, name, remainingDays }) => {
  return (
    <CardHeader
      {...cardHeaderProps}
      title={name}
      subheader={
        <>
          <Typography display="block" variant="subtitle2">
            Commencé le {formatDate(new Date(beginDate))}
          </Typography>
          {remainingDays && (
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

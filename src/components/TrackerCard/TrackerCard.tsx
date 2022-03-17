import { FC } from 'react';
import { Card, CardProps } from '@mui/material';

import Tracker from '../../models/Tracker';
import TrackerCardActions from './TrackerCardActions';
import TrackerCardContent from './TrackerCardContent';
import TrackerCardHeader from './TrackerCardHeader';

interface Props {
  tracker: Tracker;
  cardProps?: CardProps;
}
const TrackerCard: FC<Props> = ({ tracker, cardProps }) => {
  const { beginDate, defaultQuantity, name, remainingDays, unit } = tracker;
  return (
    <Card {...cardProps}>
      <TrackerCardHeader beginDate={beginDate} name={name} remainingDays={remainingDays} />
      {defaultQuantity && <TrackerCardContent defaultQuantity={defaultQuantity} unit={unit} />}
      <TrackerCardActions />
    </Card>
  );
};

export default TrackerCard;

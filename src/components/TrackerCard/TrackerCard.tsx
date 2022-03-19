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
  const { requiredCompletions } = tracker;
  return (
    <Card {...cardProps}>
      <TrackerCardHeader tracker={tracker} />
      {requiredCompletions.length > 0 && (
        <TrackerCardContent requiredCompletions={requiredCompletions} />
      )}
      <TrackerCardActions tracker={tracker} />
    </Card>
  );
};

export default TrackerCard;

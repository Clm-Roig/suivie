import { Card, Typography } from '@mui/material';
import { FC } from 'react';

import SliceStatus from '../../models/SliceStatus';
import Tracker from '../../models/Tracker';

interface Props {
  tracker: Tracker;
}
const TrackerCard: FC<Props> = ({ tracker }) => {
  return <Card></Card>;
};

export default TrackerCard;

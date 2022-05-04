import { CardProps } from '@mui/material';
import { FC } from 'react';

import Tracker from '../../models/Tracker';
import TrackerCard from '../TrackerCard/TrackerCard';

interface Props {
  cardProps?: CardProps;
  trackers: Tracker[];
}

const TrackerList: FC<Props> = ({ trackers, cardProps }) => (
  <>
    {trackers.map((t) => (
      <TrackerCard tracker={t} key={t.id} cardProps={cardProps} />
    ))}
  </>
);

export default TrackerList;

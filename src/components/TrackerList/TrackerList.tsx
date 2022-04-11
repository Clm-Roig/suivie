import { CardProps } from '@mui/material';
import { FC } from 'react';

import Tracker from '../../models/Tracker';
import TrackerCard from '../TrackerCard/TrackerCard';

interface Props {
  trackers: Tracker[];
  cardProps?: CardProps;
}

const TrackerList: FC<Props> = ({ trackers, cardProps }) => {
  return (
    <>
      {trackers.map((t) => (
        <TrackerCard tracker={t} key={t.id} cardProps={cardProps} />
      ))}
    </>
  );
};

export default TrackerList;

import { FC } from 'react';
import TrackerCard from '../TrackerCard/TrackerCard';
import Tracker from '../../models/Tracker';
import { CardProps } from '@mui/material';

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

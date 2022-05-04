import { CardProps, useTheme } from '@mui/material';
import { FC } from 'react';

import { useAppSelector } from '../../app/hooks';
import Tracker from '../../models/Tracker';
import { selectThemeMode } from '../../store/theme/theme.selectors';
import TrackerCard from '../TrackerCard/TrackerCard';
import defaultCardProps from '../TrackerCard/defaultCardProps';

interface Props {
  cardProps?: CardProps;
  trackers: Tracker[];
}

const TrackerList: FC<Props> = ({ trackers, cardProps }) => {
  const themeMode = useAppSelector(selectThemeMode);
  const theme = useTheme();
  const allCardProps = {
    ...defaultCardProps(themeMode, theme),
    ...cardProps
  };
  return (
    <>
      {trackers.map((t) => (
        <TrackerCard tracker={t} key={t.id} cardProps={allCardProps} />
      ))}
    </>
  );
};

export default TrackerList;

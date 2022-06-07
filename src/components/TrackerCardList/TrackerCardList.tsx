import { useAutoAnimate } from '@formkit/auto-animate/react';
import { CardProps, useTheme } from '@mui/material';
import { FC } from 'react';

import { useAppSelector } from '../../hooks/redux';
import Tracker from '../../models/Tracker';
import { selectThemeMode } from '../../store/theme/theme.selectors';
import TrackerCard from '../TrackerCard/TrackerCard';
import defaultCardProps from '../TrackerCard/defaultCardProps';

interface Props {
  cardProps?: CardProps;
  trackers: Tracker[];
}

const TrackerCardList: FC<Props> = ({ trackers, cardProps }) => {
  const themeMode = useAppSelector(selectThemeMode);
  const theme = useTheme();
  const [animateRef] = useAutoAnimate<HTMLDivElement>();
  const allCardProps = {
    ...defaultCardProps(themeMode, theme),
    ...cardProps
  };
  return (
    <div ref={animateRef}>
      {trackers.map((t) => (
        <TrackerCard tracker={t} key={t.id} cardProps={allCardProps} />
      ))}
    </div>
  );
};

export default TrackerCardList;

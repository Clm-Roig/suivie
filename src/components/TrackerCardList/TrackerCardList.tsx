import { useAutoAnimate } from '@formkit/auto-animate/react';
import { styled } from '@mui/material/styles';
import { AnimatePresence, Reorder } from 'framer-motion';
import { FC } from 'react';

import { useAppDispatch } from '../../hooks/redux';
import Tracker from '../../models/Tracker';
import { orderTracker } from '../../store/trackers/trackersSlice';
import TrackerCard from '../TrackerCard/TrackerCard';

const StyledReorderGroup = styled(Reorder.Group)(() => ({
  listStyleType: 'none',
  paddingLeft: 0
}));

interface Props {
  trackers: Tracker[];
}

const TrackerCardList: FC<Props> = ({ trackers }) => {
  const dispatch = useAppDispatch();
  const [animateRef] = useAutoAnimate<HTMLDivElement>();
  const allCardProps = { sx: { mb: 2 } };

  const handleDragReorder = (trackers: Tracker[]) => {
    dispatch(orderTracker(trackers));
  };

  return (
    <>
      <div ref={animateRef}>
        <AnimatePresence initial={false}>
          <StyledReorderGroup axis="y" values={trackers} onReorder={handleDragReorder}>
            {trackers.map((t) => (
              <TrackerCard tracker={t} key={t.id} {...allCardProps} />
            ))}
          </StyledReorderGroup>
        </AnimatePresence>
      </div>
    </>
  );
};

export default TrackerCardList;

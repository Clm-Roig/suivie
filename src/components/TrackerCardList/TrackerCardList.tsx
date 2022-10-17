import { useAutoAnimate } from '@formkit/auto-animate/react';
import { AnimatePresence, motion } from 'framer-motion';
import { FC } from 'react';

import Tracker from '../../models/Tracker';
import TrackerCard from '../TrackerCard/TrackerCard';

const cardAnimations = {
  initial: {
    opacity: 0,
    scale: 0
  },
  animate: {
    opacity: 1,
    scale: 1
  },
  exit: {
    height: 0,
    opacity: 0,
    scale: 0
  }
};

interface Props {
  trackers: Tracker[];
}

const TrackerCardList: FC<Props> = ({ trackers }) => {
  const [animateRef] = useAutoAnimate<HTMLDivElement>();
  const allCardProps = { sx: { mb: 2 } };

  return (
    <>
      <div ref={animateRef}>
        <AnimatePresence initial={false}>
          {trackers.map((t) => (
            <motion.div
              key={t.id}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={cardAnimations}
              transition={{ duration: 0.6 }}>
              <TrackerCard tracker={t} key={t.id} {...allCardProps} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};

export default TrackerCardList;

import { Card, CardProps } from '@mui/material';
import { Reorder, useDragControls, useMotionValue } from 'framer-motion';
import { FC, useState } from 'react';

import { useRaisedShadow } from '../../hooks/useRaisedShadow';
import Completion from '../../models/Completion';
import Tracker from '../../models/Tracker';
import TrackerCardActions from './TrackerCardActions';
import TrackerCardContent from './TrackerCardContent';
import TrackerCardHeader from './TrackerCardHeader';

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
const sxProps = { px: 1, py: 1 };

interface Props extends CardProps {
  tracker: Tracker;
}
const TrackerCard: FC<Props> = ({ tracker, ...cardProps }) => {
  const { requiredCompletions } = tracker;
  const dragControls = useDragControls();
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);
  const [selectedCompletions, setSelectedCompletions] = useState<Completion[]>([]);

  const addToSelectedCompletions = (completion: Completion) => {
    setSelectedCompletions([...selectedCompletions, completion]);
  };

  const removeFromSelectedCompletions = (completion: Completion) => {
    setSelectedCompletions(selectedCompletions.filter((c) => c !== completion));
  };

  const onChipClick = (completion: Completion) => {
    if (selectedCompletions.includes(completion)) {
      removeFromSelectedCompletions(completion);
    } else {
      addToSelectedCompletions(completion);
    }
  };

  return (
    <Reorder.Item
      key={tracker.id}
      value={tracker}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ boxShadow, y }}
      variants={cardAnimations}
      dragListener={false}
      dragControls={dragControls}
      transition={{ duration: 0.4 }}>
      <Card
        style={{ background: tracker.color }}
        {...cardProps}
        className="tracker-card"
        id={'tracker-card-' + tracker.id}>
        <TrackerCardHeader dragControls={dragControls} tracker={tracker} sx={sxProps} />
        {requiredCompletions.length > 0 && (
          <TrackerCardContent
            sx={{ sxProps }}
            onChipClick={onChipClick}
            tracker={tracker}
            selectedCompletions={selectedCompletions}
          />
        )}
        <TrackerCardActions
          sx={sxProps}
          onChipClick={onChipClick}
          selectedCompletions={selectedCompletions}
          setSelectedCompletions={setSelectedCompletions}
          tracker={tracker}
        />
      </Card>
    </Reorder.Item>
  );
};

export default TrackerCard;

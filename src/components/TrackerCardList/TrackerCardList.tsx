import { useAutoAnimate } from '@formkit/auto-animate/react';
import { AnimatePresence, motion } from 'framer-motion';
import { FC } from 'react';
import { DragDropContext, DragUpdate, Draggable, Droppable } from 'react-beautiful-dnd';

import { useAppDispatch } from '../../hooks/redux';
import Tracker from '../../models/Tracker';
import { orderTracker } from '../../store/trackers/trackersSlice';
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
  const dispatch = useAppDispatch();
  const [animateRef] = useAutoAnimate<HTMLDivElement>();
  const allCardProps = { sx: { mb: 2 } };

  const handleOnDragUpdate = (updateResult: DragUpdate) => {
    const { draggableId: draggedTrackerId, destination } = updateResult;
    if (destination) {
      const { index: destinationIndex } = destination;
      const destinationTrackerId = trackers[destinationIndex].id;
      dispatch(orderTracker({ sourceTrackerId: draggedTrackerId, destinationTrackerId }));
    }
  };

  return (
    <DragDropContext
      onDragUpdate={handleOnDragUpdate}
      onDragEnd={() => {
        // onDragUpdate already updated the state
        return;
      }}>
      <Droppable droppableId="trackerCardList">
        {(provided) => (
          <div ref={animateRef}>
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <AnimatePresence initial={false}>
                {trackers.map((t, idx) => (
                  <Draggable key={t.id} draggableId={t.id} index={idx}>
                    {(provided) => (
                      <motion.div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={cardAnimations}
                        transition={{ duration: 0.6 }}>
                        <TrackerCard
                          dragHandleProps={provided.dragHandleProps}
                          tracker={t}
                          key={t.id}
                          {...allCardProps}
                        />
                      </motion.div>
                    )}
                  </Draggable>
                ))}
              </AnimatePresence>
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TrackerCardList;

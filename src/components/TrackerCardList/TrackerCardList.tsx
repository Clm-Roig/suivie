import { useAutoAnimate } from '@formkit/auto-animate/react';
import { FC } from 'react';
import { DragDropContext, DragUpdate, Draggable, Droppable } from 'react-beautiful-dnd';

import { useAppDispatch } from '../../hooks/redux';
import Tracker from '../../models/Tracker';
import { orderTracker } from '../../store/trackers/trackersSlice';
import TrackerCard from '../TrackerCard/TrackerCard';

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
              {trackers.map((t, idx) => (
                <Draggable key={t.id} draggableId={t.id} index={idx}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps}>
                      <TrackerCard
                        dragHandleProps={provided.dragHandleProps}
                        tracker={t}
                        key={t.id}
                        {...allCardProps}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TrackerCardList;

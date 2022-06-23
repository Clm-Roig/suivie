import { useAutoAnimate } from '@formkit/auto-animate/react';
import { CardProps, useTheme } from '@mui/material';
import { FC } from 'react';
import { DragDropContext, DragUpdate, Draggable, Droppable } from 'react-beautiful-dnd';

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
  const dispatch = useAppDispatch();
  const [animateRef] = useAutoAnimate<HTMLDivElement>();
  const allCardProps = {
    ...defaultCardProps(themeMode, theme),
    ...cardProps
  };

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

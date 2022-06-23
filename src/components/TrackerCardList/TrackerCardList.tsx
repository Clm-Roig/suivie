import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { CardProps, useTheme } from '@mui/material';
import { FC } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Tracker from '../../models/Tracker';
import { selectThemeMode } from '../../store/theme/theme.selectors';
import { orderTracker } from '../../store/trackers/trackersSlice';
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

  const handleDragEnd = (event: DragEndEvent) => {
    const {
      active: { id: draggedTrackerId },
      over: hoveredTracker
    } = event;
    if (hoveredTracker) {
      const { id: droppedOverTrackerId } = hoveredTracker;
      dispatch(
        orderTracker({
          trackerIdSource: draggedTrackerId as string,
          trackerIdDestination: droppedOverTrackerId as string
        })
      );
    }
  };

  return (
    <div ref={animateRef}>
      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext items={trackers.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          {trackers.map((t) => (
            <TrackerCard key={t.id} tracker={t} {...allCardProps} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default TrackerCardList;

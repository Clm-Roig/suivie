import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardProps } from '@mui/material';
import { FC, useState } from 'react';

import Completion from '../../models/Completion';
import Tracker from '../../models/Tracker';
import TrackerCardActions from './TrackerCardActions';
import TrackerCardContent from './TrackerCardContent';
import TrackerCardHeader from './TrackerCardHeader';

interface Props extends CardProps {
  tracker: Tracker;
}
const TrackerCard: FC<Props> = ({ tracker, ...cardProps }) => {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
    isOver,
    setActivatorNodeRef
  } = useSortable({
    id: tracker.id,
    transition: null
  });
  const { requiredCompletions } = tracker;
  const [selectedCompletions, setSelectedCompletions] = useState<Completion[]>([]);
  const sxProps = { px: 1, py: 1 };

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
    <Card
      ref={setNodeRef}
      elevation={isDragging ? 8 : undefined}
      style={{
        ...cardProps.style,
        // Don't animate when dragging is over because auto-animate will
        transform: isOver
          ? undefined
          : CSS.Translate.toString(transform ? { ...transform, x: 0 } : transform), // disable translation on x axis (vertical DnD only)
        transition: isOver ? undefined : transition,
        // Fix a bug where if the dragged card is from the top of the list and is being dragged down,
        // it's displayed behind the other cards.
        position: isDragging ? 'relative' : undefined,
        zIndex: isDragging ? 2 : 1,
        opacity: isDragging ? 0.7 : 1
      }}
      {...attributes}
      {...cardProps}>
      <TrackerCardHeader
        dragHandleRef={setActivatorNodeRef}
        dragListeners={listeners}
        tracker={tracker}
        sx={sxProps}
      />

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
  );
};

export default TrackerCard;

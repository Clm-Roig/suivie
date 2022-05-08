import { Card, CardProps } from '@mui/material';
import { FC, useState } from 'react';

import Completion from '../../models/Completion';
import Tracker from '../../models/Tracker';
import TrackerCardActions from './TrackerCardActions';
import TrackerCardContent from './TrackerCardContent';
import TrackerCardHeader from './TrackerCardHeader';

interface Props {
  tracker: Tracker;
  cardProps?: CardProps;
}
const TrackerCard: FC<Props> = ({ tracker, cardProps }) => {
  const { requiredCompletions } = tracker;
  const [selectedCompletions, setSelectedCompletions] = useState<Completion[]>([]);
  const sectionProps = { sx: { py: 1 } };

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
    <Card {...cardProps}>
      <TrackerCardHeader tracker={tracker} cardHeaderProps={sectionProps} />
      {requiredCompletions.length > 0 && (
        <TrackerCardContent
          cardContentProps={sectionProps}
          onChipClick={onChipClick}
          tracker={tracker}
          selectedCompletions={selectedCompletions}
        />
      )}
      <TrackerCardActions
        cardActionsProps={sectionProps}
        onChipClick={onChipClick}
        selectedCompletions={selectedCompletions}
        setSelectedCompletions={setSelectedCompletions}
        tracker={tracker}
      />
    </Card>
  );
};

export default TrackerCard;

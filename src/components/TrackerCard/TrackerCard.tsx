import { FC, useState } from 'react';
import { Card, CardProps } from '@mui/material';

import Tracker from '../../models/Tracker';
import TrackerCardActions from './TrackerCardActions';
import TrackerCardContent from './TrackerCardContent';
import TrackerCardHeader from './TrackerCardHeader';
import Completion from '../../models/Completion';

interface Props {
  tracker: Tracker;
  cardProps?: CardProps;
}
const TrackerCard: FC<Props> = ({ tracker, cardProps }) => {
  const { requiredCompletions } = tracker;
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
    <Card {...cardProps}>
      <TrackerCardHeader tracker={tracker} />
      {requiredCompletions.length > 0 && (
        <TrackerCardContent
          onChipClick={onChipClick}
          requiredCompletions={requiredCompletions}
          selectedCompletions={selectedCompletions}
        />
      )}
      <TrackerCardActions
        onChipClick={onChipClick}
        selectedCompletions={selectedCompletions}
        tracker={tracker}
      />
    </Card>
  );
};

export default TrackerCard;

import { Card, CardProps } from '@mui/material';
import { FC, useState } from 'react';

import Completion from '../../models/Completion';
import Tracker from '../../models/Tracker';
import TrackerCardActions from './TrackerCardActions';
import TrackerCardContent from './TrackerCardContent';
import TrackerCardHeader from './TrackerCardHeader';

const sxProps = { px: 1, py: 1 };

interface Props extends CardProps {
  tracker: Tracker;
}
const TrackerCard: FC<Props> = ({ tracker, ...cardProps }) => {
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
    <Card
      style={{ background: tracker.color }}
      {...cardProps}
      className="tracker-card"
      id={'tracker-card-' + tracker.id}>
      <TrackerCardHeader tracker={tracker} sx={sxProps} />
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

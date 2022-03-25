import { FC } from 'react';
import { CardContent, CardContentProps } from '@mui/material';
import Completion from '../../models/Completion';
import CompletionChipList from '../CompletionChipList/CompletionChipList';

interface Props {
  cardContentProps?: CardContentProps;
  onChipClick?: (completion: Completion) => void;
  requiredCompletions: Completion[];
  selectedCompletions?: Completion[];
}

const TrackerCardContent: FC<Props> = ({
  cardContentProps,
  onChipClick,
  requiredCompletions,
  selectedCompletions
}) => {
  return (
    <CardContent {...cardContentProps}>
      <CompletionChipList
        completions={requiredCompletions}
        onChipClick={onChipClick}
        selectedCompletions={selectedCompletions}
      />
    </CardContent>
  );
};

export default TrackerCardContent;

import { FC } from 'react';
import { CardContent, CardContentProps } from '@mui/material';
import Completion from '../../models/Completion';
import CompletionChipList from '../CompletionChipList/CompletionChipList';

interface Props {
  cardContentProps?: CardContentProps;
  requiredCompletions: Completion[];
}

const TrackerCardContent: FC<Props> = ({ cardContentProps, requiredCompletions }) => {
  return (
    <CardContent {...cardContentProps}>
      <CompletionChipList completions={requiredCompletions} />
    </CardContent>
  );
};

export default TrackerCardContent;

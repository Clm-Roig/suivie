import { Typography } from '@mui/material';
import { FC } from 'react';

import TrackerEntry from '../../../models/TrackerEntry';
import { getAggregatedCompletions } from '../../../store/trackers/utils';
import CompletionChipList from '../../CompletionChipList/CompletionChipList';

interface Props {
  entries: TrackerEntry[];
  noCompletionsText: string;
}

const TotalText: FC<Props> = ({ entries, noCompletionsText }) => {
  return (
    <>
      {entries.length > 0 ? (
        <>
          <Typography gutterBottom>Vous avez effectué :</Typography>
          <CompletionChipList completions={getAggregatedCompletions(entries)}></CompletionChipList>
        </>
      ) : (
        <Typography>{noCompletionsText}</Typography>
      )}
    </>
  );
};

export default TotalText;

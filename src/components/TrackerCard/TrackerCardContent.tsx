import { CardContent, CardContentProps, Typography } from '@mui/material';
import { isToday } from 'date-fns';
import { FC } from 'react';

import Completion from '../../models/Completion';
import Tracker from '../../models/Tracker';
import CompletionChipList from '../CompletionChipList/CompletionChipList';

interface Props {
  cardContentProps?: CardContentProps;
  onChipClick?: (completion: Completion) => void;
  selectedCompletions?: Completion[];
  tracker: Tracker;
}

const TrackerCardContent: FC<Props> = ({
  cardContentProps,
  onChipClick,
  selectedCompletions,
  tracker
}) => {
  const { entries, requiredCompletions } = tracker;
  const todayEntries = entries.filter((e) => isToday(new Date(e.date)));
  const todayCompletions = todayEntries.flatMap((e) => e.completions);
  const aggTodayCompletions: Completion[] = [];
  for (const completion of todayCompletions) {
    const completionIdx = aggTodayCompletions.findIndex((c) => c.unit === completion.unit);
    if (completionIdx !== -1) {
      // Add quantity
      aggTodayCompletions[completionIdx] = {
        ...aggTodayCompletions[completionIdx],
        quantity: aggTodayCompletions[completionIdx].quantity + completion.quantity
      };
    } else {
      aggTodayCompletions.push(completion);
    }
  }

  const remainingCompletions = requiredCompletions
    .map((rc) => {
      const todayCompletion = aggTodayCompletions.find((c) => rc.unit === c.unit);
      if (todayCompletion) {
        const remain = rc.quantity - todayCompletion.quantity;
        return {
          ...rc,
          quantity: remain
        } as Completion;
      }
      return rc;
    })
    .filter((c) => c.quantity > 0); // don't take completed completions

  return (
    <CardContent {...cardContentProps}>
      <Typography>Requis :</Typography>
      <CompletionChipList
        completions={requiredCompletions}
        onChipClick={onChipClick}
        selectedCompletions={selectedCompletions}
      />
      {remainingCompletions.length > 0 && (
        <>
          <Typography>Restants :</Typography>
          <CompletionChipList completions={remainingCompletions} />
        </>
      )}
    </CardContent>
  );
};

export default TrackerCardContent;

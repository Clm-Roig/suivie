import styled from '@emotion/styled';
import { CardContent, CardContentProps, Divider, Stack, Typography } from '@mui/material';
import { isToday } from 'date-fns';
import { FC } from 'react';

import Completion from '../../models/Completion';
import Tracker from '../../models/Tracker';
import CompletionChipList from '../CompletionChipList/CompletionChipList';

const TextWrapper = styled(Typography)`
  font-weight: bold;
  min-width: 64px;
`;

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
      <Stack divider={<Divider />} spacing={1}>
        {requiredCompletions.length > 0 && (
          <Stack alignItems="center" direction="row">
            <TextWrapper>Requis</TextWrapper>
            &nbsp;
            <CompletionChipList
              completions={requiredCompletions}
              onChipClick={onChipClick}
              selectedCompletions={selectedCompletions}
            />
          </Stack>
        )}
        {remainingCompletions.length > 0 ? (
          <Stack alignItems="center" direction="row">
            <TextWrapper>Reste</TextWrapper>
            &nbsp;
            <CompletionChipList
              completions={remainingCompletions}
              requiredCompletions={requiredCompletions}
            />
          </Stack>
        ) : (
          <Stack alignItems="center" direction="row">
            <TextWrapper>Réalisés</TextWrapper>
            &nbsp;
            <CompletionChipList completions={aggTodayCompletions} />
          </Stack>
        )}
      </Stack>
    </CardContent>
  );
};

export default TrackerCardContent;

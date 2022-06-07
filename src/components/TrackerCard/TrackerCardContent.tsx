import styled from '@emotion/styled';
import { CardContent, CardContentProps, Divider, Stack, Typography } from '@mui/material';
import { isSameDay } from 'date-fns';
import { FC } from 'react';

import { useAppSelector } from '../../hooks/redux';
import Completion from '../../models/Completion';
import Tracker from '../../models/Tracker';
import { selectSelectedDate } from '../../store/trackers/trackers.selectors';
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
  const selectedDate = new Date(useAppSelector(selectSelectedDate));

  const { entries, requiredCompletions } = tracker;
  const selectedDayEntries = entries.filter((e) => isSameDay(new Date(e.date), selectedDate));
  const selectedDayCompletions = selectedDayEntries.flatMap((e) => e.completions);
  const aggCompletions: Completion[] = [];
  for (const completion of selectedDayCompletions) {
    const completionIdx = aggCompletions.findIndex((c) => c.unit === completion.unit);
    if (completionIdx !== -1) {
      // Add quantity
      aggCompletions[completionIdx] = {
        ...aggCompletions[completionIdx],
        quantity: aggCompletions[completionIdx].quantity + completion.quantity
      };
    } else {
      aggCompletions.push(completion);
    }
  }

  const remainingCompletions = requiredCompletions
    .map((rc) => {
      const todayCompletion = aggCompletions.find((c) => rc.unit === c.unit);
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
            <CompletionChipList completions={aggCompletions} />
          </Stack>
        )}
      </Stack>
    </CardContent>
  );
};

export default TrackerCardContent;

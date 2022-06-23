import styled from '@emotion/styled';
import { CardContent, CardContentProps, Divider, Stack, Typography } from '@mui/material';
import { subDays } from 'date-fns';
import { FC } from 'react';

import { useAppSelector } from '../../hooks/redux';
import Completion from '../../models/Completion';
import Tracker from '../../models/Tracker';
import { selectSelectedDate } from '../../store/trackers/trackers.selectors';
import { getAggregatedCompletions } from '../../store/trackers/utils';
import CompletionChipList from '../CompletionChipList/CompletionChipList';

const TextWrapper = styled(Typography)`
  font-weight: bold;
  min-width: 64px;
`;

interface Props extends CardContentProps {
  onChipClick?: (completion: Completion) => void;
  selectedCompletions?: Completion[];
  tracker: Tracker;
}

const TrackerCardContent: FC<Props> = ({
  onChipClick,
  selectedCompletions,
  tracker,
  ...cardContentProps
}) => {
  const selectedDate = new Date(useAppSelector(selectSelectedDate));

  const { entries, frequency, requiredCompletions } = tracker;

  const aggCompletions = getAggregatedCompletions(
    entries,
    subDays(selectedDate, frequency - 1),
    selectedDate
  );

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

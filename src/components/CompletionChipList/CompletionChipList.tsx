import { Box, BoxProps } from '@mui/material';
import { FC } from 'react';

import Completion from '../../models/Completion';
import CompletionChip from '../CompletionChip/CompletionChip';

interface Props {
  boxProps?: BoxProps;
  completions: Completion[];
  onChipClick?: (completion: Completion) => void;
  requiredCompletions?: Completion[];
  selectedCompletions?: Completion[];
}

const CompletionChipList: FC<Props> = ({
  boxProps,
  completions,
  onChipClick,
  requiredCompletions,
  selectedCompletions
}) => {
  const onClick = (completion: Completion) => {
    if (onChipClick) {
      onChipClick(completion);
    }
  };
  return (
    <Box display="flex" gap={0.5} flexWrap={'wrap'} sx={{ justifyContent: 'center' }} {...boxProps}>
      {completions.map((c, idx) => (
        <CompletionChip
          key={c.quantity.toString() + idx}
          chipProps={{ onClick: () => onClick(c), clickable: onChipClick !== undefined }}
          completion={c}
          isSelected={selectedCompletions?.includes(c)}
          requiredCompletion={requiredCompletions?.find((rc) => rc.unit === c.unit)}
        />
      ))}
    </Box>
  );
};

export default CompletionChipList;

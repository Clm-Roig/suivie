import { Box, BoxProps } from '@mui/material';
import { FC } from 'react';

import Completion from '../../models/Completion';
import CompletionChip from '../CompletionChip/CompletionChip';

interface Props {
  completions: Completion[];
  onChipClick?: (completion: Completion) => void;
  selectedCompletions?: Completion[];
  boxProps?: BoxProps;
}

const CompletionChipList: FC<Props> = ({
  completions,
  onChipClick,
  selectedCompletions,
  boxProps
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
          completion={c}
          isSelected={selectedCompletions?.includes(c)}
          chipProps={{ onClick: () => onClick(c), clickable: onChipClick !== undefined }}
        />
      ))}
    </Box>
  );
};

export default CompletionChipList;

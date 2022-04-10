import { Chip, ChipProps } from '@mui/material';
import { FC } from 'react';

import Completion from '../../models/Completion';

interface Props {
  chipProps?: ChipProps;
  completion: Completion;
  isSelected?: boolean;
}

const CompletionChip: FC<Props> = ({ chipProps, completion, isSelected }) => {
  const { quantity, unit } = completion;
  return (
    <Chip
      clickable={true}
      color={isSelected ? 'info' : 'primary'}
      label={quantity.toString() + ' ' + unit}
      sx={{ '.MuiChip-label': { fontSize: 16 }, borderRadius: 2 }}
      {...chipProps}
    />
  );
};

export default CompletionChip;

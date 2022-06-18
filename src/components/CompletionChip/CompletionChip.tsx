import { Chip, ChipProps, useTheme } from '@mui/material';
import { FC } from 'react';

import Completion from '../../models/Completion';

interface Props extends ChipProps {
  completion: Completion;
  isSelected?: boolean;
  requiredCompletion?: Completion;
}

const CompletionChip: FC<Props> = ({
  completion,
  isSelected,
  requiredCompletion,
  ...chipProps
}) => {
  const { quantity, unit } = completion;
  const theme = useTheme();

  let background = isSelected ? 'info' : 'primary';
  if (requiredCompletion) {
    const transparentColor = theme.palette.grey[700];
    const remainingPercent = 100 - (completion.quantity / requiredCompletion.quantity) * 100;
    background = `linear-gradient(90deg, ${theme.palette.primary.main} ${
      remainingPercent - 1
    }%, black ${remainingPercent}%, ${transparentColor} ${remainingPercent + 1}%)`;
  }

  const sxProps = {
    '.MuiChip-label': { fontSize: 16 },
    borderRadius: 2,
    background: background
  };
  return (
    <Chip
      clickable={true}
      color={isSelected ? 'info' : 'primary'}
      label={quantity.toString() + ' ' + unit}
      sx={sxProps}
      {...chipProps}
    />
  );
};

export default CompletionChip;

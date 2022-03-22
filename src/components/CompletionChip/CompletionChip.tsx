import { FC } from 'react';
import { Chip } from '@mui/material';
import Completion from '../../models/Completion';

interface Props {
  completion: Completion;
}

const CompletionChip: FC<Props> = ({ completion }) => {
  const { quantity, unit } = completion;
  return (
    <Chip
      clickable={true}
      color="primary"
      label={quantity.toString() + ' ' + unit}
      sx={{ fontSize: 16 }}
    />
  );
};

export default CompletionChip;
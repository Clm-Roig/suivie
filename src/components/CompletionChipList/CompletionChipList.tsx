import { FC } from 'react';
import { Box } from '@mui/material';
import Completion from '../../models/Completion';
import CompletionChip from '../CompletionChip/CompletionChip';

interface Props {
  completions: Completion[];
}

const CompletionChipList: FC<Props> = ({ completions }) => {
  return (
    <Box display="flex" gap={0.5} flexWrap={'wrap'} sx={{ justifyContent: 'center' }}>
      {completions.map((c, idx) => (
        <CompletionChip key={c.quantity.toString() + idx} completion={c} />
      ))}
    </Box>
  );
};

export default CompletionChipList;

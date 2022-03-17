import { FC } from 'react';
import { CardContent, CardContentProps, Chip, Box } from '@mui/material';
import Completion from '../../models/Completion';

interface Props {
  cardContentProps?: CardContentProps;
  requiredCompletions: Completion[];
}

const TrackerCardContent: FC<Props> = ({ cardContentProps, requiredCompletions }) => {
  return (
    <CardContent {...cardContentProps}>
      <Box display="flex" gap={0.5} flexWrap={'wrap'}>
        {requiredCompletions.map((c, idx) => (
          <Chip
            key={c.quantity.toString() + idx}
            clickable={true}
            color="primary"
            label={c.unit ? c.quantity.toString() + ' ' + c.unit : c.quantity.toString()}
            sx={{ fontSize: 16 }}
          />
        ))}
      </Box>
    </CardContent>
  );
};

export default TrackerCardContent;

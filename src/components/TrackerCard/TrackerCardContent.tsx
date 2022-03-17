import { FC } from 'react';
import { CardContent, CardContentProps, Chip } from '@mui/material';

interface Props {
  cardContentProps?: CardContentProps;
  defaultQuantity: number;
  unit?: string;
}

const TrackerCardContent: FC<Props> = ({ cardContentProps, defaultQuantity, unit }) => {
  let stringToDisplay = defaultQuantity.toString();
  if (unit) {
    stringToDisplay += ' ' + unit;
  }
  return (
    <CardContent {...cardContentProps}>
      <Chip clickable={true} color="primary" sx={{ fontSize: 16 }} label={stringToDisplay} />
    </CardContent>
  );
};

export default TrackerCardContent;

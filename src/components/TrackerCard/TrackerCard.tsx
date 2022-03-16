import { FC } from 'react';
import {
  Box,
  Card,
  CardProps,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Chip
} from '@mui/material';
import formatDate from '../../utils/formatDate';
import Tracker from '../../models/Tracker';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckIcon from '@mui/icons-material/Check';
import TimerIcon from '@mui/icons-material/Timer';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface Props {
  tracker: Tracker;
  cardProps?: CardProps;
}
const TrackerCard: FC<Props> = ({ tracker, cardProps }) => {
  const { beginDate, defaultQuantity, name, remainingDays, unit } = tracker;
  return (
    <Card {...cardProps}>
      <CardHeader title={name} subheader={`Commencé le ${formatDate(new Date(beginDate))}`} />
      {(defaultQuantity || remainingDays) && (
        <CardContent>
          {defaultQuantity && <Chip label={`${defaultQuantity} ${unit}`} />}
          {remainingDays && (
            <Chip color="secondary" label={`Reste ${remainingDays} jours`} icon={<TimerIcon />} />
          )}
        </CardContent>
      )}
      <CardActions>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <IconButton color="success" size="large">
            <CheckIcon fontSize="large" />
          </IconButton>
          <IconButton color="success" size="large">
            <CheckCircleIcon fontSize="large" />
          </IconButton>
          <IconButton size="large">
            <VisibilityOffIcon fontSize="large" />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};

export default TrackerCard;

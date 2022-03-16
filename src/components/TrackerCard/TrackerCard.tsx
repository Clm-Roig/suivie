import { FC } from 'react';
import {
  Box,
  Card,
  CardProps,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Chip,
  Typography
} from '@mui/material';
import formatDate from '../../utils/formatDate';
import Tracker from '../../models/Tracker';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckIcon from '@mui/icons-material/Check';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface Props {
  tracker: Tracker;
  cardProps?: CardProps;
}
const TrackerCard: FC<Props> = ({ tracker, cardProps }) => {
  const { beginDate, defaultQuantity, name, remainingDays, unit } = tracker;
  return (
    <Card {...cardProps}>
      <CardHeader
        title={name}
        subheader={
          <>
            <Typography display="block" variant="subtitle2">
              Commencé le {formatDate(new Date(beginDate))}`
            </Typography>
            {remainingDays && (
              <Typography display="block" variant="subtitle2">
                Reste {remainingDays} jours
              </Typography>
            )}
          </>
        }
      />
      {(defaultQuantity || remainingDays) && (
        <CardContent>
          {defaultQuantity && (
            <Chip
              clickable={true}
              color="primary"
              sx={{ fontSize: 16 }}
              label={`${defaultQuantity} ${unit}`}
            />
          )}
        </CardContent>
      )}
      <CardActions>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <IconButton color="primary" size="large">
            <CheckIcon fontSize="large" />
          </IconButton>
          <IconButton color="primary" size="large">
            <CheckCircleIcon fontSize="large" />
          </IconButton>
          <IconButton color="primary" size="large">
            <VisibilityOffIcon fontSize="large" />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};

export default TrackerCard;

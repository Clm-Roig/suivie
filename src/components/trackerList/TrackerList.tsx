import { Box, Card, CardContent, CircularProgress, IconButton, Typography } from '@mui/material';

import { useAppSelector } from '../../app/hooks';
import formatDate from '../../utils/formatDate';
import SliceStatus from '../../models/SliceStatus';
import selectTrackers from '../../store/trackers/trackers.selectors';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TrackerCard from '../TrackerCard/TrackerCard';

function TrackerList() {
  const { status, trackers } = useAppSelector(selectTrackers);
  const cardSxProp = { mt: 2, bgcolor: 'secondary.main' };

  return (
    <Box>
      {status === SliceStatus.loading && <CircularProgress />}

      <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', width: '100%' }}>
        <IconButton>
          <ChevronLeftIcon color="primary" fontSize="large" />
        </IconButton>
        <Typography variant="h5">{formatDate(new Date())}</Typography>
        <IconButton>
          <ChevronRightIcon color="primary" fontSize="large" />
        </IconButton>
      </Box>

      {trackers && trackers.length === 0 && (
        <Typography>{"Vous n'avez pas encore de trackers."}</Typography>
      )}

      <Card sx={cardSxProp}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <IconButton>
              <AddCircleOutlineIcon fontSize="large" color="primary" />
            </IconButton>
          </Box>
        </CardContent>
      </Card>

      {trackers && trackers.length > 0 && (
        <>
          {trackers.map((t) => (
            <TrackerCard tracker={t} key={t.name} cardProps={{ sx: cardSxProp }} />
          ))}
        </>
      )}
    </Box>
  );
}

export default TrackerList;

import { Box, CircularProgress, List, ListItem, Typography } from '@mui/material';
import { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import SliceStatus from '../../models/SliceStatus';
import {
  fetchAllTrackers,
  selectTrackers
} from '../../store/trackers/trackersSlice';

function TrackerList() {
  const {status, trackers} = useAppSelector(selectTrackers);
  const dispatch = useAppDispatch(); 

  useEffect(() => {
    if (trackers === undefined) {
      dispatch(fetchAllTrackers());
    }
  }, [trackers]);
  
  return (
    <Box>
      {status === SliceStatus.loading && <CircularProgress />}
      {trackers && trackers.length === 0 && <Typography>There are no trackers.</Typography>}
      {trackers && trackers.length > 0 && <List>
        {trackers.map((t) => 
          <ListItem key={t.name}>
            <Typography variant="body1">{t.name} - {new Date(t.beginDate).toLocaleDateString()} - {t.status}</Typography>
          </ListItem>
        )}
      </List>}
    </Box>
  );
}

export default TrackerList;

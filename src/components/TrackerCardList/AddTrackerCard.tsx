import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Box, Card, CardActionArea, CardContent, CardProps } from '@mui/material';
import { FC, useState } from 'react';

import { useAppDispatch } from '../../hooks/redux';
import Tracker from '../../models/Tracker';
import { createTracker } from '../../store/trackers/trackersSlice';
import defaultCardProps from '../TrackerCard/defaultCardProps';
import TrackerForm from '../forms/TrackerForm/TrackerForm';

type Props = CardProps;
const AddTrackerCard: FC<Props> = (cardProps) => {
  const dispatch = useAppDispatch();
  const [displayCreateForm, setDisplayCreateForm] = useState(false);

  const allCardProps = {
    ...defaultCardProps,
    ...cardProps
  };

  const onSubmit = (tracker: Tracker) => {
    dispatch(createTracker(tracker));
    setDisplayCreateForm(false);
  };

  return (
    <Card {...allCardProps}>
      <CardActionArea onClick={() => setDisplayCreateForm(!displayCreateForm)}>
        <CardContent>
          <Box
            sx={{
              textAlign: 'center'
            }}>
            {displayCreateForm ? (
              <RemoveCircleOutlineIcon fontSize="large" color="primary" />
            ) : (
              <AddCircleOutlineIcon fontSize="large" color="primary" />
            )}
          </Box>
        </CardContent>
      </CardActionArea>
      {displayCreateForm && (
        <CardContent>
          <TrackerForm onSubmit={onSubmit} />
        </CardContent>
      )}
    </Card>
  );
};

export default AddTrackerCard;

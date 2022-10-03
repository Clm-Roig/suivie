import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Box, Card, CardActionArea, CardContent, CardProps } from '@mui/material';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { FC, useState } from 'react';

import { useAppDispatch } from '../../hooks/redux';
import Tracker from '../../models/Tracker';
import { createTracker } from '../../store/trackers/trackersSlice';
import TrackerForm from '../forms/TrackerForm/TrackerForm';

const openDrawerFromTop: Variants = {
  fromTop: {
    height: 0
  },
  animate: {
    height: 'auto'
  },
  toTop: {
    height: 0
  }
};

type Props = CardProps;
const AddTrackerCard: FC<Props> = (cardProps) => {
  const dispatch = useAppDispatch();
  const [displayCreateForm, setDisplayCreateForm] = useState(false);

  const allCardProps = {
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
          <Box textAlign="center">
            {displayCreateForm ? (
              <RemoveCircleOutlineIcon fontSize="large" color="primary" />
            ) : (
              <AddCircleOutlineIcon fontSize="large" color="primary" />
            )}
          </Box>
        </CardContent>
      </CardActionArea>
      <AnimatePresence>
        {displayCreateForm && (
          <motion.div
            initial="fromTop"
            animate="animate"
            exit="toTop"
            variants={openDrawerFromTop}
            transition={{ duration: 0.5 }}>
            <CardContent>
              <TrackerForm onSubmit={onSubmit} />
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default AddTrackerCard;

import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { persistor } from '../store/store';
import { selectAllTrackers } from '../store/trackers/trackers.selectors';
import { setSelectedDate } from '../store/trackers/trackersSlice';
import isATracker from '../utils/isATracker';
import FullScreenLoading from './FullScreenLoading';

interface Props {
  children: React.ReactNode;
}

const CustomPersistGate: FC<Props> = ({ children }) => {
  const [trackersReadyToBeChecked, setTrackersReadyToBeChecked] = useState(false);
  const { trackers } = useAppSelector(selectAllTrackers);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (trackers.length > 0) {
      setTrackersReadyToBeChecked(true);
    }
  }, [trackers]);

  useEffect(() => {
    if (trackersReadyToBeChecked) {
      // Change date to today
      dispatch(setSelectedDate(new Date().toString()));
      // Check trackers
      for (const tracker of trackers) {
        const data = isATracker(tracker);
        if (data.errors.length !== 0) {
          navigate('/data-error', {
            state: data
          });
          return;
        }
      }
      // Move to the validate trackers page
      if (trackers.length > 0) {
        navigate('/trackers');
      }
    }
  }, [trackersReadyToBeChecked]);

  return (
    <PersistGate loading={<FullScreenLoading />} persistor={persistor}>
      {' '}
      {children}
    </PersistGate>
  );
};

export default CustomPersistGate;

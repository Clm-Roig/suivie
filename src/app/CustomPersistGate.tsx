import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor } from '../store/store';
import { selectAllTrackers } from '../store/trackers/trackers.selectors';
import isATracker from '../utils/isATracker';
import FullScreenLoading from './FullScreenLoading';
import { useAppSelector } from './hooks';

interface Props {
  children: React.ReactNode;
}

const CustomPersistGate: FC<Props> = ({ children }) => {
  const { trackers } = useAppSelector(selectAllTrackers);
  const navigate = useNavigate();

  const handleBeforeLift = () => {
    for (const tracker of trackers) {
      const data = isATracker(tracker);
      if (data.errors.length !== 0) {
        navigate('./data-error', {
          state: data
        });
      }
    }
  };

  return (
    <PersistGate
      loading={<FullScreenLoading />}
      persistor={persistor}
      onBeforeLift={handleBeforeLift}>
      {children}
    </PersistGate>
  );
};

export default CustomPersistGate;

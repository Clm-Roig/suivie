import { FC } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import FullScreenLoading from './FullScreenLoading';
import { persistor } from '../store/store';
import { useAppSelector } from './hooks';
import { selectAllTrackers } from '../store/trackers/trackers.selectors';
import isATracker from '../utils/isATracker';
import { useNavigate } from 'react-router-dom';

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

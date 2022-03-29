import { Route, Routes } from 'react-router-dom';
import DataError from '../pages/errors/DataError';
import Settings from '../pages/Settings';
import Statistics from '../pages/Statistics';
import Trackers from '../pages/Trackers';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Trackers />} />
      <Route path="/data-error" element={<DataError />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/stats" element={<Statistics />} />
      <Route path="/trackers" element={<Trackers />} />
    </Routes>
  );
}

export default Router;

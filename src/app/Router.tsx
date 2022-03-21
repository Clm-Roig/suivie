import { Route, Routes } from 'react-router-dom';
import Trackers from '../pages/Trackers';
import Statistics from '../pages/Statistics';
import DataError from '../pages/errors/DataError';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Trackers />} />
      <Route path="/data-error" element={<DataError />} />
      <Route path="/trackers" element={<Trackers />} />
      <Route path="/stats" element={<Statistics />} />
    </Routes>
  );
}

export default Router;

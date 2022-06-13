import { Route, Routes } from 'react-router-dom';

import About from '../pages/About';
import Home from '../pages/Home';
import ManageTrackers from '../pages/ManageTrackers';
import Settings from '../pages/Settings';
import Statistics from '../pages/Statistics';
import Trackers from '../pages/Trackers';
import DataError from '../pages/errors/DataError';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/trackers/manage" element={<ManageTrackers />} />
      <Route path="/data-error" element={<DataError />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/stats" element={<Statistics />} />
      <Route path="/trackers" element={<Trackers />} />
    </Routes>
  );
}

export default Router;

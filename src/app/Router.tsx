import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';

import About from '../pages/About/About';
import GraphicalCharter from '../pages/GraphicalCharter/GraphicalCharter';
import Home from '../pages/Home/Home';
import ManageTrackers from '../pages/ManageTrackers/ManageTrackers';
import Settings from '../pages/Settings/Settings';
import Statistics from '../pages/Statistics/Statistics';
import Trackers from '../pages/Trackers/Trackers';
import DataError from '../pages/errors/DataError';

function Router() {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/graphical-charter" element={<GraphicalCharter />} />
        <Route path="/trackers/manage" element={<ManageTrackers />} />
        <Route path="/data-error" element={<DataError />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/stats" element={<Statistics />} />
        <Route path="/trackers" element={<Trackers />} />
      </Routes>
    </AnimatePresence>
  );
}

export default Router;

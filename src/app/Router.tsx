import { Route, Routes } from 'react-router-dom';
import Trackers from '../pages/Trackers';
import Statistics from '../pages/Statistics';

function Router() {
  return (
    <Routes>
      <Route path="/trackers" element={<Trackers/>}/>
      <Route path="/stats" element={<Statistics/>} />
    </Routes>
  )
}

export default Router;
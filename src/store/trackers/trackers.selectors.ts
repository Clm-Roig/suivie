import { RootState } from '../store';
import Tracker from '../models/Tracker';

const selectTrackers = (state: RootState) => {
  return {
    ...state.trackers,
    trackers: state.trackers.trackers?.map((t) => t as Tracker)
  };
}

export default selectTrackers;

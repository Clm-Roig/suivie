import Tracker from '../../../models/Tracker';
import TrackersState from '../TrackersState';

const getTrackers = (state: TrackersState, trackerIds: Tracker['id'][]) => {
  return state.trackers.filter((t) => trackerIds.includes(t.id));
};

export { getTrackers };

import { RootState } from '../store';
import TrackerStatus from '../../models/TrackerStatus';
import {
  formatTrackers,
  removeDoneTrackers,
  removeHiddenTrackers,
  removeOverTrackers
} from './utils';

const selectHiddenTrackers = (state: RootState) => {
  const newTrackers = removeOverTrackers(
    formatTrackers(state.trackers.trackers).filter((t) => t.dateHidden !== undefined)
  );
  return {
    ...state.trackers,
    trackers: newTrackers
  };
};

const selectDoneTrackers = (state: RootState) => {
  const newTrackers = formatTrackers(state.trackers.trackers).filter(
    (t) => t.status === TrackerStatus.done
  );

  return {
    ...state.trackers,
    trackers: newTrackers
  };
};

const selectTodoTrackers = (state: RootState) => {
  const newTrackers = removeOverTrackers(
    removeHiddenTrackers(
      removeDoneTrackers(
        formatTrackers(state.trackers.trackers).filter((t) => t.dateHidden === undefined)
      )
    )
  );
  return {
    ...state.trackers,
    trackers: newTrackers
  };
};

const selectAllTrackers = (state: RootState) => {
  const newTrackers = formatTrackers(state.trackers.trackers);
  return {
    ...state.trackers,
    trackers: newTrackers
  };
};

export { selectAllTrackers, selectDoneTrackers, selectHiddenTrackers, selectTodoTrackers };

import { RootState } from '../store';
import TrackerStatus from '../../models/TrackerStatus';
import {
  formatTrackers,
  removeDoneTrackers,
  removeHiddenTrackers,
  removeOverTrackers
} from './utils';
import { differenceInDays, isAfter, isEqual, isSameMonth } from 'date-fns';
import TrackerEntry from '../../models/TrackerEntry';

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

const selectMonthEntries = (
  state: RootState,
  monthDate: Date,
  trackerId: string
): TrackerEntry[] => {
  const tracker = state.trackers.trackers.find((t) => t.id === trackerId);
  if (tracker) {
    return tracker.entries.filter((e) => isSameMonth(monthDate, new Date(e.date)));
  } else return [];
};

const selectWeekEntries = (
  state: RootState,
  beginDate: Date,
  trackerId: string
): TrackerEntry[] => {
  const tracker = state.trackers.trackers.find((t) => t.id === trackerId);
  if (tracker) {
    return tracker.entries
      .filter((e) => {
        const isEqualBeginDate = isEqual(new Date(e.date), beginDate);
        const isAfterBeginDate = isAfter(new Date(e.date), beginDate);
        const less7Days = differenceInDays(new Date(e.date), beginDate) < 7;
        return (isEqualBeginDate || isAfterBeginDate) && less7Days;
      })
      .flatMap((e) => e);
  } else return [];
};

export {
  selectAllTrackers,
  selectDoneTrackers,
  selectHiddenTrackers,
  selectTodoTrackers,
  selectMonthEntries,
  selectWeekEntries
};

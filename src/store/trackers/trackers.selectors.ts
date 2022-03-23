import { RootState } from '../store';
import Tracker from '../../models/Tracker';
import { addDays, differenceInDays, isSameDay } from 'date-fns';
import TrackerStatus from '../../models/TrackerStatus';

const computeRemainingDays = (beginDate: string, duration: number) => {
  const estimatedEndDateObj = addDays(new Date(beginDate), duration);
  const difference = differenceInDays(estimatedEndDateObj, new Date());
  return difference;
};

const computeNewStatus = (tracker: Tracker) => {
  const { remainingDays, entries, status } = tracker;
  let newStatus = status;
  // End tracker if needed
  if (remainingDays !== undefined && remainingDays < 0) {
    newStatus = TrackerStatus.over;
  }
  // Mark Tracker as done if there is a completion for today
  if (entries.some((e) => isSameDay(new Date(e.date), new Date()))) {
    newStatus = TrackerStatus.done;
  }

  return newStatus;
};

const formatTrackers = (trackers: Tracker[]) => {
  const newTrackers = trackers.map((t) => {
    let trackerObj = t as Tracker;
    const { beginDate, dateHidden, duration } = trackerObj;
    // Delete dateHidden if it is not today
    if (dateHidden) {
      if (!isSameDay(new Date(dateHidden), new Date())) {
        trackerObj.dateHidden = undefined;
      }
    }
    // Remaining Days
    if (beginDate && duration) {
      trackerObj = {
        ...trackerObj,
        remainingDays: computeRemainingDays(beginDate, duration)
      };
    }

    trackerObj = {
      ...trackerObj,
      status: computeNewStatus(trackerObj)
    };

    return trackerObj;
  });
  return newTrackers;
};

const removeOverTrackers = (trackers: Tracker[]) =>
  trackers.filter((t) => t.status !== TrackerStatus.over);

const removeDoneTrackers = (trackers: Tracker[]) =>
  trackers.filter((t) => t.status !== TrackerStatus.done);

const removeHiddenTrackers = (trackers: Tracker[]) =>
  trackers.filter((t) => t.dateHidden === undefined);

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

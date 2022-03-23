import { addDays, differenceInDays, isBefore, isSameDay } from 'date-fns';
import Tracker from '../../models/Tracker';
import TrackerStatus from '../../models/TrackerStatus';

export const computeRemainingDays = (beginDate: string, duration: number) => {
  const estimatedEndDateObj = addDays(new Date(beginDate), duration);
  const difference = differenceInDays(estimatedEndDateObj, new Date());
  return difference;
};

export const computeNewStatus = (tracker: Tracker) => {
  const { beginDate, duration, entries, remainingDays, status } = tracker;
  let newStatus = status;
  // End tracker if needed
  if (
    (remainingDays !== undefined && remainingDays < 0) ||
    (duration && isBefore(addDays(new Date(beginDate), duration), new Date()))
  ) {
    newStatus = TrackerStatus.over;
  }
  // Mark Tracker as done if there is a completion for today
  if (entries.some((e) => isSameDay(new Date(e.date), new Date()))) {
    newStatus = TrackerStatus.done;
  }
  return newStatus;
};

export const formatTrackers = (trackers: Tracker[]) => {
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

export const removeOverTrackers = (trackers: Tracker[]) =>
  trackers.filter((t) => t.status !== TrackerStatus.over);

export const removeDoneTrackers = (trackers: Tracker[]) =>
  trackers.filter((t) => t.status !== TrackerStatus.done);

export const removeHiddenTrackers = (trackers: Tracker[]) =>
  trackers.filter((t) => t.dateHidden === undefined);

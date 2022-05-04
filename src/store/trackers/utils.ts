import { addDays, differenceInDays, isBefore, isSameDay, isToday } from 'date-fns';

import Completion from '../../models/Completion';
import Tracker from '../../models/Tracker';
import TrackerEntry from '../../models/TrackerEntry';
import TrackerStatus from '../../models/TrackerStatus';

const aggregateCompletions = (completions: Completion[]) => {
  if (completions.length === 0) return [];
  return completions.reduce<Completion[]>((res, todayCompletion) => {
    const previousCompletion = res.find((c) => c.unit === todayCompletion.unit);
    let newRes: Completion[] = [];
    if (previousCompletion) {
      newRes = [
        ...res.filter((c) => c.unit !== todayCompletion.unit),
        {
          ...previousCompletion,
          quantity: previousCompletion.quantity + todayCompletion.quantity
        }
      ];
    } else {
      newRes = [...res, todayCompletion];
    }
    return newRes;
  }, []);
};

export const getAggregatedCompletions = (entries: TrackerEntry[]): Completion[] => {
  return aggregateCompletions(entries.flatMap((e) => e.completions));
};

const getTodayAggregatedCompletions = (entries: TrackerEntry[]): Completion[] => {
  const todayCompletions = entries
    .filter((e) => isSameDay(new Date(e.date), new Date()))
    .flatMap((e) => e.completions);
  return aggregateCompletions(todayCompletions);
};

export const computeRemainingDays = (beginDate: string, duration: number) => {
  const estimatedEndDateObj = addDays(new Date(beginDate), duration);
  const difference = differenceInDays(estimatedEndDateObj, new Date());
  return difference;
};

export const computeIfDone = (tracker: Tracker) => {
  const { entries, requiredCompletions } = tracker;
  let res = false;

  // Tracker is done if all required completions are done today
  // If there is no required completions, test if there is an entry for today
  const todayCompletions = getTodayAggregatedCompletions(entries);
  const remains = [];
  if (requiredCompletions.length > 0) {
    for (const requiredCompletion of requiredCompletions) {
      const remain = requiredCompletion.quantity;
      const todayCompletion = todayCompletions.find((c) => c.unit === requiredCompletion.unit);
      remains.push(
        todayCompletion ? requiredCompletion.quantity - todayCompletion.quantity : remain
      );
    }
    if (remains.every((x) => x <= 0)) {
      res = true;
    }
  } else {
    if (entries.filter((e) => isToday(new Date(e.date))).length > 0) {
      res = true;
    }
  }

  return res;
};

export const computeNewStatus = (tracker: Tracker) => {
  const { beginDate, duration, remainingDays, status } = tracker;
  let newStatus = status;
  // Archive tracker if needed
  if (
    (remainingDays !== undefined && remainingDays < 0) ||
    (duration && isBefore(addDays(new Date(beginDate), duration), new Date()))
  ) {
    newStatus = TrackerStatus.archived;
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

    return {
      ...trackerObj,
      isDoneForToday: computeIfDone(trackerObj),
      status: computeNewStatus(trackerObj)
    };
  });
  return newTrackers;
};

export const removeArchivedTrackers = (trackers: Tracker[]) =>
  trackers.filter((t) => t.status !== TrackerStatus.archived);

export const removeDoneTrackers = (trackers: Tracker[]) =>
  trackers.filter((t) => !t.isDoneForToday);

export const removeHiddenTrackers = (trackers: Tracker[]) =>
  trackers.filter((t) => t.dateHidden === undefined);

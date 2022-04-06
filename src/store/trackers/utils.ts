import { addDays, differenceInDays, isBefore, isSameDay } from 'date-fns';
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

export const computeNewStatus = (tracker: Tracker) => {
  const { beginDate, duration, entries, remainingDays, requiredCompletions, status } = tracker;
  let newStatus = status;
  // End tracker if needed
  if (
    (remainingDays !== undefined && remainingDays < 0) ||
    (duration && isBefore(addDays(new Date(beginDate), duration), new Date()))
  ) {
    newStatus = TrackerStatus.over;
  }

  // Mark Tracker as done if all required completions are done
  const todayCompletions = getTodayAggregatedCompletions(entries);
  const remains = [];
  for (const requiredCompletion of requiredCompletions) {
    const remain = requiredCompletion.quantity;
    const todayCompletion = todayCompletions.find((c) => c.unit === requiredCompletion.unit);
    if (todayCompletion) {
      remains.push(requiredCompletion.quantity - todayCompletion.quantity);
    } else {
      remains.push(remain);
    }
  }

  if (remains.every((x) => x <= 0)) {
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

    return {
      ...trackerObj,
      status: computeNewStatus(trackerObj)
    };
  });
  return newTrackers;
};

export const removeOverTrackers = (trackers: Tracker[]) =>
  trackers.filter((t) => t.status !== TrackerStatus.over);

export const removeDoneTrackers = (trackers: Tracker[]) =>
  trackers.filter((t) => t.status !== TrackerStatus.done);

export const removeHiddenTrackers = (trackers: Tracker[]) =>
  trackers.filter((t) => t.dateHidden === undefined);

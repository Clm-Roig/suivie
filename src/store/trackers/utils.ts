import {
  addDays,
  differenceInDays,
  endOfDay,
  isBefore,
  isSameDay,
  startOfDay,
  subDays
} from 'date-fns';

import Completion from '../../models/Completion';
import Tracker from '../../models/Tracker';
import TrackerEntry from '../../models/TrackerEntry';
import TrackerStatus from '../../models/TrackerStatus';
import { isBetween } from '../../utils/isBetween';

const aggregateCompletions = (completions: Completion[]) => {
  if (completions.length === 0) return [];
  return completions.reduce<Completion[]>((res, completion) => {
    const previousCompletion = res.find((c) => c.unit === completion.unit);
    let newRes: Completion[] = [];
    if (previousCompletion) {
      newRes = [
        ...res.filter((c) => c.unit !== completion.unit),
        {
          ...previousCompletion,
          quantity: previousCompletion.quantity + completion.quantity
        }
      ];
    } else {
      newRes = [...res, completion];
    }
    return newRes;
  }, []);
};

/**
 * - If no date provided, return the aggregated completions of the provided entries.
 * - If only one date is provided, return the completions of this day.
 * - If two dates are provided, return the completions between both days (included).
 *
 * @param {TrackerEntry[]} entries
 * @param {Date?} date1
 * @param {Date?} date2
 * @return {*}  {Completion[]}
 */
export const getAggregatedCompletions = (
  entries: TrackerEntry[],
  date1?: Date,
  date2?: Date
): Completion[] => {
  let filteredEntries = entries;
  if (date1 && date2) {
    filteredEntries = entries.filter((e) =>
      isBetween(new Date(e.date), startOfDay(date1), endOfDay(date2))
    );
  } else if (date1 && !date2) {
    filteredEntries = entries.filter((e) => isSameDay(new Date(e.date), date1));
  }
  return aggregateCompletions(filteredEntries.flatMap((e) => e.completions));
};

export const computeRemainingDays = (beginDate: string, duration: number) => {
  const estimatedEndDateObj = addDays(new Date(beginDate), duration);
  const difference = differenceInDays(estimatedEndDateObj, new Date());
  return difference;
};

export const computeIfDone = (tracker: Tracker, dateToCheck: Date = new Date()) => {
  const { entries, frequency, requiredCompletions } = tracker;
  let res = false;

  // Tracker is done if all required completions are done for the provided date (or before if the frequency is superior to 1)
  // If there is no required completions, test if there is an entry for this date.
  const completions =
    tracker.frequency === 1
      ? getAggregatedCompletions(entries, dateToCheck)
      : getAggregatedCompletions(entries, subDays(dateToCheck, frequency), dateToCheck);

  const remains = [];
  if (requiredCompletions.length > 0) {
    for (const requiredCompletion of requiredCompletions) {
      const remain = requiredCompletion.quantity;
      const completion = completions.find((c) => c.unit === requiredCompletion.unit);
      remains.push(completion ? requiredCompletion.quantity - completion.quantity : remain);
    }
    if (remains.every((x) => x <= 0)) {
      res = true;
    }
  } else {
    if (
      entries.filter((e) =>
        isBetween(
          new Date(e.date),
          startOfDay(subDays(dateToCheck, frequency)),
          endOfDay(dateToCheck)
        )
      ).length > 0
    ) {
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
    newStatus = TrackerStatus.ARCHIVED;
  }

  return newStatus;
};

/**
 * Get the completions used by a tracker by default
 * @param tracker
 */
export const getDefaultValidationCompletions = (tracker: Tracker) => {
  const { defaultCompletions, requiredCompletions } = tracker;
  if (defaultCompletions && defaultCompletions?.length > 0) {
    return defaultCompletions;
  } else {
    return requiredCompletions;
  }
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
  trackers.filter((t) => t.status !== TrackerStatus.ARCHIVED);

export const removeHiddenTrackers = (trackers: Tracker[]) =>
  trackers.filter((t) => t.dateHidden === undefined);

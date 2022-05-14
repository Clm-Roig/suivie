import Tracker from '../models/Tracker';

export type NotATrackerError = {
  key: string;
  valueType: string;
  expectedTypes: string[];
};

export type NotATrackerResponse = {
  errors: NotATrackerError[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  problematicData: any;
};

// Typescript doesn't implement interface type checking so we do it. It's not perfect but will cover enough cases
/**
 * Check if an object is a Tracker.
 *
 * @param {*} tracker
 * @return {boolean | string} true if the tracker is a Tracker, else a HTML string describing the issue
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isATracker = (tracker: any): NotATrackerResponse => {
  const builtTracker: Tracker = tracker;
  const checks = [
    { key: 'id', types: ['string'] },
    { key: 'beginDate', types: ['string'] },
    { key: 'dateHidden', types: ['string', 'undefined'] },
    { key: 'defaultCompletions', types: ['array'] },
    { key: 'duration', types: ['number', 'undefined'] },
    { key: 'endDate', types: ['string', 'undefined'] },
    { key: 'entries', types: ['array'] },
    { key: 'name', types: ['string'] },
    { key: 'remainingDays', types: ['number', 'undefined'] },
    { key: 'requiredCompletions', types: ['array'] },
    { key: 'status', types: ['string'] }
  ];
  const errors = [];
  for (const check of checks) {
    const { key, types } = check;
    const value = builtTracker[key as keyof Tracker];
    const valueType = typeof value;
    const isArray = Array.isArray(value);
    if (types[0] === 'array') {
      if (!isArray) {
        errors.push({ key, valueType, expectedTypes: types } as NotATrackerError);
      }
    } else if (!types.includes(valueType)) {
      errors.push({ key, valueType, expectedTypes: types } as NotATrackerError);
    }
  }

  return { errors: errors, problematicData: tracker } as NotATrackerResponse;
};

export default isATracker;

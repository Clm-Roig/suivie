import Completion from './Completion';
import TrackerColor from './TrackerColor';
import TrackerEntry from './TrackerEntry';
import TrackerStatus from './TrackerStatus';

/**
 * A Tracker describes an objective which needs to be accomplished on a daily basis.
 * To keep tracker of the objective, the trackers references TrackerEntries.
 *
 * @interface Tracker
 * @member {string} id a v4 uuid
 * @member {string} beginDate when the completions start (can be in the past or the future)
 * @member {TrackerColor} color hexadecimal color of the Tracker
 * @member {string?} dateHidden when not undefined, specify which day the tracker is ignored. The next day, it's automatically set to "undefined".
 * @member {Completion[]} defaultCompletions default completions submitted when validating the tracker
 * @member {number?} duration number of days the tracker is active since beginDate
 * @member {string} endDate when the Tracker was archived
 * @member {TrackerEntry[]} entries TrackerEntries related to this Tracker
 * @member {number} frequency number of days before the tracker is "to do" again
 * @member {boolean} isDoneForToday
 * @member {string} name
 * @member {number?} remainingDays computed attribute describing the number of days before the tracker is archived
 * @member {Completion[]} requiredCompletions objectives to complete the tracker
 * @member {TrackerStatus} status @see TrackerStatus
 */
export default interface Tracker {
  readonly id: string;
  beginDate: string;
  color: TrackerColor;
  dateHidden?: string;
  defaultCompletions?: Completion[];
  duration?: number;
  endDate?: string;
  entries: TrackerEntry[];
  frequency: number;
  isDoneForToday: boolean;
  name: string;
  remainingDays?: number;
  requiredCompletions: Completion[];
  status: TrackerStatus;
}

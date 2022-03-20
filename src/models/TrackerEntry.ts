import Completion from './Completion';

/**
 * A TrackerEntry is multiple Completions achieved on a precise date
 *
 * @interface TrackerEntry
 * @member {string} id a v4 uuid
 * @member {Completion[]} completions actions done, can't be empty
 * @member {string} date when the entry was completed
 * @member {string} trackerId Tracker the entry is attached to
 */
export default interface TrackerEntry {
  readonly id: string;
  completions: Completion[];
  date: string;
  trackerId: string;
}

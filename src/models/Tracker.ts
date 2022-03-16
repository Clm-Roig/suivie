import TrackerEntry from './TrackerEntry';
import TrackerStatus from './TrackerStatus';
export default interface Tracker {
  beginDate: string;
  dateHidden?: string;
  defaultQuantity?: number;
  duration?: number;
  endDate?: string;
  entries: TrackerEntry[];
  name: string;
  remainingDays?: number;
  status: TrackerStatus;
  unit?: string;
}

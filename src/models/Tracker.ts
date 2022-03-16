import TrackerEntry from './TrackerEntry';
import TrackerStatus from './TrackerStatus';
export default interface Tracker {
  id: string; // uuid v4
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

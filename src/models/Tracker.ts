import TrackerEntry from './TrackerEntry';
import TrackerStatus from './TrackerStatus';
export default interface Tracker {
  beginDate: string;
  defaultQuantity?: number;
  duration?: number;
  endDate?: string;
  entries: TrackerEntry[];
  name: string;
  status: TrackerStatus;
  unit?: string;
}
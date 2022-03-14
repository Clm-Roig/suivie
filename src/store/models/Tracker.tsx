import TrackerEntry from './TrackerEntry';
import TrackerStatus from './TrackerStatus';

class Tracker {
  beginDate: Date = new Date();
  defaultQuantity?: number;
  duration?: number;
  endDate?: Date;
  entries: TrackerEntry[] = [];
  name: string;
  status: TrackerStatus = TrackerStatus.active;
  unit?: string;

  constructor({ name }: Tracker) {
    this.name = name;
  }
}

export default Tracker;

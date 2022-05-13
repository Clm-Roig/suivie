import Tracker from '../../../models/Tracker';

export type TrackerIdAndDate = {
  id: Tracker['id'];
  date?: Date;
};

export type MultipleTrackerIdsAndDate = {
  trackerIds: Array<Tracker['id']>;
  date?: Date;
};

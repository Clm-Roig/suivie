import Tracker from '../../../models/Tracker';

export type TrackerIdAndDate = {
  id: Tracker['id'];
  date?: string;
};

export type MultipleTrackerIdsAndDate = {
  trackerIds: Array<Tracker['id']>;
  date?: string;
};

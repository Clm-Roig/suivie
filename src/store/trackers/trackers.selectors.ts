import { RootState } from '../store';
import Tracker from '../../models/Tracker';
import { addDays, differenceInDays } from 'date-fns';

const selectTrackers = (state: RootState) => {
  const prevTrackers = state.trackers.trackers;
  const newTrackers = prevTrackers.map((t) => {
    let trackerObj = t as Tracker;
    const { beginDate, duration } = trackerObj;
    if (beginDate && duration) {
      const estimatedEndDateObj = addDays(new Date(beginDate), duration);
      const difference = differenceInDays(estimatedEndDateObj, new Date());
      trackerObj = {
        ...trackerObj,
        remainingDays: difference
      };
    }
    return trackerObj;
  });
  return {
    ...state.trackers,
    trackers: newTrackers ? [...newTrackers] : prevTrackers
  };
};

export default selectTrackers;

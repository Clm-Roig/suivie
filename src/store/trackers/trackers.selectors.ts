import { RootState } from '../store';
import Tracker from '../../models/Tracker';
import { formatDuration, intervalToDuration } from 'date-fns';

const selectTrackers = (state: RootState) => {
  const prevTrackers = state.trackers.trackers;
  const newTrackers = prevTrackers?.map((t) => {
    let trackerObj = t as Tracker;
    const { beginDate, duration } = trackerObj;
    if (beginDate && duration) {
      const beginDateObj = new Date(beginDate);
      const estimatedEndDateObj = new Date(beginDate);
      estimatedEndDateObj.setDate(estimatedEndDateObj.getDate() + duration);

      const remainingDuration = intervalToDuration({
        start: beginDateObj,
        end: estimatedEndDateObj
      });

      trackerObj = {
        ...trackerObj,
        remainingDays: Number(formatDuration(remainingDuration, { format: ['days'] }).split(' ')[0])
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

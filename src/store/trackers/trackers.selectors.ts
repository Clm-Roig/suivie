import { RootState } from '../store';
import Tracker from '../../models/Tracker';
import { intervalToDuration } from 'date-fns';

const selectTrackers = (state: RootState) => {
  return {
    ...state.trackers,
    trackers: state.trackers.trackers?.map((t) => {
      const trackerObj = t as Tracker;
      const { beginDate, duration } = trackerObj;
      if (beginDate && duration) {
        const beginDateObj = new Date(beginDate);
        const estimatedEndDateObj = new Date(beginDate);
        estimatedEndDateObj.setDate(estimatedEndDateObj.getDate() + duration);
        trackerObj.remainingDays = intervalToDuration({
          start: beginDateObj,
          end: estimatedEndDateObj
        }).days;
      }
      return trackerObj;
    })
  };
};

export default selectTrackers;

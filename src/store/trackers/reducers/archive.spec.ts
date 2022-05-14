import { isSameDay, subDays } from 'date-fns';

import TrackerStatus from '../../../models/TrackerStatus';
import {
  testTracker1,
  testTracker1Id,
  testTracker2,
  testTracker2Id,
  testTracker3
} from '../FAKE_DATA';
import trackersReducer, { archiveTracker, archiveTrackers, initialState } from '../trackersSlice';

const tenDaysAgo = subDays(new Date(), 10);

describe('trackers reducer', () => {
  describe('Archive a tracker', () => {
    it('should archive a tracker and set its endDate ten days ago.', () => {
      const finalState = trackersReducer(
        {
          ...initialState,
          trackers: [{ ...testTracker1, status: TrackerStatus.ACTIVE }]
        },
        archiveTracker({ id: testTracker1.id, date: tenDaysAgo })
      );
      const t1 = finalState.trackers.find((t) => t.id === testTracker1Id)!;

      expect(isSameDay(new Date(t1.endDate!), tenDaysAgo)).toBeTruthy();
      expect(t1.status).toBe(TrackerStatus.ARCHIVED);
    });
    it('should archive multiple trackers and set its endDate ten days ago', () => {
      const finalState = trackersReducer(
        {
          ...initialState,
          trackers: [
            { ...testTracker1, status: TrackerStatus.ACTIVE },
            { ...testTracker2, isDoneForToday: true },
            { ...testTracker3, status: TrackerStatus.ACTIVE }
          ]
        },
        archiveTrackers({ trackerIds: [testTracker1.id, testTracker2.id], date: tenDaysAgo })
      );
      const t1 = finalState.trackers.find((t) => t.id === testTracker1Id)!;
      const t2 = finalState.trackers.find((t) => t.id === testTracker2Id)!;

      expect(isSameDay(new Date(t1.endDate!), tenDaysAgo)).toBeTruthy();
      expect(isSameDay(new Date(t2.endDate!), tenDaysAgo)).toBeTruthy();
      expect(t1.status).toBe(TrackerStatus.ARCHIVED);
      expect(t2.isDoneForToday).toBeTruthy();
    });
  });
});

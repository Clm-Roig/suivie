import { isSameDay } from 'date-fns';

import SliceStatus from '../../../models/SliceStatus';
import TrackerStatus from '../../../models/TrackerStatus';
import {
  testTracker1,
  testTracker1Id,
  testTracker2,
  testTracker2Id,
  testTracker3
} from '../FAKE_DATA';
import trackersReducer, { archiveTracker, archiveTrackers } from '../trackersSlice';

describe('trackers reducer', () => {
  describe('Archive a tracker', () => {
    it('should archive a tracker and set its endDate', () => {
      const finalState = trackersReducer(
        {
          error: {},
          status: SliceStatus.idle,
          trackers: [
            { ...testTracker1, status: TrackerStatus.active },
            { ...testTracker2, isDoneForToday: true }
          ]
        },
        archiveTracker(testTracker1.id)
      );
      const t1 = finalState.trackers.find((t) => t.id === testTracker1Id)!;
      const t2 = finalState.trackers.find((t) => t.id === testTracker2Id)!;
      expect(isSameDay(new Date(t1.endDate!), new Date())).toBeTruthy();
      expect(t1.status).toBe(TrackerStatus.archived);
      expect(t2.isDoneForToday).toBeTruthy();
    });
    it('should archive multiple trackers and set its endDate', () => {
      const finalState = trackersReducer(
        {
          error: {},
          status: SliceStatus.idle,
          trackers: [
            { ...testTracker1, status: TrackerStatus.active },
            { ...testTracker2, isDoneForToday: true },
            { ...testTracker3, status: TrackerStatus.active }
          ]
        },
        archiveTrackers([testTracker1.id, testTracker2.id])
      );
      const t1 = finalState.trackers.find((t) => t.id === testTracker1Id)!;
      const t2 = finalState.trackers.find((t) => t.id === testTracker2Id)!;
      expect(isSameDay(new Date(t1.endDate!), new Date())).toBeTruthy();
      expect(isSameDay(new Date(t2.endDate!), new Date())).toBeTruthy();
      expect(t1.status).toBe(TrackerStatus.archived);
      expect(t2.isDoneForToday).toBeTruthy();
    });
  });
});

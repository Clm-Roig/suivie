import SliceStatus from '../../../models/SliceStatus';
import TrackerStatus from '../../../models/TrackerStatus';
import {
  testTracker1,
  testTracker1Id,
  testTracker2,
  testTracker2Id,
  testTracker3
} from '../FAKE_DATA';
import trackersReducer, { unarchiveTrackers } from '../trackersSlice';

describe('trackers reducer', () => {
  describe('Unarchive trackers', () => {
    it('should unarchive a tracker and set its endDate to undefined', () => {
      const finalState = trackersReducer(
        {
          error: {},
          status: SliceStatus.idle,
          trackers: [
            { ...testTracker1, status: TrackerStatus.active },
            { ...testTracker2, status: TrackerStatus.done },
            { ...testTracker3, status: TrackerStatus.archived }
          ]
        },
        unarchiveTrackers([testTracker1.id, testTracker2.id])
      );
      const t1 = finalState.trackers.find((t) => t.id === testTracker1Id)!;
      const t2 = finalState.trackers.find((t) => t.id === testTracker2Id)!;
      expect(t1.endDate).toBeUndefined();
      expect(t1.status).toBe(TrackerStatus.active);
      expect(t2.endDate).toBeUndefined();
      expect(t2.status).toBe(TrackerStatus.active);
    });
  });
});

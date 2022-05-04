import SliceStatus from '../../../models/SliceStatus';
import TrackerStatus from '../../../models/TrackerStatus';
import { testTracker1, testTracker1Id } from '../FAKE_DATA';
import trackersReducer, { markTrackerAsActive } from '../trackersSlice';

describe('trackers reducer', () => {
  describe('Mark a tracker as active', () => {
    it('should mark a tracker as active', () => {
      const finalState = trackersReducer(
        {
          error: {},
          status: SliceStatus.idle,
          trackers: [{ ...testTracker1, status: TrackerStatus.archived }]
        },
        markTrackerAsActive(testTracker1.id)
      );
      const t1 = finalState.trackers.find((t) => t.id === testTracker1Id)!;
      expect(t1.status).toEqual(TrackerStatus.active);
      expect(t1.endDate).toBeUndefined();
    });
  });
});

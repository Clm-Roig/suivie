import SliceStatus from '../../../models/SliceStatus';
import TrackerStatus from '../../../models/TrackerStatus';
import { testTracker1, testTracker1Id } from '../FAKE_DATA';
import trackersReducer, { markTrackerAsDone } from '../trackersSlice';

describe('trackers reducer', () => {
  describe('Mark a tracker as done', () => {
    it('should mark a tracker as done', () => {
      const finalState = trackersReducer(
        {
          error: {},
          status: SliceStatus.idle,
          trackers: [testTracker1]
        },
        markTrackerAsDone(testTracker1.id)
      );
      const t1 = finalState.trackers.find((t) => t.id === testTracker1Id)!;
      expect(t1.status).toEqual(TrackerStatus.done);
    });
  });
});

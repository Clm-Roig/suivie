import SliceStatus from '../../../models/SliceStatus';
import { testTracker1, testTracker1Id, testTracker2, testTracker2Id } from '../FAKE_DATA';
import trackersReducer, { createTracker } from '../trackersSlice';

describe('trackers reducer', () => {
  describe('Create tracker', () => {
    it('should handle a tracker creation', () => {
      const finalState = trackersReducer(
        { error: {}, status: SliceStatus.idle, trackers: [testTracker1] },
        createTracker(testTracker2)
      );
      const t1 = finalState.trackers.find((t) => t.id === testTracker1Id)!;
      const t2 = finalState.trackers.find((t) => t.id === testTracker2Id)!;
      expect(finalState.trackers.length).toEqual(2);
      expect(t1).toEqual(testTracker1);
      expect(t2).toEqual(testTracker2);
    });
  });
});

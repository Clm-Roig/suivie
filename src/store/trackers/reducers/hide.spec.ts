import SliceStatus from '../../../models/SliceStatus';
import { testTracker1, testTracker1Id, testTracker2, testTracker2Id } from '../FAKE_DATA';
import trackersReducer, { hideTracker } from '../trackersSlice';

describe('trackers reducer', () => {
  describe('Hide tracker', () => {
    it('should hide a tracker', () => {
      const finalState = trackersReducer(
        { error: {}, status: SliceStatus.idle, trackers: [testTracker1, testTracker2] },
        hideTracker(testTracker1.id)
      );
      const t1 = finalState.trackers.find((t) => t.id === testTracker1Id)!;
      const t2 = finalState.trackers.find((t) => t.id === testTracker2Id)!;
      expect(t1.dateHidden).not.toBeUndefined();
      expect(t2.dateHidden).toBeUndefined();
    });
  });
});

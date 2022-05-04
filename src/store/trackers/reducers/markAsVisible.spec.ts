import SliceStatus from '../../../models/SliceStatus';
import { testTracker1, testTracker1Id, testTracker2, testTracker2Id } from '../FAKE_DATA';
import trackersReducer, { markTrackerAsVisible } from '../trackersSlice';

describe('trackers reducer', () => {
  describe('Mark a tracker as visible', () => {
    it('should mark a tracker as visible', () => {
      const finalState = trackersReducer(
        {
          error: {},
          status: SliceStatus.idle,
          trackers: [
            { ...testTracker1, dateHidden: new Date().toString() },
            { ...testTracker2, dateHidden: new Date().toString() }
          ]
        },
        markTrackerAsVisible(testTracker1.id)
      );
      const t1 = finalState.trackers.find((t) => t.id === testTracker1Id)!;
      const t2 = finalState.trackers.find((t) => t.id === testTracker2Id)!;
      expect(t1.dateHidden).toBeUndefined();
      expect(t2.dateHidden).toBeDefined();
    });
  });
});

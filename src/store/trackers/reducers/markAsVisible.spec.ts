import SliceStatus from '../../../models/SliceStatus';
import Tracker from '../../../models/Tracker';
import { testTracker1, testTracker1Id, testTracker2, testTracker2Id } from '../FAKE_DATA';
import trackersReducer, { markTrackerAsVisible } from '../trackersSlice';

const isVisible = (tracker: Tracker) => tracker.dateHidden === undefined;

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
      expect(isVisible(t1)).toBeTruthy();
      expect(!isVisible(t2)).toBeTruthy();
    });
  });
});

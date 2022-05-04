import SliceStatus from '../../../models/SliceStatus';
import {
  testTracker1,
  testTracker1Id,
  testTracker2,
  testTracker2Id,
  testTracker3
} from '../FAKE_DATA';
import trackersReducer, { deleteTracker, deleteTrackers } from '../trackersSlice';

describe('trackers reducer', () => {
  describe('Delete tracker', () => {
    it('should handle a tracker deletion', () => {
      const finalState = trackersReducer(
        { error: {}, status: SliceStatus.idle, trackers: [testTracker1] },
        deleteTracker(testTracker1Id)
      );
      expect(finalState.trackers.length).toEqual(0);
    });
    it('should handle multiple tracker deletions', () => {
      const finalState = trackersReducer(
        {
          error: {},
          status: SliceStatus.idle,
          trackers: [testTracker1, testTracker2, testTracker3]
        },
        deleteTrackers([testTracker1Id, testTracker2Id])
      );
      expect(finalState.trackers.length).toEqual(1);
    });
  });
});

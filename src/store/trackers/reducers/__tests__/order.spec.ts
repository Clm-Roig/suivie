import {
  testTracker1,
  testTracker1Id,
  testTracker2,
  testTracker2Id,
  testTracker3,
  testTracker3Id
} from '../../FAKE_DATA';
import trackersReducer, { initialState, orderTracker } from '../../trackersSlice';

describe('trackers reducer', () => {
  describe('Move a tracker', () => {
    it('should not do anything if the new index is the same as the previous one', () => {
      const finalState = trackersReducer(
        {
          ...initialState,
          trackers: [testTracker1, testTracker2, testTracker3]
        },
        orderTracker({ trackerIdSource: testTracker1Id, trackerIdDestination: testTracker1Id })
      );
      const { trackers: trackers } = finalState;
      expect(trackers[0].id).toBe(testTracker1Id);
      expect(trackers[1].id).toBe(testTracker2Id);
      expect(trackers[2].id).toBe(testTracker3Id);
    });
    it('should move the first tracker from the start to the end.', () => {
      const finalState = trackersReducer(
        {
          ...initialState,
          trackers: [testTracker1, testTracker2, testTracker3]
        },
        orderTracker({ trackerIdSource: testTracker1Id, trackerIdDestination: testTracker3Id })
      );
      const { trackers: trackers } = finalState;
      expect(trackers[0].id).toBe(testTracker2Id);
      expect(trackers[1].id).toBe(testTracker3Id);
      expect(trackers[2].id).toBe(testTracker1Id);
    });
    it('should move the last tracker from the end to the start.', () => {
      const finalState = trackersReducer(
        {
          ...initialState,
          trackers: [testTracker1, testTracker2, testTracker3]
        },
        orderTracker({ trackerIdSource: testTracker3Id, trackerIdDestination: testTracker1Id })
      );
      const { trackers: trackers } = finalState;
      expect(trackers[0].id).toBe(testTracker3Id);
      expect(trackers[1].id).toBe(testTracker1Id);
      expect(trackers[2].id).toBe(testTracker2Id);
    });
  });
});

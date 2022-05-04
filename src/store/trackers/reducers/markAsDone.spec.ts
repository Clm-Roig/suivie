import SliceStatus from '../../../models/SliceStatus';
import Tracker from '../../../models/Tracker';
import TrackerStatus from '../../../models/TrackerStatus';
import {
  testTracker1,
  testTracker1Id,
  testTracker2,
  testTracker3,
  testTracker3Id
} from '../FAKE_DATA';
import trackersReducer, { markTrackerAsDone, markTrackersAsDone } from '../trackersSlice';

const isDone = (tracker: Tracker) =>
  tracker.status === TrackerStatus.done && tracker.endDate !== undefined;

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
      expect(isDone(t1)).toBeTruthy();
    });
  });
  describe('Mark multiple trackers as done', () => {
    it('should mark multiple trackers as done', () => {
      const finalState = trackersReducer(
        {
          error: {},
          status: SliceStatus.idle,
          trackers: [
            { ...testTracker1, status: TrackerStatus.archived },
            { ...testTracker2, status: TrackerStatus.done },
            { ...testTracker3, status: TrackerStatus.active, endDate: new Date().toString() }
          ]
        },
        markTrackersAsDone([testTracker1Id, testTracker3Id])
      );
      const t1 = finalState.trackers.find((t) => t.id === testTracker1Id)!;
      const t3 = finalState.trackers.find((t) => t.id === testTracker3Id)!;
      expect(isDone(t1)).toBeTruthy();
      expect(isDone(t3)).toBeTruthy();
    });
  });
});

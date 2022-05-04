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
import trackersReducer, { markTrackerAsActive, markTrackersAsActive } from '../trackersSlice';

const isActive = (tracker: Tracker) =>
  tracker.status === TrackerStatus.active && tracker.endDate === undefined;

describe('trackers reducer', () => {
  describe('Mark a tracker as active', () => {
    it('should mark a tracker as active', () => {
      const finalState = trackersReducer(
        {
          error: {},
          status: SliceStatus.idle,
          trackers: [
            { ...testTracker1, status: TrackerStatus.archived, endDate: new Date().toString() }
          ]
        },
        markTrackerAsActive(testTracker1.id)
      );
      const t1 = finalState.trackers.find((t) => t.id === testTracker1Id)!;
      expect(isActive(t1)).toBeTruthy();
    });
  });
  describe('Mark multiple trackers as active', () => {
    it('should mark multiple trackers as active', () => {
      const finalState = trackersReducer(
        {
          error: {},
          status: SliceStatus.idle,
          trackers: [
            { ...testTracker1, status: TrackerStatus.archived },
            { ...testTracker2, status: TrackerStatus.active },
            {
              ...testTracker3,
              isDoneForToday: true,
              status: TrackerStatus.archived,
              endDate: new Date().toString()
            }
          ]
        },
        markTrackersAsActive([testTracker1Id, testTracker3Id])
      );
      const t1 = finalState.trackers.find((t) => t.id === testTracker1Id)!;
      const t3 = finalState.trackers.find((t) => t.id === testTracker3Id)!;
      expect(isActive(t1)).toBeTruthy();
      expect(isActive(t3)).toBeTruthy();
    });
  });
});

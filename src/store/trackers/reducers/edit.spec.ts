import Tracker from '../../../models/Tracker';
import TrackerStatus from '../../../models/TrackerStatus';
import { testTracker1, testTracker1Id } from '../FAKE_DATA';
import trackersReducer, { editTracker, initialState } from '../trackersSlice';

describe('trackers reducer', () => {
  describe('Edit a tracker', () => {
    it('should edit a tracker', () => {
      const newValues: Tracker = {
        id: testTracker1Id,
        name: 'New name',
        beginDate: new Date().toString(),
        entries: [],
        frequency: 1,
        isDoneForToday: false,
        requiredCompletions: [
          {
            quantity: 3,
            unit: 'things'
          }
        ],
        status: TrackerStatus.ARCHIVED
      };
      const finalState = trackersReducer(
        {
          ...initialState,
          trackers: [{ ...testTracker1 }]
        },
        editTracker(newValues)
      );
      const t1 = finalState.trackers.find((t) => t.id === testTracker1Id)!;
      const keys = Object.keys(newValues);
      keys.forEach((key) => {
        expect(t1[key as keyof Tracker]).toEqual(newValues[key as keyof Tracker]);
      });
      expect(t1.status).toBe(TrackerStatus.ARCHIVED);
    });
  });
});

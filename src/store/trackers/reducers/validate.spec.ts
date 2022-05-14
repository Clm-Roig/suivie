import { isSameDay, subDays } from 'date-fns';

import { testTracker1, testTracker1Id } from '../FAKE_DATA';
import trackersReducer, {
  completelyValidate,
  customValidate,
  initialState
} from '../trackersSlice';

const sevenDaysAgo = subDays(new Date(), 7);

describe('trackers reducer', () => {
  describe('Tracker validation', () => {
    it('should handle a tracker complete validation at a given date', () => {
      const finalState = trackersReducer(
        { ...initialState, trackers: [testTracker1] },
        completelyValidate({ id: testTracker1Id, date: sevenDaysAgo })
      );

      const res = finalState.trackers[0];
      expect(res).toBeDefined();
      const entries = res.entries;
      expect(entries.length).toEqual(1);
      const entry = entries[0];
      expect(entry.completions).toEqual(testTracker1.requiredCompletions);
      expect(entry.trackerId).toEqual(testTracker1.id);
      expect(isSameDay(new Date(entry.date), sevenDaysAgo)).toBeTruthy();
    });

    it('should handle a tracker custom validation at a given date', () => {
      const partialCompletions = [
        {
          quantity: 5,
          unit: 'push-ups'
        },
        {
          quantity: 20,
          unit: 'squats'
        }
      ];
      const finalState = trackersReducer(
        { ...initialState, trackers: [testTracker1] },
        customValidate({ id: testTracker1Id, completions: partialCompletions, date: sevenDaysAgo })
      );

      const res = finalState.trackers[0];
      expect(res).toBeDefined();
      const entries = res.entries;
      expect(entries.length).toEqual(1);
      const entry = entries[0];
      expect(entry.completions).toEqual(partialCompletions);
      expect(entry.trackerId).toEqual(testTracker1.id);
      expect(isSameDay(new Date(entry.date), sevenDaysAgo)).toBeTruthy();
    });
  });
});

import { isSameDay, subDays } from 'date-fns';

import makeFakeCompletion from '../../../../models/factories/makeFakeCompletion';
import { testTracker1, testTracker1Id } from '../../FAKE_DATA';
import trackersReducer, {
  completelyValidate,
  customValidate,
  initialState
} from '../../trackersSlice';

const sevenDaysAgo = subDays(new Date(), 7);

describe('trackers reducer', () => {
  describe('Tracker validation', () => {
    it('should handle a tracker complete validation at a given date', () => {
      const finalState = trackersReducer(
        { ...initialState, trackers: [testTracker1] },
        completelyValidate({ id: testTracker1Id, date: sevenDaysAgo.toString() })
      );

      const res = finalState.trackers[0];
      const { doneDays, entries } = res;
      const doneDay = doneDays[0];
      const entry = entries[0];

      expect(doneDays.length).toEqual(1);
      expect(isSameDay(sevenDaysAgo, new Date(doneDay))).toBeTruthy();

      expect(entries.length).toEqual(1);
      expect(entry.completions).toEqual(testTracker1.requiredCompletions);
      expect(entry.trackerId).toEqual(testTracker1.id);
      expect(isSameDay(new Date(entry.date), sevenDaysAgo)).toBeTruthy();
    });

    it('should handle a tracker partial custom validation at a given date', () => {
      const partialCompletions = [
        makeFakeCompletion({
          quantity: 5,
          unit: 'push-ups'
        }),
        makeFakeCompletion({
          quantity: 20,
          unit: 'squats'
        })
      ];
      const finalState = trackersReducer(
        { ...initialState, trackers: [testTracker1] },
        customValidate({
          id: testTracker1Id,
          completions: partialCompletions,
          date: sevenDaysAgo.toString()
        })
      );

      const res = finalState.trackers[0];
      const { doneDays, entries } = res;
      const entry = entries[0];
      expect(doneDays.length).toEqual(0);
      expect(entries.length).toEqual(1);
      expect(entry.completions).toEqual(partialCompletions);
      expect(entry.trackerId).toEqual(testTracker1.id);
      expect(isSameDay(new Date(entry.date), sevenDaysAgo)).toBeTruthy();
    });

    it('should handle a tracker more than complete custom validation at a given date', () => {
      const partialCompletions = [
        makeFakeCompletion({
          quantity: 20,
          unit: 'push-ups'
        }),
        makeFakeCompletion({
          quantity: 30,
          unit: 'squats'
        })
      ];
      const finalState = trackersReducer(
        { ...initialState, trackers: [testTracker1] },
        customValidate({
          id: testTracker1Id,
          completions: partialCompletions,
          date: sevenDaysAgo.toString()
        })
      );

      const res = finalState.trackers[0];
      const { doneDays, entries } = res;
      const doneDay = doneDays[0];
      const entry = entries[0];
      expect(doneDays.length).toEqual(1);
      expect(isSameDay(new Date(doneDay), sevenDaysAgo)).toBeTruthy();
      expect(entries.length).toEqual(1);
      expect(entry.completions).toEqual(partialCompletions);
      expect(entry.trackerId).toEqual(testTracker1.id);
      expect(isSameDay(new Date(entry.date), sevenDaysAgo)).toBeTruthy();
    });
  });
});

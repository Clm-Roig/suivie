import SliceStatus from '../../../models/SliceStatus';
import { testTracker1, testTracker1Id } from '../FAKE_DATA';
import trackersReducer, { completelyValidate, customValidate } from '../trackersSlice';

describe('trackers reducer', () => {
  describe('Tracker validation', () => {
    it('should handle a tracker complete validation', () => {
      const finalState = trackersReducer(
        { error: {}, status: SliceStatus.idle, trackers: [testTracker1] },
        completelyValidate(testTracker1Id)
      );

      const res = finalState.trackers[0];
      expect(res).toBeDefined();
      const entries = res.entries;
      expect(entries.length).toEqual(1);
      const entry = entries[0];
      expect(entry.completions).toEqual(testTracker1.requiredCompletions);
      expect(entry.trackerId).toEqual(testTracker1.id);
    });

    it('should handle a tracker custom validation', () => {
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
        { error: {}, status: SliceStatus.idle, trackers: [testTracker1] },
        customValidate({ id: testTracker1Id, completions: partialCompletions })
      );

      const res = finalState.trackers[0];
      expect(res).toBeDefined();
      const entries = res.entries;
      expect(entries.length).toEqual(1);
      const entry = entries[0];
      expect(entry.completions).toEqual(partialCompletions);
      expect(entry.trackerId).toEqual(testTracker1.id);
    });
  });
});

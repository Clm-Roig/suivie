import SliceStatus from '../../models/SliceStatus';
import { testTracker1, testTracker1Id, testTracker2, testTracker2Id } from './FAKE_DATA';
import trackersReducer, {
  completelyValidate,
  createTracker,
  customValidate,
  deleteTracker,
  hideTracker,
  makeTrackerVisible
} from './trackersSlice';

describe('trackers reducer', () => {
  it('should handle initial state', () => {
    expect(trackersReducer(undefined, { type: 'unknown' })).toEqual({
      error: {},
      status: SliceStatus.idle,
      trackers: []
    });
  });

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
  describe('Tracker deletion', () => {
    it('should handle a tracker deletion', () => {
      const finalState = trackersReducer(
        { error: {}, status: SliceStatus.idle, trackers: [testTracker1] },
        deleteTracker(testTracker1Id)
      );
      expect(finalState.trackers.length).toEqual(0);
    });
  });
  describe('Tracker creation', () => {
    it('should handle a tracker creation', () => {
      const finalState = trackersReducer(
        { error: {}, status: SliceStatus.idle, trackers: [testTracker1] },
        createTracker(testTracker2)
      );
      const t1 = finalState.trackers.find((t) => t.id === testTracker1Id)!;
      const t2 = finalState.trackers.find((t) => t.id === testTracker2Id)!;
      expect(finalState.trackers.length).toEqual(2);
      expect(t1).toEqual(testTracker1);
      expect(t2).toEqual(testTracker2);
    });
  });
  describe('Hide tracker', () => {
    it('should hide a tracker', () => {
      const finalState = trackersReducer(
        { error: {}, status: SliceStatus.idle, trackers: [testTracker1, testTracker2] },
        hideTracker(testTracker1.id)
      );
      const t1 = finalState.trackers.find((t) => t.id === testTracker1Id)!;
      const t2 = finalState.trackers.find((t) => t.id === testTracker2Id)!;
      expect(t1.dateHidden).not.toBeUndefined();
      expect(t2.dateHidden).toBeUndefined();
    });
  });
  describe('Make a tracker visible', () => {
    it('should make a tracker visible', () => {
      const finalState = trackersReducer(
        {
          error: {},
          status: SliceStatus.idle,
          trackers: [
            { ...testTracker1, dateHidden: new Date().toString() },
            { ...testTracker2, dateHidden: new Date().toString() }
          ]
        },
        makeTrackerVisible(testTracker1.id)
      );
      const t1 = finalState.trackers.find((t) => t.id === testTracker1Id)!;
      const t2 = finalState.trackers.find((t) => t.id === testTracker2Id)!;
      expect(t1.dateHidden).toBeUndefined();
      expect(t2.dateHidden).toBeDefined();
    });
  });
});

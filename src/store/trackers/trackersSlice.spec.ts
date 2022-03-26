import SliceStatus from '../../models/SliceStatus';
import trackersReducer, {
  createTracker,
  completelyValidate,
  customValidate,
  deleteTracker
} from './trackersSlice';
import { testTracker1Id, testTracker2Id, testTracker1, testTracker2 } from './FAKE_DATA';

describe('trackers reducer', () => {
  it('should handle initial state', () => {
    expect(trackersReducer(undefined, { type: 'unknown' })).toEqual({
      error: {},
      status: SliceStatus.idle,
      trackers: []
    });
  });
  it('should handle a tracker complete validation', () => {
    const finalState = trackersReducer(
      { error: {}, status: SliceStatus.idle, trackers: [testTracker1] },
      completelyValidate(testTracker1Id)
    );

    const res = finalState.trackers[0];
    expect(res).toBeDefined();
    const entries = res?.entries;
    expect(entries?.length).toEqual(1);
    const entry = entries?.[0];
    expect(entry?.completions).toEqual(testTracker1.requiredCompletions);
    expect(entry?.trackerId).toEqual(testTracker1.id);
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
    const entries = res?.entries;
    expect(entries?.length).toEqual(1);
    const entry = entries?.[0];
    expect(entry?.completions).toEqual(partialCompletions);
    expect(entry?.trackerId).toEqual(testTracker1.id);
  });
  it('should handle a tracker deletion', () => {
    const finalState = trackersReducer(
      { error: {}, status: SliceStatus.idle, trackers: [testTracker1] },
      deleteTracker(testTracker1Id)
    );
    expect(finalState.trackers.length).toEqual(0);
  });
  it('should handle a tracker creation', () => {
    const finalState = trackersReducer(
      { error: {}, status: SliceStatus.idle, trackers: [testTracker1] },
      createTracker(testTracker2)
    );
    expect(finalState.trackers.length).toEqual(2);
    expect(finalState.trackers.find((t) => t.id === testTracker1Id)).toEqual(testTracker1);
    expect(finalState.trackers.find((t) => t.id === testTracker2Id)).toEqual(testTracker2);
  });
});

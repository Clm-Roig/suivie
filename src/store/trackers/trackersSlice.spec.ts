import SliceStatus from '../../models/SliceStatus';
import trackersReducer, { completelyValidate, deleteTracker } from './trackersSlice';
import { testTracker1Id, testTracker1 } from './FAKE_DATA';

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
  it('should handle a tracker deletion', () => {
    const finalState = trackersReducer(
      { error: {}, status: SliceStatus.idle, trackers: [testTracker1] },
      deleteTracker(testTracker1Id)
    );
    expect(finalState.trackers.length).toEqual(0);
  });
});

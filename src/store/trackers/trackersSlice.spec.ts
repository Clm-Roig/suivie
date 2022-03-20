import SliceStatus from '../../models/SliceStatus';
import trackersReducer, { completelyValidate, deleteTracker } from './trackersSlice';
import Tracker from '../../models/Tracker';
import TrackerStatus from '../../models/TrackerStatus';
import { subDays } from 'date-fns';

const tracker1Id = '123e4567-e89b-12d3-a456-426614174000';
const tracker1: Tracker = {
  id: tracker1Id,
  beginDate: subDays(new Date(), 3).toString(),
  duration: 13,
  name: 'Musculation',
  remainingDays: 10,
  requiredCompletions: [
    {
      quantity: 10,
      unit: 'push-ups'
    },
    {
      quantity: 15,
      unit: 'squats'
    }
  ],
  status: TrackerStatus.active,
  entries: []
};

describe('counter reducer', () => {
  it('should handle initial state', () => {
    expect(trackersReducer(undefined, { type: 'unknown' })).toEqual({
      error: {},
      status: SliceStatus.idle,
      trackers: []
    });
  });
  it('should handle a tracker complete validation', () => {
    const finalState = trackersReducer(
      { error: {}, status: SliceStatus.idle, trackers: [tracker1] },
      completelyValidate(tracker1Id)
    );

    const res = finalState.trackers[0];
    expect(res).toBeDefined();
    const entries = res?.entries;
    expect(entries?.length).toEqual(1);
    const entry = entries?.[0];
    expect(entry?.completions).toEqual(tracker1.requiredCompletions);
    expect(entry?.trackerId).toEqual(tracker1.id);
  });
  it('should handle a tracker deletion', () => {
    const finalState = trackersReducer(
      { error: {}, status: SliceStatus.idle, trackers: [tracker1] },
      deleteTracker(tracker1Id)
    );
    expect(finalState.trackers.length).toEqual(0);
  });
});

import SliceStatus from '../../models/SliceStatus';
import trackersReducer, { TrackersState, fetchAllTrackers } from './trackersSlice';

describe('counter reducer', () => {
  const initialState: TrackersState = {
    error: {},
    status: SliceStatus.idle,
    trackers: undefined
  };
  it('should handle initial state', () => {
    expect(trackersReducer(undefined, { type: 'unknown' })).toEqual({
      error: {},
      status: SliceStatus.idle,
      trackers: undefined
    });
  });

  it('should handle fetch all trackers pending', () => {
    const actual = trackersReducer(initialState, fetchAllTrackers.pending);
    expect(actual.status).toEqual(SliceStatus.loading);
    expect(actual.error).toEqual({});
  });

  it('should handle fetch all trackers error', () => {
    const actual = trackersReducer(initialState, fetchAllTrackers.rejected);
    expect(actual.status).toEqual(SliceStatus.failed);
    expect(actual.error).not.toEqual({});
  });
});

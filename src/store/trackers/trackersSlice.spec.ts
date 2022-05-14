import SliceStatus from '../../models/SliceStatus';
import trackersReducer from './trackersSlice';

describe('trackers reducer', () => {
  it('should handle initial state', () => {
    expect(trackersReducer(undefined, { type: 'unknown' })).toEqual({
      error: {},
      status: SliceStatus.IDLE,
      trackers: []
    });
  });
});

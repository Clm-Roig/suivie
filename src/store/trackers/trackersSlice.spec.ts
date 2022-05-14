import { isSameMinute } from 'date-fns';

import SliceStatus from '../../models/SliceStatus';
import trackersReducer from './trackersSlice';

describe('trackers reducer', () => {
  it('should handle initial state', () => {
    const state = trackersReducer(undefined, { type: 'unknown' });
    expect(state.error).toEqual({});
    expect(isSameMinute(new Date(state.selectedDate), new Date())).toBeTruthy();
    expect(state.status).toEqual(SliceStatus.IDLE);
    expect(state.trackers).toEqual([]);
  });
});

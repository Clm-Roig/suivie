import { isSameDay, isToday, subDays } from 'date-fns';

import SliceStatus from '../../../models/SliceStatus';
import { testTracker1, testTracker1Id } from '../FAKE_DATA';
import trackersReducer, { hideTracker } from '../trackersSlice';

describe('trackers reducer', () => {
  describe('Hide tracker', () => {
    it('should hide a tracker today', () => {
      const finalState = trackersReducer(
        { error: {}, status: SliceStatus.IDLE, trackers: [testTracker1] },
        hideTracker({ id: testTracker1.id })
      );
      const t1 = finalState.trackers.find((t) => t.id === testTracker1Id)!;
      expect(isToday(new Date(t1.dateHidden!))).toBeTruthy();
    });
    it('should hide a tracker 5 days ago', () => {
      const fiveDaysAgo = subDays(new Date(), 5);
      const finalState = trackersReducer(
        { error: {}, status: SliceStatus.IDLE, trackers: [testTracker1] },
        hideTracker({ id: testTracker1.id, date: fiveDaysAgo })
      );
      const t1 = finalState.trackers.find((t) => t.id === testTracker1Id)!;
      expect(isSameDay(new Date(t1.dateHidden!), fiveDaysAgo)).toBeTruthy();
    });
  });
});

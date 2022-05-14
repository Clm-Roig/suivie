import { subHours } from 'date-fns';

import SliceStatus from '../../../models/SliceStatus';
import { testEntry1, testTracker1, testTracker1Id } from '../FAKE_DATA';
import trackersReducer, { cancelLatestEntry } from '../trackersSlice';

describe('trackers reducer', () => {
  describe('Cancel latest entry validation', () => {
    it('should remove the latest entry of the tracker', () => {
      const t1 = { ...testEntry1, date: subHours(new Date(), 5).toString() };
      const t2 = { ...testEntry1, id: '1234-5678', date: subHours(new Date(), 2).toString() };
      const finalState = trackersReducer(
        {
          error: {},
          status: SliceStatus.IDLE,
          trackers: [
            {
              ...testTracker1,
              entries: [t2, t1]
            }
          ]
        },
        cancelLatestEntry(testTracker1Id)
      );

      const res = finalState.trackers[0];
      expect(res).toBeDefined();
      const entries = res.entries;
      expect(entries.length).toEqual(1);
      const entry1 = entries[0];
      expect(entry1).toEqual(t1);
    });
  });
});

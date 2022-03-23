import SliceStatus from '../../models/SliceStatus';
import Tracker from '../../models/Tracker';
import { createTestStore } from '../createTestStore';
import { RootState } from '../store';
import { selectAllTrackers } from './trackers.selectors';
import { testTracker1, testTracker2 } from './FAKE_DATA';

describe('selectAllTrackers()', () => {
  let state: RootState;
  beforeEach(() => {
    state = createTestStore().getState();
  });

  it('should return trackers with remainingDays set', () => {
    const stateWithTrackers = {
      ...state,
      trackers: {
        ...state.trackers,
        trackers: [testTracker1, testTracker2]
      }
    };
    const { error, status, trackers } = selectAllTrackers(stateWithTrackers);
    expect(error).toEqual({});
    expect(status).toEqual(SliceStatus.idle);
    expect(trackers.length).toEqual(2);
    const tracker2 = trackers[1] as Tracker;
    // begun 10 days ago, duration of 70 days = 60 days remaining but can be 59 depending on the hour of the day
    expect(tracker2.remainingDays).toBeGreaterThanOrEqual(59);
    expect(tracker2.remainingDays).toBeLessThanOrEqual(60);
  });
});

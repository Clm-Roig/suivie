import { subDays } from 'date-fns';
import { v4 } from 'uuid';
import SliceStatus from '../../models/SliceStatus';
import Tracker from '../../models/Tracker';
import TrackerStatus from '../../models/TrackerStatus';
import { createTestStore } from '../createTestStore';
import { RootState } from '../store';
import selectTrackers from './trackers.selectors';

describe('trackers selector', () => {
  let state: RootState;
  beforeEach(() => {
    state = createTestStore().getState();
  });

  it('should return trackers with remainingDays set', () => {
    const stateWithTrackers = {
      ...state,
      trackers: {
        ...state.trackers,
        trackers: [
          {
            id: v4(),
            beginDate: new Date().toString(),
            entries: [],
            name: 'Do',
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
            status: TrackerStatus.active
          },
          {
            id: v4(),
            beginDate: subDays(new Date(), 10).toString(),
            duration: 70,
            entries: [],
            name: 'Eat',
            requiredCompletions: [
              {
                quantity: 6,
                unit: 'vegetables or fruits'
              }
            ],
            status: TrackerStatus.active
          }
        ]
      }
    };
    const { error, status, trackers } = selectTrackers(stateWithTrackers);
    expect(error).toEqual({});
    expect(status).toEqual(SliceStatus.idle);
    expect(trackers.length).toEqual(2);
    const tracker2 = trackers[1] as Tracker;
    // begun 10 days ago, duration of 70 days = 60 days remaining but can be 59 depending on the hour of the day
    expect(tracker2.remainingDays).toBeGreaterThanOrEqual(59);
    expect(tracker2.remainingDays).toBeLessThanOrEqual(60);
  });
});

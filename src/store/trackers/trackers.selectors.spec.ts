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
              },
            ],
            status: TrackerStatus.active
          },
          {
            id: v4(),
            beginDate: new Date().toString(),
            duration: 10,
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
    expect(trackers?.length).toEqual(2);
    const tracker2 = trackers?.[1] as Tracker;
    expect(tracker2.remainingDays).toEqual(10);
  });
});

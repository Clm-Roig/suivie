import SliceStatus from '../../models/SliceStatus';
import Tracker from '../../models/Tracker';
import { createTestStore } from '../createTestStore';
import { RootState } from '../store';
import { selectAllTrackers, selectMonthEntries, selectWeekEntries } from './trackers.selectors';
import { testEntry1, testEntry2, testEntry3, testTracker1, testTracker2 } from './FAKE_DATA';
import { addDays, startOfDay, startOfToday, subDays } from 'date-fns';
import { SEVEN_DAYS_AGO_DATE, SEVEN_DAYS_AGO_STRING } from '../../config/Constants';

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

describe('selectMonthEntries()', () => {
  let state: RootState;
  beforeEach(() => {
    state = createTestStore().getState();
  });

  it('should return entries from the current month', () => {
    const stateWithTrackers = {
      ...state,
      trackers: {
        ...state.trackers,
        trackers: [{ ...testTracker1, entries: [testEntry1] }]
      }
    };
    const monthEntries = selectMonthEntries(stateWithTrackers, new Date(), testTracker1.id);
    expect(monthEntries.length).toEqual(1);
  });
});

describe('selectWeekEntries()', () => {
  let state: RootState;
  beforeEach(() => {
    state = createTestStore().getState();
  });

  it('should return entries from the current week', () => {
    const entries = [
      { ...testEntry3, date: subDays(new Date(), 10).toString() },
      { ...testEntry2, date: SEVEN_DAYS_AGO_STRING },
      { ...testEntry1, date: subDays(new Date(), 1).toString() },
      { ...testEntry1, date: new Date().toString() },
      { ...testEntry3, date: addDays(new Date(), 3).toString() }
    ];

    const stateWithTrackers = {
      ...state,
      trackers: {
        ...state.trackers,
        trackers: [{ ...testTracker1, entries: entries }]
      }
    };

    const weekEntries1 = selectWeekEntries(
      stateWithTrackers,
      startOfDay(SEVEN_DAYS_AGO_DATE),
      testTracker1.id
    );
    expect(weekEntries1.length).toBe(2);
    const weekEntries2 = selectWeekEntries(stateWithTrackers, startOfToday(), testTracker1.id);
    expect(weekEntries2.length).toBe(2);
  });
});

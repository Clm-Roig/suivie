import { addDays, addYears, startOfDay, startOfToday, subDays, subYears } from 'date-fns';

import { SEVEN_DAYS_AGO_DATE, SEVEN_DAYS_AGO_STRING } from '../../config/Constants';
import SliceStatus from '../../models/SliceStatus';
import Tracker from '../../models/Tracker';
import TrackerStatus from '../../models/TrackerStatus';
import { createTestStore } from '../createTestStore';
import { RootState } from '../store';
import {
  testEntry1,
  testEntry2,
  testEntry3,
  testTracker1,
  testTracker2,
  testTracker3
} from './FAKE_DATA';
import {
  selectAllTrackers,
  selectHiddenTrackers,
  selectMonthEntries,
  selectTodoTrackers,
  selectTrackersDone,
  selectWeekEntries,
  selectYearEntries
} from './trackers.selectors';

let state: RootState;
describe('selectAllTrackers()', () => {
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

describe('selectHiddenTrackers()', () => {
  beforeEach(() => {
    state = createTestStore().getState();
  });

  it('should return only hidden trackers', () => {
    const stateWithTrackers = {
      ...state,
      trackers: {
        ...state.trackers,
        trackers: [
          { ...testTracker1, dateHidden: new Date().toString() },
          testTracker2,
          { ...testTracker3, dateHidden: new Date().toString() },
          { ...testTracker3, dateHidden: subDays(new Date(), 2).toString() } // Should not be selected because it was hidden in the pas
        ]
      }
    };
    const { error, status, trackers } = selectHiddenTrackers(stateWithTrackers);
    expect(error).toEqual({});
    expect(status).toEqual(SliceStatus.idle);
    expect(trackers.length).toEqual(2);
    for (const tracker of trackers) {
      expect(tracker.dateHidden).not.toBeUndefined();
    }
  });
});

describe('selectTrackersDone()', () => {
  beforeEach(() => {
    state = createTestStore().getState();
  });

  it('should return only trackers done', () => {
    const stateWithTrackers = {
      ...state,
      trackers: {
        ...state.trackers,
        trackers: [
          { ...testTracker1, status: TrackerStatus.done },
          testTracker2,
          { ...testTracker3, status: TrackerStatus.done }
        ]
      }
    };
    const { error, status, trackers } = selectTrackersDone(stateWithTrackers);
    expect(error).toEqual({});
    expect(status).toEqual(SliceStatus.idle);
    expect(trackers.length).toEqual(2);
    for (const tracker of trackers) {
      expect(tracker.status).toBe(TrackerStatus.done);
    }
  });
});

describe('selectTodoTrackers()', () => {
  beforeEach(() => {
    state = createTestStore().getState();
  });

  it('should return only todo trackers', () => {
    const stateWithTrackers = {
      ...state,
      trackers: {
        ...state.trackers,
        trackers: [
          { ...testTracker1, status: TrackerStatus.archived },
          { ...testTracker2, dateHidden: new Date().toString() },
          { ...testTracker3, status: TrackerStatus.done },
          { ...testTracker3, status: TrackerStatus.active }
        ]
      }
    };
    const { error, status, trackers } = selectTodoTrackers(stateWithTrackers);
    expect(error).toEqual({});
    expect(status).toEqual(SliceStatus.idle);
    expect(trackers.length).toEqual(1);
    for (const tracker of trackers) {
      expect(tracker.dateHidden).toBeUndefined();
      expect(tracker.status).toBe(TrackerStatus.active);
    }
  });
});

describe('selectYearEntries()', () => {
  beforeEach(() => {
    state = createTestStore().getState();
  });

  it('should return entries from the current year', () => {
    const stateWithTrackers = {
      ...state,
      trackers: {
        ...state.trackers,
        trackers: [
          {
            ...testTracker1,
            entries: [
              testEntry1,
              {
                ...testEntry1,
                date: subYears(new Date(), 1).toString()
              },
              {
                ...testEntry1,
                date: addYears(new Date(), 1).toString()
              }
            ]
          },
          { ...testTracker2, entries: [testEntry2] }
        ]
      }
    };
    const yearEntries = selectYearEntries(stateWithTrackers, new Date(), testTracker1.id);
    expect(yearEntries.length).toEqual(1);
  });
  it('should return an empty array (no tracker matching the provided id)', () => {
    const stateWithTrackers = {
      ...state,
      trackers: {
        ...state.trackers,
        trackers: [
          {
            ...testTracker1,
            entries: [testEntry1]
          },
          { ...testTracker2, entries: [testEntry2] }
        ]
      }
    };
    const yearEntries = selectYearEntries(stateWithTrackers, new Date(), 'no-matching-id-123');
    expect(yearEntries.length).toEqual(0);
  });
});

describe('selectMonthEntries()', () => {
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

  it('should return an empty array (no tracker matching the provided id)', () => {
    const stateWithTrackers = {
      ...state,
      trackers: {
        ...state.trackers,
        trackers: [
          {
            ...testTracker1,
            entries: [testEntry1]
          },
          { ...testTracker2, entries: [testEntry2] }
        ]
      }
    };
    const monthEntries = selectMonthEntries(stateWithTrackers, new Date(), 'no-matching-id-123');
    expect(monthEntries.length).toEqual(0);
  });
});

describe('selectWeekEntries()', () => {
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

  it('should return an empty array (no tracker matching the provided id)', () => {
    const stateWithTrackers = {
      ...state,
      trackers: {
        ...state.trackers,
        trackers: [
          {
            ...testTracker1,
            entries: [testEntry1]
          },
          { ...testTracker2, entries: [testEntry2] }
        ]
      }
    };
    const weekEntries = selectWeekEntries(stateWithTrackers, startOfToday(), 'no-matching-id-123');
    expect(weekEntries.length).toEqual(0);
  });
});

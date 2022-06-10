import { addDays, addYears, startOfDay, startOfToday, subDays, subYears } from 'date-fns';

import { SEVEN_DAYS_AGO_DATE, SEVEN_DAYS_AGO_STRING } from '../../../config/Constants';
import SliceStatus from '../../../models/SliceStatus';
import Tracker from '../../../models/Tracker';
import TrackerStatus from '../../../models/TrackerStatus';
import { createTestStore } from '../../createTestStore';
import { RootState } from '../../store';
import {
  testEntry1,
  testEntry2,
  testEntry3,
  testTracker1,
  testTracker2,
  testTracker3,
  testTracker3Id,
  testTracker5
} from '../FAKE_DATA';
import {
  selectAllTrackers,
  selectHiddenTrackers,
  selectMonthEntries,
  selectTodoTrackers,
  selectTrackersDone,
  selectWeekEntries,
  selectYearEntries
} from '../trackers.selectors';
import { computeIfDone } from '../utils';

let state: RootState;
const threeDaysAgo = subDays(new Date(), 3);

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
    expect(status).toEqual(SliceStatus.IDLE);
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
    expect(status).toEqual(SliceStatus.IDLE);
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

  const getState = (state: RootState): RootState => ({
    ...state,
    trackers: {
      ...state.trackers,
      trackers: [
        {
          ...testTracker1,
          isDoneForToday: false,
          status: TrackerStatus.ACTIVE,
          entries: [
            {
              ...testEntry1,
              completions: testTracker1.requiredCompletions,
              date: threeDaysAgo.toString()
            }
          ]
        },
        testTracker2,
        {
          ...testTracker3,
          isDoneForToday: true,
          status: TrackerStatus.ACTIVE,
          entries: [
            {
              id: '1234-540934-absfdsd',
              completions: testTracker3.requiredCompletions,
              date: new Date().toString(),
              trackerId: testTracker3Id
            }
          ]
        },
        testTracker5
      ]
    }
  });

  it('should return only trackers done for today', () => {
    const stateWithTrackers = getState(state);
    const { error, status, trackers } = selectTrackersDone(stateWithTrackers);
    expect(error).toEqual({});
    expect(status).toEqual(SliceStatus.IDLE);
    expect(trackers.length).toEqual(1);
    expect(trackers[0].name).toEqual(testTracker3.name);
  });

  it('should return only trackers done for the specified date, according to the frequency', () => {
    const stateWithTrackers = getState(state);
    const { error, status, trackers } = selectTrackersDone(stateWithTrackers, threeDaysAgo);
    expect(error).toEqual({});
    expect(status).toEqual(SliceStatus.IDLE);
    expect(trackers.length).toEqual(2);
    expect(trackers[0].name).toEqual(testTracker1.name);
    expect(trackers[1].name).toEqual(testTracker5.name); // Done 4 days ago, frequency of 3 days = done 3 days ago
  });
});

describe('selectTodoTrackers()', () => {
  beforeEach(() => {
    state = createTestStore().getState();
  });

  const getState = (state: RootState): RootState => ({
    ...state,
    trackers: {
      ...state.trackers,
      trackers: [
        {
          ...testTracker1,
          entries: [{ ...testEntry1, completions: testTracker1.requiredCompletions }]
        },
        { ...testTracker3, status: TrackerStatus.ARCHIVED },
        {
          ...testTracker1,
          dateHidden: new Date().toString(),
          entries: [
            {
              ...testEntry1,
              completions: testTracker1.requiredCompletions,
              date: threeDaysAgo.toString()
            }
          ]
        },
        { ...testTracker3, status: TrackerStatus.ACTIVE }
      ]
    }
  });

  it('should return only todo trackers for today', () => {
    const stateWithTrackers = getState(state);
    const { error, status, trackers } = selectTodoTrackers(stateWithTrackers);
    expect(error).toEqual({});
    expect(status).toEqual(SliceStatus.IDLE);
    expect(trackers.length).toEqual(1);
    for (const tracker of trackers) {
      expect(tracker.dateHidden).toBeUndefined();
      expect(tracker.status).toBe(TrackerStatus.ACTIVE);
    }
  });

  it('should return only todo trackers 3 days ago', () => {
    const stateWithTrackers = getState(state);
    const { error, status, trackers } = selectTodoTrackers(stateWithTrackers, threeDaysAgo);
    expect(error).toEqual({});
    expect(status).toEqual(SliceStatus.IDLE);
    expect(trackers.length).toEqual(1);
    for (const tracker of trackers) {
      expect(tracker.status).toBe(TrackerStatus.ACTIVE);
      expect(computeIfDone(tracker, threeDaysAgo)).toBeFalsy();
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

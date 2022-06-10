import { addDays, subDays } from 'date-fns';

import TrackerStatus from '../../../models/TrackerStatus';
import { testEntry1, testEntry2, testTracker1, todayEntries, variousEntries } from '../FAKE_DATA';
import {
  computeIfDone,
  computeNewStatus,
  computeRemainingDays,
  formatTrackers,
  getAggregatedCompletions,
  removeArchivedTrackers,
  removeHiddenTrackers
} from '../utils';

describe('getAggregatedCompletions()', () => {
  it('should return the aggregated completions from an entries list', () => {
    expect(getAggregatedCompletions(todayEntries)).toStrictEqual([
      {
        quantity: 10,
        unit: 'x'
      },
      {
        quantity: 16,
        unit: 'y'
      }
    ]);
  });

  it('should return the aggregated completions of today from an entries list', () => {
    expect(getAggregatedCompletions(variousEntries, new Date())).toStrictEqual([
      // Entries 4 & 5 with same quantity (7 & 10)
      {
        quantity: 14,
        unit: 'x'
      },
      {
        quantity: 20,
        unit: 'y'
      }
    ]);
  });
  it('should return the aggregated completions between tw odates from an entries list', () => {
    expect(
      getAggregatedCompletions(variousEntries, subDays(new Date(), 4), addDays(new Date(), 4))
    ).toStrictEqual([
      // All entries
      {
        quantity: 24,
        unit: 'x'
      },
      {
        quantity: 36,
        unit: 'y'
      }
    ]);
  });
});

describe('computeRemainingDays()', () => {
  it('should return the appropriate remaining days', () => {
    expect(computeRemainingDays(subDays(new Date(), 10).toString(), 3)).toBe(-7); // started in the past, finished in the past
    expect(computeRemainingDays(subDays(new Date(), 10).toString(), 50)).toBe(39); // started in the past, finished in the future
    expect(computeRemainingDays(subDays(new Date(), 20).toString(), 20)).toBe(0); // started in the past, finished today
    expect(computeRemainingDays(new Date().toString(), 10)).toBe(9); // started today, finished in the future
  });
});

describe('computeIfDone()', () => {
  it('should be done (enough entries for today)', () => {
    const doneTracker = {
      ...testTracker1,
      entries: [testEntry1, testEntry2]
    };
    expect(computeIfDone(doneTracker)).toBeTruthy();
  });
  it('should be done (no required completions but one entry without completions for today)', () => {
    const doneTracker = {
      ...testTracker1,
      requiredCompletions: [],
      entries: [
        {
          ...testEntry1,
          completions: []
        }
      ]
    };
    expect(computeIfDone(doneTracker)).toBeTruthy();
  });
});

describe('computeNewStatus()', () => {
  it('should be archived (beginDate + duration in the past)', () => {
    const finishedTracker = {
      ...testTracker1,
      beginDate: subDays(new Date(), 10).toString(),
      duration: 9
    };
    expect(computeNewStatus(finishedTracker)).toBe(TrackerStatus.ARCHIVED);
  });
  it('should be archived (remainingDays negative)', () => {
    const finishedTracker = {
      ...testTracker1,
      remainingDays: -5
    };
    expect(computeNewStatus(finishedTracker)).toBe(TrackerStatus.ARCHIVED);
  });
  it('should be active (not enough entry for today)', () => {
    const doneTracker = {
      ...testTracker1,
      entries: [testEntry1]
    };
    expect(computeNewStatus(doneTracker)).toBe(TrackerStatus.ACTIVE);
  });
  it('should be todo (no required completions and no entries for today)', () => {
    const doneTracker = {
      ...testTracker1,
      requiredCompletions: [],
      entries: []
    };
    expect(computeNewStatus(doneTracker)).toBe(TrackerStatus.ACTIVE);
  });
});

describe('remove functions', () => {
  const trackers = [
    {
      ...testTracker1,
      status: TrackerStatus.ARCHIVED
    },
    {
      ...testTracker1,
      isDoneForToday: true
    },
    {
      ...testTracker1,
      dateHidden: new Date().toString(),
      status: TrackerStatus.ACTIVE
    }
  ];
  describe('removeArchivedTrackers()', () => {
    it('should remove the archived trackers', () => {
      expect(removeArchivedTrackers(trackers).length).toBe(2);
      const [, t2, t3] = trackers;
      expect(removeArchivedTrackers(trackers)).toEqual(expect.arrayContaining([t2, t3]));
    });
  });
  describe('removeHiddenTrackers()', () => {
    it('should remove the hidden trackers', () => {
      expect(removeHiddenTrackers(trackers).length).toBe(2);
      const [t1, t2] = trackers;
      expect(removeHiddenTrackers(trackers)).toEqual(expect.arrayContaining([t1, t2]));
    });
  });
});

describe('formatTrackers()', () => {
  it('should format the trackers with appropriate values', () => {
    const trackerWithDate = {
      ...testTracker1,
      dateHidden: subDays(new Date(), 3).toString()
    };
    const trackerWithDateToday = {
      ...testTracker1,
      dateHidden: new Date().toString()
    };
    const trackerWithUndefinedAttributes = {
      ...testTracker1,
      dateHidden: undefined,
      duration: undefined,
      endDate: undefined,
      entries: [],
      remainingDays: undefined,
      requiredCompletions: []
    };
    const res = formatTrackers([
      trackerWithDate,
      trackerWithDateToday,
      trackerWithUndefinedAttributes
    ]);
    expect(res[0].dateHidden).toBeUndefined(); // dateHidden removed because it's in the past
    expect(res[1].dateHidden).toBe(trackerWithDateToday.dateHidden); // dateHidden not removed because it's today
  });
});

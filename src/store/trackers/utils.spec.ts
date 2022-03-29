import { addDays, startOfDay, startOfToday, subDays } from 'date-fns';
import TrackerStatus from '../../models/TrackerStatus';
import {
  computeRemainingDays,
  computeNewStatus,
  removeOverTrackers,
  removeDoneTrackers,
  removeHiddenTrackers,
  formatTrackers,
  getWeekEntries
} from './utils';
import { testTracker1, testEntry1, testEntry2, testEntry3 } from './FAKE_DATA';
import { SEVEN_DAYS_AGO_DATE, SEVEN_DAYS_AGO_STRING } from '../../config/Constants';

describe('computeRemainingDays()', () => {
  it('should return the appropriate remaining days', () => {
    expect(computeRemainingDays(subDays(new Date(), 10).toString(), 3)).toBe(-7); // started in the past, finished in the past
    expect(computeRemainingDays(subDays(new Date(), 10).toString(), 50)).toBe(39); // started in the past, finished in the future
    expect(computeRemainingDays(subDays(new Date(), 20).toString(), 20)).toBe(0); // started in the past, finished today
    expect(computeRemainingDays(new Date().toString(), 10)).toBe(9); // started today, finished in the future
  });
});

describe('computeNewStatus()', () => {
  it('should be over (beginDate + duration in the past)', () => {
    const finishedTracker = {
      ...testTracker1,
      beginDate: subDays(new Date(), 10).toString(),
      duration: 9
    };
    expect(computeNewStatus(finishedTracker)).toBe(TrackerStatus.over);
  });
  it('should be over (remainingDays negative)', () => {
    const finishedTracker = {
      ...testTracker1,
      remainingDays: -5
    };
    expect(computeNewStatus(finishedTracker)).toBe(TrackerStatus.over);
  });
  it('should be active (not enough entry for today)', () => {
    const doneTracker = {
      ...testTracker1,
      entries: [testEntry1]
    };
    expect(computeNewStatus(doneTracker)).toBe(TrackerStatus.active);
  });
  it('should be done (enough entries for today)', () => {
    const doneTracker = {
      ...testTracker1,
      entries: [testEntry1, testEntry2]
    };
    expect(computeNewStatus(doneTracker)).toBe(TrackerStatus.done);
  });
});

describe('remove functions', () => {
  const trackers = [
    {
      ...testTracker1,
      status: TrackerStatus.over
    },
    {
      ...testTracker1,
      status: TrackerStatus.done
    },
    {
      ...testTracker1,
      dateHidden: new Date().toString(),
      status: TrackerStatus.active
    }
  ];
  describe('removeOverTrackers()', () => {
    it('should remove the trackers over', () => {
      expect(removeOverTrackers(trackers).length).toBe(2);
      const [t1, t2, t3] = trackers; // eslint-disable-line @typescript-eslint/no-unused-vars
      expect(removeOverTrackers(trackers)).toEqual(expect.arrayContaining([t2, t3]));
    });
  });
  describe('removeDoneTrackers()', () => {
    it('should remove the trackers over', () => {
      expect(removeDoneTrackers(trackers).length).toBe(2);
      const [t1, t2, t3] = trackers; // eslint-disable-line @typescript-eslint/no-unused-vars
      expect(removeDoneTrackers(trackers)).toEqual(expect.arrayContaining([t1, t3]));
    });
  });
  describe('removeHiddenTrackers()', () => {
    it('should remove the trackers over', () => {
      expect(removeHiddenTrackers(trackers).length).toBe(2);
      const [t1, t2, t3] = trackers; // eslint-disable-line @typescript-eslint/no-unused-vars
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

describe('getWeekEntries()', () => {
  it('should get all the entries from the beginDate to beginDate + 7 days', () => {
    const entries = [
      { ...testEntry3, date: subDays(new Date(), 10).toString() },
      { ...testEntry2, date: SEVEN_DAYS_AGO_STRING },
      { ...testEntry1, date: subDays(new Date(), 1).toString() },
      { ...testEntry1, date: new Date().toString() },
      { ...testEntry3, date: addDays(new Date(), 3).toString() }
    ];
    const weekEntries1 = getWeekEntries(startOfDay(SEVEN_DAYS_AGO_DATE), entries);
    expect(weekEntries1.length).toBe(2);
    const weekEntries2 = getWeekEntries(startOfToday(), entries);
    expect(weekEntries2.length).toBe(2);
  });
});

import { DEFAULT_COMPLETION_NAME } from '../../../config/Constants';
import TrackerEntry from '../../../models/TrackerEntry';
import makeFakeCompletion from '../../../models/factories/makeFakeCompletion';
import formatYearData from './formatYearData';
import { DataType } from './types';

describe('formatYearData()', () => {
  const completions = [
    makeFakeCompletion({
      quantity: 10,
      unit: 'push-ups'
    }),
    makeFakeCompletion({
      quantity: 5,
      unit: 'squats'
    })
  ];
  const yearDate = new Date('01/01/2022');
  const entries: TrackerEntry[] = [
    {
      id: '1',
      completions: completions,
      date: '01/01/2022',
      trackerId: '1'
    },
    {
      id: '2',
      completions: completions,
      date: '07/02/2022',
      trackerId: '1'
    },
    {
      id: '3',
      completions: completions,
      date: '07/07/2022',
      trackerId: '1'
    },
    {
      id: '4',
      completions: completions,
      date: '10/08/2022',
      trackerId: '1'
    },
    {
      id: '4',
      completions: completions,
      date: '10/09/2022',
      trackerId: '1'
    }
  ];

  it('should return the year data aggregated by month', () => {
    const data: DataType[] = formatYearData(yearDate, entries);
    const pushUpsCompletion = completions[0];
    const squatsCompletions = completions[1];
    expect(data.length).toBe(12); // 12 months in a year
    // 1 full completion in January
    expect(data[0]['push-ups']).toBe(pushUpsCompletion.quantity);
    expect(data[0]['squats']).toBe(squatsCompletions.quantity);
    // No completions in March
    expect(data[2]['push-ups']).toBeUndefined();
    expect(data[2]['squats']).toBeUndefined();
    // 2 full completions in July
    expect(data[6]['push-ups']).toBe(pushUpsCompletion.quantity * 2);
    expect(data[6]['squats']).toBe(squatsCompletions.quantity * 2);
  });

  it('should return the year data aggregated by month and handle entries with empty completions', () => {
    const entriesWithoutCompletions = entries.map((e) => ({ ...e, completions: [] }));
    const data: DataType[] = formatYearData(yearDate, entriesWithoutCompletions);
    expect(data.length).toBe(12); // 12 months in a year
    expect(data[0][DEFAULT_COMPLETION_NAME]).toBe(1); // 1 completion in January
    expect(data[1][DEFAULT_COMPLETION_NAME]).toBeUndefined(); // No completion in February
    expect(data[9][DEFAULT_COMPLETION_NAME]).toBe(2); // 2 completions in October
  });
});

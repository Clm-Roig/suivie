import { DEFAULT_COMPLETION_NAME } from '../../../config/Constants';
import TrackerEntry from '../../../models/TrackerEntry';
import makeFakeCompletion from '../../../models/factories/makeFakeCompletion';
import formatWeekData from './formatWeekData';
import { DataType } from './types';

describe('formatWeekData()', () => {
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
  const partialCompletions = [
    makeFakeCompletion({
      quantity: 5,
      unit: 'push-ups'
    }),
    makeFakeCompletion({
      quantity: 2,
      unit: 'squats'
    })
  ];
  const weekDate = new Date('04/03/2022');
  const entries: TrackerEntry[] = [
    {
      id: '1',
      completions: completions,
      date: '04/01/2022',
      trackerId: '1'
    },
    {
      id: '2',
      completions: completions,
      date: '04/03/2022',
      trackerId: '1'
    },
    {
      id: '3',
      completions: completions,
      date: '04/05/2022',
      trackerId: '1'
    },
    {
      id: '4',
      completions: partialCompletions,
      date: '04/06/2022',
      trackerId: '1'
    },
    {
      id: '4',
      completions: completions,
      date: '04/10/2022',
      trackerId: '1'
    }
  ];

  it('should return the week data aggregated by day', () => {
    const data: DataType[] = formatWeekData(weekDate, entries);
    const pushUpsCompletion = completions[0];
    const squatsCompletions = completions[1];
    const pushUpsPartialCompletion = partialCompletions[0];
    const squatsPartialCompletions = partialCompletions[1];
    expect(data.length).toBe(7); // 7 days in a week
    // Full completions on 1rst and 3rd day
    expect(data[0]['push-ups']).toBe(pushUpsCompletion.quantity);
    expect(data[0]['squats']).toBe(squatsCompletions.quantity);
    expect(data[2]['push-ups']).toBe(pushUpsCompletion.quantity);
    expect(data[2]['squats']).toBe(squatsCompletions.quantity);
    // One partial completion
    expect(data[3]['push-ups']).toBe(pushUpsPartialCompletion.quantity);
    expect(data[3]['squats']).toBe(squatsPartialCompletions.quantity);
    // no completion on others days
    for (let i = 4; i <= 6; i += 1) {
      expect(data[i]['push-ups']).toBeUndefined();
      expect(data[i]['squats']).toBeUndefined();
    }
  });

  it('should return the week data aggregated by day and handle entries with empty completions', () => {
    const entriesWithoutCompletions = entries.map((e) => ({ ...e, completions: [] }));
    const data: DataType[] = formatWeekData(weekDate, entriesWithoutCompletions);
    expect(data.length).toBe(7); // 7 days in a week
    // Completions on 1rst, 3rd day & 4th day
    expect(data[0][DEFAULT_COMPLETION_NAME]).toBe(1);
    expect(data[2][DEFAULT_COMPLETION_NAME]).toBe(1);
    expect(data[3][DEFAULT_COMPLETION_NAME]).toBe(1);
    // no completion on others days
    for (let i = 4; i <= 6; i += 1) {
      expect(data[i][DEFAULT_COMPLETION_NAME]).toBeUndefined();
    }
  });
});

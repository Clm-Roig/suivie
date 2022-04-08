import TrackerEntry from '../../../models/TrackerEntry';
import formatMonthDate from './formatMonthData';
import { DataType } from './types';

describe('isATracker helper', () => {
  const completions = [
    {
      quantity: 10,
      unit: 'push-ups'
    },
    {
      quantity: 5,
      unit: 'squats'
    }
  ];
  const monthDate = new Date('04/01/2022');
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
      date: '04/02/2022',
      trackerId: '1'
    },
    {
      id: '3',
      completions: completions,
      date: '04/07/2022',
      trackerId: '1'
    },
    {
      id: '4',
      completions: completions,
      date: '04/08/2022',
      trackerId: '1'
    },
    {
      id: '4',
      completions: completions,
      date: '04/09/2022',
      trackerId: '1'
    }
  ];

  it('should return the month data aggregated by week', () => {
    const data: DataType[] = formatMonthDate(monthDate, entries);
    const pushUpsCompletion = completions[0];
    const squatsCompletions = completions[1];
    expect(data.length).toBe(5); // 5 weeks in April 2022
    // 3 full completions on first week
    expect(data[0]['push-ups']).toBe(pushUpsCompletion.quantity * 3);
    expect(data[0]['squats']).toBe(squatsCompletions.quantity * 3);
    // 2 full completions on second week
    expect(data[1]['push-ups']).toBe(pushUpsCompletion.quantity * 2);
    expect(data[1]['squats']).toBe(squatsCompletions.quantity * 2);
    // no completion on others weeks
    for (let i = 2; i <= 4; i += 1) {
      expect(data[i]['push-ups']).toBeUndefined();
      expect(data[i]['squats']).toBeUndefined();
    }
  });
});

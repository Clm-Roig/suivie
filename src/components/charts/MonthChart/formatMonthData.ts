import { addWeeks, getDaysInMonth, getWeeksInMonth, isSameWeek, startOfMonth } from 'date-fns';
import TrackerEntry from '../../../models/TrackerEntry';
import { getAggregatedCompletions } from '../../../store/trackers/utils';
import { DataType } from './types';

const formatData = (monthDate: Date, entries: TrackerEntry[]): DataType[] => {
  const data = [];
  const nbOfWeeks = getWeeksInMonth(monthDate);
  const startDay = startOfMonth(monthDate);
  for (let i = 0; i < nbOfWeeks; i += 1) {
    const week = addWeeks(startDay, i);
    const weekData: DataType = {
      name: (i === 0 ? 1 : i * 7 + 1) + '-' + Math.min(i * 7 + 8, getDaysInMonth(startDay))
    };
    const weekEntries = entries.filter((e) => isSameWeek(new Date(e.date), week));
    const aggCompletions = getAggregatedCompletions(weekEntries);
    aggCompletions.forEach((c) => {
      weekData[c.unit] = c.quantity;
    });
    data.push(weekData);
  }
  return data;
};

export default formatData;

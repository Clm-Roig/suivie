import { addMonths, format, isSameMonth, startOfYear } from 'date-fns'; // eslint-disable-line import/no-duplicates
import { fr } from 'date-fns/locale'; // eslint-disable-line import/no-duplicates
import TrackerEntry from '../../../models/TrackerEntry';
import { getAggregatedCompletions } from '../../../store/trackers/utils';
import { DataType } from './types';

const formatData = (yearDate: Date, entries: TrackerEntry[]): DataType[] => {
  const data = [];
  const startDay = startOfYear(yearDate);
  for (let i = 0; i < 12; i += 1) {
    const month = addMonths(startDay, i);
    const monthData: DataType = { name: format(month, 'M', { locale: fr }) };
    const monthEntries = entries.filter((e) => isSameMonth(new Date(e.date), month));
    const aggCompletions = getAggregatedCompletions(monthEntries);
    aggCompletions.forEach((c) => {
      monthData[c.unit] = c.quantity;
    });
    data.push(monthData);
  }
  return data;
};

export default formatData;
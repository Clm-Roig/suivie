import { addDays, format, isSameDay } from 'date-fns'; // eslint-disable-line import/no-duplicates
import { fr } from 'date-fns/locale'; // eslint-disable-line import/no-duplicates
import TrackerEntry from '../../../models/TrackerEntry';
import { getAggregatedCompletions } from '../../../store/trackers/utils';
import { DataType } from './types';

const formatData = (beginDate: Date, entries: TrackerEntry[]): DataType[] => {
  const data = [];
  for (let i = 0; i < 7; i += 1) {
    const day = addDays(beginDate, i);
    const dayData: DataType = { name: format(day, 'EEEE', { locale: fr }).slice(0, 3) };
    const dayEntries = entries.filter((e) => isSameDay(new Date(e.date), day));
    const aggCompletions = getAggregatedCompletions(dayEntries);
    aggCompletions.forEach((c) => {
      dayData[c.unit] = c.quantity;
    });
    data.push(dayData);
  }
  return data;
};

export default formatData;

import { addMonths, format, isSameMonth, startOfYear } from 'date-fns';
import * as locale from 'date-fns/locale';

import { DEFAULT_COMPLETION_NAME } from '../../../config/Constants';
import Completion from '../../../models/Completion';
import TrackerEntry from '../../../models/TrackerEntry';
import { getAggregatedCompletions } from '../../../store/trackers/utils';
import { DataType } from './types';

const getMonthData = (month: Date, aggCompletions: Completion[], monthEntries: TrackerEntry[]) => {
  const monthData: DataType = { name: format(month, 'MMMMM', { locale: locale.fr }).slice(0, 1) };
  if (aggCompletions.length > 0) {
    aggCompletions.forEach((c) => {
      monthData[c.unit] = c.quantity;
    });
    // Handle entries without completions
  } else if (monthEntries.length > 0) {
    monthData[DEFAULT_COMPLETION_NAME] = monthEntries.length;
  }
  return monthData;
};

const formatData = (yearDate: Date, entries: TrackerEntry[]): DataType[] => {
  const data = [];
  const startDay = startOfYear(yearDate);
  for (let i = 0; i < 12; i += 1) {
    const month = addMonths(startDay, i);
    const monthEntries = entries.filter((e) => isSameMonth(new Date(e.date), month));
    const aggCompletions = getAggregatedCompletions(monthEntries);
    const monthData: DataType = getMonthData(month, aggCompletions, monthEntries);
    data.push(monthData);
  }
  return data;
};

export default formatData;

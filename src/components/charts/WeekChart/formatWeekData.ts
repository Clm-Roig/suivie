import { addDays, format, isSameDay } from 'date-fns';
import * as locale from 'date-fns/locale';

import { DEFAULT_COMPLETION_NAME } from '../../../config/Constants';
import Completion from '../../../models/Completion';
import TrackerEntry from '../../../models/TrackerEntry';
import { getAggregatedCompletions } from '../../../store/trackers/utils';
import { DataType } from './types';

const getDayData = (day: Date, aggCompletions: Completion[], dayEntries: TrackerEntry[]) => {
  const dayData: DataType = { name: format(day, 'EEEE', { locale: locale.fr }).slice(0, 3) };
  if (aggCompletions.length > 0) {
    aggCompletions.forEach((c) => {
      dayData[c.unit] = c.quantity;
    });
    // Handle entries without completions
  } else if (dayEntries.length > 0) {
    dayData[DEFAULT_COMPLETION_NAME] = dayEntries.length;
  }
  return dayData;
};

const formatData = (beginDate: Date, entries: TrackerEntry[]): DataType[] => {
  const data = [];
  for (let i = 0; i < 7; i += 1) {
    const day = addDays(beginDate, i);
    const dayEntries = entries.filter((e) => isSameDay(new Date(e.date), day));
    const aggCompletions: Completion[] = getAggregatedCompletions(dayEntries);
    const dayData: DataType = getDayData(day, aggCompletions, dayEntries);
    data.push(dayData);
  }
  return data;
};

export default formatData;

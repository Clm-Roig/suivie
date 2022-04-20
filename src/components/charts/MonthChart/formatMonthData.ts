import {
  addWeeks,
  getDay,
  getDaysInMonth,
  getWeeksInMonth,
  isSameWeek,
  startOfMonth
} from 'date-fns';

import { DEFAULT_COMPLETION_NAME } from '../../../config/Constants';
import Completion from '../../../models/Completion';
import TrackerEntry from '../../../models/TrackerEntry';
import { getAggregatedCompletions } from '../../../store/trackers/utils';
import { DataType } from './types';

const getWeekData = (
  weekBeginDayNumber: number,
  weekEndDayNumber: number,
  aggCompletions: Completion[],
  weekEntries: TrackerEntry[]
) => {
  const weekData: DataType = {
    name: weekBeginDayNumber + '-' + weekEndDayNumber
  };
  if (aggCompletions.length > 0) {
    aggCompletions.forEach((c) => {
      weekData[c.unit] = c.quantity;
    });
    // Handle entries without completions
  } else if (weekEntries.length > 0) {
    weekData[DEFAULT_COMPLETION_NAME] = weekEntries.length;
  }
  return weekData;
};

const formatData = (monthDate: Date, entries: TrackerEntry[]): DataType[] => {
  const data = [];
  const nbOfWeeks = getWeeksInMonth(monthDate);
  const startDay = startOfMonth(monthDate);
  for (let i = 0; i < nbOfWeeks; i += 1) {
    const week = addWeeks(startDay, i);
    const weekBeginDayNumber = i === 0 ? 1 : i * 7 + 1;
    const weekEndDayNumber = Math.min(i * 7 + 7, getDaysInMonth(startDay));
    const weekEntries = entries.filter((e) =>
      isSameWeek(new Date(e.date), week, {
        weekStartsOn: getDay(new Date(week))
      })
    );
    const aggCompletions: Completion[] = getAggregatedCompletions(weekEntries);
    const weekData: DataType = getWeekData(
      weekBeginDayNumber,
      weekEndDayNumber,
      aggCompletions,
      weekEntries
    );

    data.push(weekData);
  }
  return data;
};

export default formatData;

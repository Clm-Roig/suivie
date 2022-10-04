import { getDay } from 'date-fns';

import TrackerEntry from '../../models/TrackerEntry';

const frenchWeekDays = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];

type daysStats = {
  days: string[];
  count: number;
};

export const getFavoriteDays = (entries: TrackerEntry[]): daysStats => {
  const days = Object.keys(frenchWeekDays).map((x) => ({ id: Number(x), count: 0 }));
  for (const entry of entries) {
    const dayNumber = getDay(new Date(entry.date));
    const dayData = days.find((d) => d.id === dayNumber);
    if (dayData) {
      dayData.count++;
    }
  }

  const max = days.reduce((prev, current) => (prev.count > current.count ? prev : current)).count;
  if (max === 0) {
    return { days: [], count: 0 };
  }
  const allMaxDayIds = days.filter((d) => d.count === max).map((d) => d.id);
  const frenchMaxDays = frenchWeekDays.filter((d, idx) => allMaxDayIds.includes(idx));
  return { days: frenchMaxDays, count: max };
};

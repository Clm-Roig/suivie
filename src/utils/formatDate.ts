/* eslint-disable import/no-duplicates */
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

/**
 * Default date-fns format() wrapper to use in the app (all date to french)
 * @param date
 * @param formatStr
 * @returns
 */
export default function (date: Date, formatStr = 'dd MMMM yyyy'): string {
  return format(date, formatStr, { locale: fr });
}

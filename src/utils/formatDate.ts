import { format } from 'date-fns';
import * as locale from 'date-fns/locale';

/**
 * Default date-fns format() wrapper to use in the app (all date to french)
 * @param date
 * @param formatStr
 * @returns
 */
export default function (date: Date, formatStr = 'dd MMMM yyyy'): string {
  return format(date, formatStr, { locale: locale.fr });
}

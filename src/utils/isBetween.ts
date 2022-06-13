/**
 * True if the dateToCheck is between the 2 others dates (included)
 * @param dateToCheck
 * @param dateBefore
 * @param dateAfter
 * @returns
 */
export const isBetween = (dateToCheck: Date, dateBefore: Date, dateAfter: Date) =>
  dateToCheck >= dateBefore && dateToCheck <= dateAfter;

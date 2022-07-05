/**
 * Return true if:
 * - value is undefined
 * - value is a string representation of an integer greater than 0
 * @param {string} [value]
 * @return {boolean}
 */
export const validateFacultativePositiveInteger = (value?: string) => {
  if (!value) return true;
  if (typeof value !== 'string') {
    return false;
  }
  const num = Number(value);
  if (Number.isInteger(num) && num > 0) {
    return true;
  }
  return false;
};

/**
 * Return true if:
 * - value is undefined
 * - value is a string representation of a float greater than 0 (dot "." and coma "," are both accepted as decimal separator)
 * @param {string} [value]
 * @return {boolean}
 */
export const validateFacultativePositiveFloat = (value?: string) => {
  if (!value) return true;
  if (typeof value !== 'string') {
    return false;
  }
  const num = Number(value.replace(',', '.')); // French decimal conversion

  if ((Number.isInteger(num) || num % 1 !== 0) && num > 0) {
    return true;
  }
  return false;
};

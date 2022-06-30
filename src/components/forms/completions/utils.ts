export const computeDecrementedStringQuantity = (value: string): string => {
  const intValue = parseInt(value, 10);
  return Math.max(1, (isNaN(intValue) ? 1 : intValue) - 1).toString();
};

export const computeIncrementedStringQuantity = (value: string): string => {
  const intValue = parseInt(value, 10);
  return ((isNaN(intValue) ? 1 : intValue) + 1).toString();
};

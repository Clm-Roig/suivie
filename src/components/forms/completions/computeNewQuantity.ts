export const computeDecrementedStringQuantity = (value: string): string => {
  const intValue = parseInt(value, 10);
  return Math.max(0, (isNaN(intValue) ? 0 : intValue) - 1).toString();
};

export const computeIncrementedStringQuantity = (value: string): string => {
  const intValue = parseInt(value, 10);
  return ((isNaN(intValue) ? 0 : intValue) + 1).toString();
};

export const computeIncrementedQuantity = (value: number): number => {
  return (isNaN(value) ? 0 : value) + 1;
};

export const computeDecrementedQuantity = (value: number): number => {
  return Math.max(0, value - 1);
};

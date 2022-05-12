export const computeDecrementedStringQuantity = (value: string): string => {
  const intValue = parseInt(value, 10);
  return Math.max(1, (isNaN(intValue) ? 1 : intValue) - 1).toString();
};

export const computeIncrementedStringQuantity = (value: string): string => {
  const intValue = parseInt(value, 10);
  return ((isNaN(intValue) ? 1 : intValue) + 1).toString();
};

export const computeIncrementedQuantity = (value: number): number => {
  return (isNaN(value) ? 1 : value) + 1;
};

export const computeDecrementedQuantity = (value: number): number => {
  return Math.max(1, value - 1);
};

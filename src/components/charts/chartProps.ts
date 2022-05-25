export const tooltipProps = {
  // The array represents the format of [value, name]: here, the name is hidden
  formatter: (value: string, name: string) => [value + ' ' + name, undefined]
};

export const xAxisProps = {
  dataKey: 'name',
  fontSize: '0.8rem'
};

export const cartesianGridProps = {
  horizontal: true,
  vertical: true
};

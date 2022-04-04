import { Theme } from '@mui/material/styles';

const getChartColors = (theme: Theme) => {
  return [theme.palette.primary.main, theme.palette.secondary.dark, '#DB7F8E', '#80CBC4'];
};
export default getChartColors;

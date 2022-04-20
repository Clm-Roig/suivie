import { Box, useTheme } from '@mui/material';
import { FC, useEffect, useMemo, useState } from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

import getChartColors from '../../../config/getChartColors';
import TrackerEntry from '../../../models/TrackerEntry';
import { tooltipProps, xAxisProps } from '../chartProps';
import getAllCompletionUnits from './../getAllCompletionUnits';
import formatData from './formatWeekData';
import { DataType } from './types';

interface Props {
  beginDate: Date;
  entries: TrackerEntry[];
}

const WeekChart: FC<Props> = ({ beginDate, entries }) => {
  const [data, setData] = useState<DataType[]>([]);
  const [allUnits, setAllUnits] = useState<string[]>([]);
  const theme = useTheme();
  const { fontFamily } = theme.typography;

  const CHART_COLORS = useMemo(() => getChartColors(theme), [theme]);

  useEffect(() => {
    setData(formatData(beginDate, entries));
  }, [beginDate, entries]);

  useEffect(() => {
    setAllUnits(getAllCompletionUnits(entries));
  }, [entries]);

  return (
    <Box height="250px" width="100%">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={300} height={250} data={data}>
          <CartesianGrid />
          <XAxis {...xAxisProps} tick={{ fontFamily: fontFamily }} />
          <YAxis width={25} fontSize={'0.8rem'} />
          <Tooltip
            {...tooltipProps}
            itemStyle={{ fontFamily: fontFamily }}
            labelStyle={{ fontFamily: fontFamily }}
          />
          <Legend wrapperStyle={{ fontFamily: fontFamily }} />

          {allUnits.map((u, i) => (
            <Line
              connectNulls
              dataKey={u}
              isAnimationActive={
                false /*Disable animation, it's making some dots to disappear: https://github.com/recharts/recharts/issues/804 */
              }
              key={u + '-line'}
              stroke={CHART_COLORS[i % CHART_COLORS.length]}
              strokeWidth={2}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default WeekChart;

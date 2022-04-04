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
import TrackerEntry from '../../../models/TrackerEntry';
import formatData from './formatWeekData';
import getChartColors from './getChartColors';

import { DataType } from './types';

interface Props {
  beginDate: Date;
  entries: TrackerEntry[];
}

const WeekChart: FC<Props> = ({ beginDate, entries }) => {
  const [data, setData] = useState<DataType[]>([]);
  const [allUnits, setAllUnits] = useState<string[]>([]);
  const theme = useTheme();

  const CHART_COLORS = useMemo(() => getChartColors(theme), [theme]);

  useEffect(() => {
    setData(formatData(beginDate, entries));
  }, [beginDate, entries]);

  useEffect(() => {
    const units = entries.flatMap((e) => e.completions.map((c) => c.unit));
    setAllUnits(Array.from(new Set(units)));
  }, [entries]);

  return (
    <Box height="250px" width="100%">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={300} height={250} data={data}>
          <CartesianGrid />
          <XAxis dataKey="name" tick={{ fontFamily: theme.typography.fontFamily }} />
          <YAxis width={25} fontSize={'0.8rem'} />
          <Tooltip />
          <Legend />

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

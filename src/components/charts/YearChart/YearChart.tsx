import { Box, useTheme } from '@mui/material';
import { FC, useEffect, useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

import { DEFAULT_COMPLETION_NAME } from '../../../config/Constants';
import getChartColors from '../../../config/getChartColors';
import TrackerEntry from '../../../models/TrackerEntry';
import { tooltipProps, xAxisProps } from '../chartProps';
import formatData from './formatYearData';
import { DataType } from './types';

interface Props {
  beginDate: Date;
  entries: TrackerEntry[];
}

const YearChart: FC<Props> = ({ beginDate, entries }) => {
  const [data, setData] = useState<DataType[]>([]);
  const [allUnits, setAllUnits] = useState<string[]>([]);
  const theme = useTheme();
  const { fontFamily } = theme.typography;

  const CHART_COLORS = useMemo(() => getChartColors(theme), [theme]);

  useEffect(() => {
    setData(formatData(beginDate, entries));
  }, [beginDate, entries]);

  useEffect(() => {
    const units = entries
      .flatMap((e) => e.completions.map((c) => c.unit))
      .concat(DEFAULT_COMPLETION_NAME);
    setAllUnits(Array.from(new Set(units)));
  }, [entries]);

  return (
    <Box height="250px" width="100%">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={300} height={250} data={data}>
          <CartesianGrid />
          <XAxis {...xAxisProps} tick={{ fontFamily: theme.typography.fontFamily }} />
          <YAxis width={25} fontSize={'0.8rem'} />
          <Tooltip
            {...tooltipProps}
            itemStyle={{ fontFamily: fontFamily }}
            labelStyle={{ fontFamily: fontFamily }}
          />
          <Legend wrapperStyle={{ fontFamily: fontFamily }} />

          {allUnits.map((u, i) => (
            <Bar
              dataKey={u}
              isAnimationActive={
                false /*Disable animation, it's making some values to disappear: https://github.com/recharts/recharts/issues/804 */
              }
              key={u + '-bar'}
              fill={CHART_COLORS[i % CHART_COLORS.length]}
              strokeWidth={2}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default YearChart;

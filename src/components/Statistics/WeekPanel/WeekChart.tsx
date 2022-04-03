import { Box } from '@mui/material';
// eslint-disable-next-line import/no-duplicates
import { addDays, format, isSameDay } from 'date-fns';
// eslint-disable-next-line import/no-duplicates
import fr from 'date-fns/locale/fr';
import { FC, useEffect, useState } from 'react';
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
import { getAggregatedCompletions } from '../../../store/trackers/utils';

interface Props {
  beginDate: Date;
  entries: TrackerEntry[];
}

type DataType = Record<string, string | number>;

const formatData = (beginDate: Date, entries: TrackerEntry[]): DataType[] => {
  const data = [];
  for (let i = 0; i < 7; i += 1) {
    const day = addDays(beginDate, i);
    const dayData: DataType = { name: format(day, 'EEEE', { locale: fr }).slice(0, 3) };
    const dayEntries = entries.filter((e) => isSameDay(new Date(e.date), day));
    const aggCompletions = getAggregatedCompletions(dayEntries);
    aggCompletions.forEach((c) => {
      dayData[c.unit] = c.quantity;
    });
    data.push(dayData);
  }
  return data;
};

/*
  TODO
  - Compute all units (or get them as a prop)
  - Loading indicator
  - Add Line dynamically
*/

const WeekChart: FC<Props> = ({ beginDate, entries }) => {
  const [data, setData] = useState<DataType[]>([]);
  useEffect(() => {
    setData(formatData(beginDate, entries));
  }, [beginDate, entries]);

  return (
    <Box height="250px" width="100%">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={300} height={250} data={data}>
          <CartesianGrid />
          <XAxis dataKey="name" />
          <YAxis width={30} />
          <Tooltip />
          <Legend />
          {/*Disable animation, it's making some dots to disappear: https://github.com/recharts/recharts/issues/804 */}
          <Line isAnimationActive={false} dataKey="abdos" stroke="#82ca9d" strokeWidth={3} />
          <Line isAnimationActive={false} dataKey="pompes" stroke="#8884d8" strokeWidth={3} />
          <Line isAnimationActive={false} dataKey="squats" stroke="#1034a8" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default WeekChart;

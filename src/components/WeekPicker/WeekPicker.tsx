import * as React from 'react';
import { FC } from 'react';
import { styled } from '@mui/material/styles';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import PickersDay, { PickersDayProps } from '@mui/lab/PickersDay';
import { addDays, isBefore, isSameDay, isWithinInterval } from 'date-fns';
import WeekPickerToolbar from './WeekPickerToolbar';
import WeekPickerInput from './WeekPickerInput';
import './WeekPicker.css';
import { TRACKERS_BEGIN_IN } from '../../config/Constants';

type CustomPickerDayProps = PickersDayProps<Date> & {
  dayIsBetween: boolean;
  isFirstDay: boolean;
  isHighlighted: boolean;
  isLastDay: boolean;
};

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== 'dayIsBetween' &&
    prop !== 'isFirstDay' &&
    prop !== 'isLastDay' &&
    prop !== 'isHighlighted'
})<CustomPickerDayProps>(({ theme, dayIsBetween, isFirstDay, isHighlighted, isLastDay }) => ({
  ...(dayIsBetween && {
    borderRadius: 0,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.dark
    }
  }),
  ...(isFirstDay && {
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%'
  }),
  ...(isLastDay && {
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%'
  }),
  ...(isHighlighted &&
    dayIsBetween && {
      color: theme.palette.secondary.main,
      background: theme.palette.primary.light,
      '&:after': {
        bottom: -2,
        content: '"•"',
        position: 'absolute'
      }
    }),
  ...(isHighlighted &&
    !dayIsBetween && {
      background: theme.palette.secondary.light,
      '&:after': {
        bottom: -2,
        content: '"•"',
        position: 'absolute'
      }
    })
})) as React.ComponentType<CustomPickerDayProps>;

interface Props {
  highlightedDates: Date[];
  onChange: (date: Date | null) => void;
  onMonthChange?: (date: Date) => void;
  value: Date;
}

const WeekPicker: FC<Props> = ({ highlightedDates, onChange, onMonthChange, value }) => {
  const renderWeekPickerDay = (
    date: Date,
    selectedDates: Array<Date | null>,
    pickersDayProps: PickersDayProps<Date>
  ) => {
    if (!value) {
      return <PickersDay {...pickersDayProps} />;
    }

    const start = value;
    const end = addDays(value, 6);

    const dayIsBetween =
      isWithinInterval(date, { start: start, end }) && isBefore(date, new Date());
    const isFirstDay = isSameDay(date, start);
    const isLastDay = isSameDay(date, end) || isSameDay(date, new Date());
    const isHighlighted = highlightedDates.some((hD) => isSameDay(hD, date));

    return (
      <CustomPickersDay
        {...pickersDayProps}
        disableMargin
        dayIsBetween={dayIsBetween}
        isFirstDay={isFirstDay}
        isHighlighted={isHighlighted}
        isLastDay={isLastDay}
      />
    );
  };

  return (
    <div className="weekPicker">
      <StaticDatePicker
        label="Choix de la semaine"
        maxDate={new Date()}
        minDate={TRACKERS_BEGIN_IN}
        onChange={onChange}
        onMonthChange={onMonthChange}
        renderDay={renderWeekPickerDay}
        renderInput={(params) => <WeekPickerInput {...params} />}
        ToolbarComponent={(params) => <WeekPickerToolbar {...params} />}
        value={value}
      />
    </div>
  );
};

export default WeekPicker;

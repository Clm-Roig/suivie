import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { addDays, isToday, subDays } from 'date-fns';
import { FC } from 'react';

interface Props {
  date: Date;
  setDate: (date: Date) => void;
}

const DaySelector: FC<Props> = ({ date, setDate }) => {
  const disableNextDay = isToday(date);
  return (
    <Stack direction="row" alignItems="center" justifyContent="center">
      <IconButton color="primary" onClick={() => setDate(subDays(date, 1))}>
        <ChevronLeftIcon fontSize="large" />
      </IconButton>
      <MobileDatePicker
        componentsProps={{
          actionBar: {
            actions: ['cancel', 'today']
          }
        }}
        value={date}
        maxDate={new Date()}
        onChange={(newValue) => {
          if (newValue) {
            setDate(newValue);
          }
        }}
        renderInput={(params) => (
          <TextField
            sx={{ input: { textAlign: 'center' } }}
            variant="standard"
            {...params}
            InputProps={{
              endAdornment: !isToday(date) && (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="go back to today"
                    onClick={() => setDate(new Date())}
                    edge="end">
                    <RestartAltIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        )}
      />
      <IconButton
        color={disableNextDay ? 'default' : 'primary'}
        disabled={disableNextDay}
        onClick={() => setDate(addDays(date, 1))}>
        <ChevronRightIcon fontSize="large" />
      </IconButton>
    </Stack>
  );
};

export default DaySelector;

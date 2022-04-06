import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { FC } from 'react';

type TrackerMin = {
  id: string;
  name: string;
};
interface Props {
  onSelect: (event: SelectChangeEvent) => void;
  selectedTrackerId: string;
  trackers: TrackerMin[];
}

const TrackerSelect: FC<Props> = ({ onSelect, selectedTrackerId, trackers }) => {
  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="tracker-select">Tracker</InputLabel>
        <Select
          labelId="tracker-select-label"
          id="tracker-select"
          value={selectedTrackerId}
          label="Tracker"
          onChange={onSelect}>
          {trackers.map((t) => (
            <MenuItem key={t.id} value={t.id}>
              {t.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default TrackerSelect;

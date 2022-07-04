import { Divider, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import HelperAdornment from '../HelperAdornment/HelperAdornment';

const MAX_NUMBER_OF_DAYS_FOR_FREQUENCY = 120;
const NUMBER_OF_DAYS_FOR_FREQUENCY = Array.from(
  Array(MAX_NUMBER_OF_DAYS_FOR_FREQUENCY),
  (e, i) => i + 1
);

interface Props {
  valueName: string;
}

const FrequencyPicker: FC<Props> = ({ valueName }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={valueName}
      control={control}
      rules={{
        min: { value: 1, message: 'La fréquence doit être supérieure ou égale à 1.' },
        pattern: { value: /^\d+$/, message: 'La fréquence doit être un nombre (de jours).' },
        required: { value: true, message: 'La fréquence est requise.' }
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel htmlFor="frequency">Fréquence de répétition (en jours)</InputLabel>
          <Select
            id="frequency"
            IconComponent={() => null}
            endAdornment={
              <HelperAdornment
                name={'frequency'}
                text={
                  'La fréquence définit la durée avant laquelle un tracker validé est de nouveau marqué comme "à faire". ' +
                  '\n\nAttention : choisir la fréquence "7 (Hebdomadaire)" et valider le tracker le vendredi 1er juin par exemple ' +
                  'fera que le tracker sera de nouveau à faire seulement à partir du vendredi 8 juin.'
                }
                position={'end'}
              />
            }
            onChange={onChange}
            value={value}
            label={'Fréquence de répétition (en jours)'}>
            <MenuItem value={1}>1 (Quotidien)</MenuItem>
            <MenuItem value={7}>7 (Hebdomadaire)</MenuItem>
            <MenuItem value={14}>14 (Bihebdomadaire)</MenuItem>
            <MenuItem value={365}>365 (Annuel)</MenuItem>
            <Divider />
            {NUMBER_OF_DAYS_FOR_FREQUENCY.map((x) => (
              <MenuItem key={x} value={x}>
                {x}
              </MenuItem>
            ))}
          </Select>
          {error && error.message && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};

export default FrequencyPicker;

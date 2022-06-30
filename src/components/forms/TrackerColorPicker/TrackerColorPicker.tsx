import { Box, BoxProps, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { Control, Controller, UseFormSetValue } from 'react-hook-form';

import TrackerColor from '../../../models/TrackerColor';
import { FormValues } from '../TrackerForm/types';
import TrackerColorButton from './TrackerColorButton';

interface Props extends BoxProps {
  control: Control<FormValues, any> /* eslint-disable-line @typescript-eslint/no-explicit-any */;
  label: string;
  setValue: UseFormSetValue<FormValues>;
}

const TrackerColorPicker: FC<Props> = ({ control, label, setValue, ...boxProps }) => {
  const handleBlockClick = (color: TrackerColor) => {
    setValue('color', color);
  };
  return (
    <Controller
      control={control}
      name={'color'}
      rules={{
        required: true
      }}
      render={({ field: { value }, fieldState: { error } }) => {
        return (
          <Box {...boxProps}>
            <Typography color={error && 'error'}>{label}</Typography>
            <Stack direction={'row'} gap={1} flexWrap={'wrap'} justifyContent={'center'}>
              {Object.values(TrackerColor).map((color) => (
                <TrackerColorButton
                  key={color}
                  colorCode={color}
                  onBlockClick={() => handleBlockClick(color)}
                  isSelected={value === color}
                />
              ))}
            </Stack>
          </Box>
        );
      }}
    />
  );
};
export default TrackerColorPicker;

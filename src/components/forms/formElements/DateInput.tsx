import { TextField, TextFieldProps } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { FC } from 'react';
import { Controller, ControllerProps, useFormContext } from 'react-hook-form';

// Using a type here because of this issue: https://github.com/mui/material-ui/issues/32633
export type TextInputProps = Omit<ControllerProps, 'render'> & TextFieldProps;

const DateInput: FC<TextInputProps> = (props) => {
  const { name, rules, ...textFieldProps } = props;
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <DatePicker
          onChange={onChange}
          value={value}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              error={!!error}
              helperText={error ? error.message : ''}
              required={!!rules?.required}
              value={value}
              {...textFieldProps}
            />
          )}
        />
      )}
    />
  );
};

export default DateInput;

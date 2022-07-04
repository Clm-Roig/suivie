import { TextField, TextFieldProps } from '@mui/material';
import { FC } from 'react';
import { Controller, ControllerProps, useFormContext } from 'react-hook-form';

// Using a type here because of this issue: https://github.com/mui/material-ui/issues/32633
export type TextInputProps = Omit<ControllerProps, 'render'> & TextFieldProps;

const TextInput: FC<TextInputProps> = (props) => {
  const { name, rules, ...textFieldProps } = props;
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          error={!!error}
          helperText={error ? error.message : ''}
          onChange={onChange}
          required={!!rules?.required}
          value={value}
          {...textFieldProps}
        />
      )}
    />
  );
};

export default TextInput;

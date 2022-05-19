import { TextField, TextFieldProps } from '@mui/material';
import { FC } from 'react';

const NumberTextField: FC<TextFieldProps> = (textFieldProps) => {
  return (
    <TextField
      inputProps={{
        inputMode: 'numeric',
        min: 1,
        pattern: '[0-9]*',
        type: 'number'
      }}
      {...textFieldProps}
    />
  );
};

export default NumberTextField;

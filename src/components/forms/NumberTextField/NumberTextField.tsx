import { TextField, TextFieldProps } from '@mui/material';
import { FC } from 'react';

const NumberTextField: FC<TextFieldProps> = (textFieldProps) => {
  const { inputProps, ...otherProps } = textFieldProps;
  return (
    <TextField
      inputProps={{
        inputMode: 'numeric',
        min: 1,
        pattern: '[0-9]*',
        type: 'number',
        ...inputProps
      }}
      {...otherProps}
    />
  );
};

export default NumberTextField;

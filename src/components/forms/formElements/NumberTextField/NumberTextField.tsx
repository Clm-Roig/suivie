import { TextField, TextFieldProps } from '@mui/material';
import { FC } from 'react';

const NumberTextField: FC<TextFieldProps> = (textFieldProps) => {
  const { inputProps, ...otherProps } = textFieldProps;
  return (
    <TextField
      inputProps={{
        inputMode: 'numeric',
        pattern: '[0-9]*',
        ...inputProps
      }}
      {...otherProps}
    />
  );
};

export default NumberTextField;

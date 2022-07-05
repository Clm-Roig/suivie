import styled from '@emotion/styled';
import { Button, TextField, TextFieldProps } from '@mui/material';
import React, { FC } from 'react';

const StyledButton = styled(Button)`
  min-width: auto;
`;
const StyledTextField = styled(TextField)`
  fieldset {
    border-width: 0 1px 1px 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

interface Props {
  onDecrement?: () => void;
  onIncrement?: () => void;
  textFieldProps: TextFieldProps;
}

const CompletionQuantityTextField: FC<Props> = ({ onDecrement, onIncrement, textFieldProps }) => {
  return (
    <StyledTextField
      inputProps={{
        min: 1,
        inputMode: 'numeric',
        style: {
          textAlign: 'center'
        }
      }}
      InputProps={{
        endAdornment: onIncrement && <StyledButton onClick={() => onIncrement()}>+</StyledButton>,
        startAdornment: onDecrement && <StyledButton onClick={() => onDecrement()}>-</StyledButton>,
        sx: { px: 1 }
      }}
      label={'Quantité'}
      {...textFieldProps}
    />
  );
};

export default CompletionQuantityTextField;

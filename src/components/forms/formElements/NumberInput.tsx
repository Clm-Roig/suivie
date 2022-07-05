import { FC } from 'react';

import TextInput, { TextInputProps } from './TextInput';

const NumberInput: FC<TextInputProps> = (props) => {
  const { inputProps } = props;

  return (
    <TextInput
      inputProps={{
        inputMode: 'numeric',
        pattern: '[0-9]*',
        ...inputProps
      }}
      {...props}
    />
  );
};

export default NumberInput;

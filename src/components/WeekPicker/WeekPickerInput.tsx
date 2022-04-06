import { FC, useEffect, useState } from 'react';
import { Grid, styled, TextField, TextFieldProps } from '@mui/material';
import { addDays } from 'date-fns';
import formatDate from '../../utils/formatDate';

type Props = TextFieldProps;

const RightTextField = styled(TextField)`
  fieldset {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

const LeftTextField = styled(TextField)`
  fieldset {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

const WeekPickerInput: FC<Props> = (props) => {
  const value = props.inputProps?.value;
  const [endDate, setEndDate] = useState('');
  useEffect(() => {
    if (value) {
      // value as dd/mm/yyyy format
      const splittedDate = value.split('/');
      const dateObj = new Date(splittedDate[1] + '/' + splittedDate[0] + '/' + splittedDate[2]);
      if (dateObj.toString() !== 'Invalid Date') {
        setEndDate(addDays(dateObj, 6).toString());
      }
    }
  }, [value]);

  return (
    <Grid
      columns={2}
      container
      sx={{
        mb: 1
      }}>
      <Grid item xs={1}>
        <LeftTextField {...props} label="Début" />
      </Grid>
      <Grid item xs={1}>
        <RightTextField
          inputProps={{ readOnly: true }}
          value={endDate ? formatDate(new Date(endDate), 'dd/MM/yyyy') : ''}
          label="Fin"
        />
      </Grid>
    </Grid>
  );
};

export default WeekPickerInput;

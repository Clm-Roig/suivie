import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { Box, Button, TextField, Stack } from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';
import { v4 } from 'uuid';
import styled from '@emotion/styled';

import { FormValues } from './types';
import TrackerStatus from '../../models/TrackerStatus';
import { useAppDispatch } from '../../app/hooks';
import { createTracker } from '../../store/trackers/trackersSlice';

import CompletionsForm from './CompletionsForm';

export const CompletionUnitTextField = styled(TextField)`
  fieldset {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

export const CompletionQuantityTextField = styled(TextField)`
  fieldset {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

const getDefaultValues = (): FormValues => ({
  id: v4(),
  beginDate: new Date().toString(),
  duration: '',
  entries: [],
  name: '',
  requiredCompletions: [
    {
      quantity: '1',
      unit: 'fois'
    }
  ],
  status: TrackerStatus.active
});

function TrackerForm() {
  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: getDefaultValues()
  });
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm
    name: 'requiredCompletions'
  });

  const dispatch = useAppDispatch();

  const resetToDefault = () => {
    reset(getDefaultValues());
  };

  const onSubmit = (data: FormValues) => {
    const { beginDate, duration, requiredCompletions } = data;
    dispatch(
      createTracker({
        ...data,
        beginDate: beginDate.toString(),
        duration: duration ? parseInt(duration) : undefined,
        requiredCompletions: [
          ...requiredCompletions.map((c) => ({
            quantity: parseInt(c.quantity),
            unit: c.unit
          }))
        ]
      })
    );
    resetToDefault();
  };

  return (
    <Box component="form" textAlign="center">
      <Controller
        control={control}
        name={'name'}
        rules={{ required: true }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            error={!!error}
            fullWidth
            helperText={error ? 'Un nom est requis' : ''}
            label={'Nom du tracker'}
            onChange={onChange}
            required
            sx={{ mb: 2 }}
            value={value}
          />
        )}
      />

      <Controller
        name={'beginDate'}
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <DatePicker
            onChange={onChange}
            value={value}
            renderInput={(params) => (
              <TextField
                {...params}
                error={!!error}
                helperText={error ? 'Une date de début est requise.' : ''}
                label={'Début du tracker'}
                required
                sx={{ mb: 2 }}
              />
            )}
          />
        )}
      />

      <Controller
        control={control}
        name={'duration'}
        rules={{
          min: 0,
          pattern: /^\d+$/
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          let errorText = '';
          if (error) {
            if (error.type === 'min') {
              errorText = 'La durée doit être supérieure à 0.';
            }
            if (error.type === 'pattern') {
              errorText = 'La durée doit être un nombre (de jours).';
            }
          }
          return (
            <TextField
              error={!!error}
              fullWidth
              helperText={error && errorText}
              label={'Durée du tracker (en jours)'}
              onChange={onChange}
              sx={{ mb: 2 }}
              value={value}
            />
          );
        }}
      />

      <CompletionsForm append={append} control={control} fields={fields} remove={remove} />

      <Stack direction="row" justifyContent="center" spacing={1}>
        <Button type="submit" onClick={handleSubmit(onSubmit)} variant={'outlined'}>
          Créer
        </Button>
        <Button onClick={() => resetToDefault()}>Réinitialiser</Button>
      </Stack>
    </Box>
  );
}

export default TrackerForm;

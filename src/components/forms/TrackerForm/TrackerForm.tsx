import { Box, Button, Stack, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FC } from 'react';
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { useAppDispatch } from '../../../app/hooks';
import Completion from '../../../models/Completion';
import TrackerStatus from '../../../models/TrackerStatus';
import { createTracker } from '../../../store/trackers/trackersSlice';
import DefaultCompletionsForm from '../DefaultCompletionsForm/DefaultCompletionsForm';
import RequiredCompletionsForm from '../RequiredCompletionsForm/RequiredCompletionsForm';
import { FormValues } from './types';

const getDefaultValues = (): FormValues => ({
  id: v4(),
  beginDate: new Date().toString(),
  duration: '',
  defaultCompletions: [],
  entries: [],
  name: '',
  requiredCompletions: [],
  status: TrackerStatus.active
});

interface Props {
  hideForm?: () => void;
}

const TrackerForm: FC<Props> = ({ hideForm }) => {
  const dispatch = useAppDispatch();
  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: getDefaultValues()
  });
  const requiredCompletionsFieldArray = useFieldArray({
    control, // control props comes from useForm
    name: 'requiredCompletions'
  });
  const defaultCompletionsFieldArray = useFieldArray({
    control, // control props comes from useForm
    name: 'defaultCompletions'
  });
  const requiredCompletions = useWatch({
    control,
    name: 'requiredCompletions'
  });

  const resetToDefault = () => {
    reset(getDefaultValues());
  };

  const removeRequiredCompletion = (index?: number | number[]) => {
    // If it's the latest requiredCompletions, defaultCompletions should be emptied
    if (requiredCompletions.length === 1) {
      defaultCompletionsFieldArray.replace([]);
    }
    requiredCompletionsFieldArray.remove(index);
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
    if (hideForm) {
      hideForm();
    }
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
                fullWidth
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

      <RequiredCompletionsForm
        append={requiredCompletionsFieldArray.append}
        control={control}
        fields={requiredCompletionsFieldArray.fields}
        remove={removeRequiredCompletion}
        requiredCompletions={requiredCompletions.map(
          (rc) =>
            ({
              ...rc,
              quantity: Number(rc.quantity)
            } as Completion)
        )}
      />

      {requiredCompletions.length > 0 &&
        requiredCompletions.some((rc) => rc.unit !== '' && rc.unit !== undefined) && (
          <DefaultCompletionsForm
            append={defaultCompletionsFieldArray.append}
            control={control}
            fields={defaultCompletionsFieldArray.fields}
            remove={defaultCompletionsFieldArray.remove}
            requiredCompletions={requiredCompletions.map(
              (rc) =>
                ({
                  ...rc,
                  quantity: Number(rc.quantity)
                } as Completion)
            )}
          />
        )}

      <Stack direction="row" justifyContent="center" spacing={1}>
        <Button type="submit" onClick={handleSubmit(onSubmit)} variant={'outlined'}>
          Créer
        </Button>
        <Button onClick={() => resetToDefault()}>Réinitialiser</Button>
      </Stack>
    </Box>
  );
};

export default TrackerForm;

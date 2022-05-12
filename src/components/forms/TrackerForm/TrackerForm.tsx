import { Box, Button, Stack, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FC, useEffect } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { v4 } from 'uuid';

import Completion from '../../../models/Completion';
import Tracker from '../../../models/Tracker';
import TrackerStatus from '../../../models/TrackerStatus';
import DefaultCompletionsForm from '../DefaultCompletionsForm/DefaultCompletionsForm';
import RequiredCompletionsForm from '../RequiredCompletionsForm/RequiredCompletionsForm';
import { FormValues } from './types';

const getDefaultValues = (): FormValues => ({
  id: v4(),
  beginDate: new Date().toString(),
  duration: '',
  defaultCompletions: [],
  entries: [],
  isDoneForToday: false,
  name: '',
  requiredCompletions: [],
  status: TrackerStatus.active
});

const formatInitialValues = (initialValues: Tracker): FormValues => ({
  ...initialValues,
  duration: initialValues.duration ? initialValues.duration.toString() : '',
  requiredCompletions: initialValues.requiredCompletions.map((rc) => ({
    quantity: rc.quantity.toString(),
    unit: rc.unit
  }))
});

interface Props {
  initialValues?: Tracker;
  onSubmit: (data: Tracker) => void;
}

/**
 * The TrackerForm handles both tracker creation and edition.
 */
const TrackerForm: FC<Props> = ({ initialValues, onSubmit }) => {
  const isNewTracker = initialValues === undefined;
  const { control, handleSubmit, reset, setValue, watch } = useForm<FormValues>({
    defaultValues: initialValues ? formatInitialValues(initialValues) : getDefaultValues()
  });
  const defaultCompletions = watch('defaultCompletions');
  const requiredCompletions = watch('requiredCompletions');
  const requiredCompletionsFieldArray = useFieldArray({
    control, // control props comes from useForm
    name: 'requiredCompletions'
  });
  const defaultCompletionsFieldArray = useFieldArray({
    control, // control props comes from useForm
    name: 'defaultCompletions'
  });

  const resetToDefault = () => {
    if (initialValues) {
      reset(formatInitialValues(initialValues));
    } else {
      reset(getDefaultValues());
    }
  };

  useEffect(() => {
    // Dinamycally remove defaultCompletion when its requiredCompletion is deleted
    if (defaultCompletions) {
      const newDefaultCompletions = defaultCompletions.filter((dc) =>
        requiredCompletions.some((rc) => rc.unit === dc.unit)
      );
      defaultCompletionsFieldArray.replace(newDefaultCompletions);
    }
  }, [requiredCompletions]);

  const handleOnSubmit = (data: FormValues) => {
    const { beginDate, duration, requiredCompletions } = data;
    // Convert FormValues to Tracker
    onSubmit({
      ...data,
      beginDate: beginDate.toString(),
      duration: duration ? parseInt(duration) : undefined,
      requiredCompletions: [
        ...requiredCompletions.map((c) => ({
          quantity: parseInt(c.quantity),
          unit: c.unit
        }))
      ]
    } as Tracker);
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
        remove={requiredCompletionsFieldArray.remove}
        requiredCompletions={requiredCompletions.map(
          (rc) =>
            ({
              ...rc,
              quantity: Number(rc.quantity)
            } as Completion)
        )}
        setValue={setValue}
      />

      {requiredCompletions.length > 0 &&
        requiredCompletions.some((rc) => rc.unit !== '' && rc.unit !== undefined) && (
          <DefaultCompletionsForm
            append={defaultCompletionsFieldArray.append}
            control={control}
            defaultCompletions={defaultCompletions || []}
            fields={defaultCompletionsFieldArray.fields}
            remove={defaultCompletionsFieldArray.remove}
            requiredCompletions={requiredCompletions.map(
              (rc) =>
                ({
                  ...rc,
                  quantity: Number(rc.quantity)
                } as Completion)
            )}
            setValue={setValue}
          />
        )}

      <Stack direction="row" justifyContent="center" spacing={1}>
        <Button type="submit" onClick={handleSubmit(handleOnSubmit)} variant={'outlined'}>
          {isNewTracker ? 'Créer' : 'Éditer'}
        </Button>
        <Button onClick={() => resetToDefault()}>Réinitialiser</Button>
      </Stack>
    </Box>
  );
};

export default TrackerForm;

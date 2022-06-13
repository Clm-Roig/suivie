import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FC, useEffect } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { v4 } from 'uuid';

import Completion from '../../../models/Completion';
import Tracker from '../../../models/Tracker';
import TrackerStatus from '../../../models/TrackerStatus';
import DefaultCompletionsForm from '../DefaultCompletionsForm/DefaultCompletionsForm';
import NumberTextField from '../NumberTextField/NumberTextField';
import RequiredCompletionsForm from '../RequiredCompletionsForm/RequiredCompletionsForm';
import { FormValues } from './types';

const MAX_NUMBER_OF_DAYS_FOR_FREQUENCY = 120;
const NUMBER_OF_DAYS_FOR_FREQUENCY = Array.from(
  Array(MAX_NUMBER_OF_DAYS_FOR_FREQUENCY),
  (e, i) => i + 1
);

const getDefaultValues = (): FormValues => ({
  id: v4(),
  beginDate: new Date().toString(),
  duration: '',
  defaultCompletions: [],
  entries: [],
  frequency: '1',
  isDoneForToday: false,
  name: '',
  requiredCompletions: [],
  status: TrackerStatus.ACTIVE
});

const formatInitialValues = (initialValues: Tracker): FormValues => ({
  ...initialValues,
  duration: initialValues.duration ? initialValues.duration.toString() : '',
  frequency: initialValues.frequency ? initialValues.frequency.toString() : '',
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
      const newDefaultCompletions = defaultCompletions.filter(
        (dc) => requiredCompletions.some((rc) => rc.unit === dc.unit) || !dc.unit // keep default completions without unit too
      );
      defaultCompletionsFieldArray.replace(newDefaultCompletions);
    }
  }, [requiredCompletions]);

  const handleOnSubmit = (data: FormValues) => {
    const { beginDate, duration, frequency, requiredCompletions } = data;
    // Convert FormValues to Tracker
    onSubmit({
      ...data,
      beginDate: beginDate.toString(),
      duration: duration ? parseInt(duration) : undefined,
      frequency: frequency ? parseInt(frequency) : undefined,
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
            label={'Nom'}
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
                label={'Date de début'}
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
          min: 1,
          pattern: /^\d+$/
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          let errorText = '';
          if (error) {
            if (error.type === 'min') {
              errorText = 'La durée doit être supérieure ou égale à 1.';
            }
            if (error.type === 'pattern') {
              errorText = 'La durée doit être un nombre (de jours).';
            }
          }
          return (
            <NumberTextField
              error={!!error}
              fullWidth
              helperText={error && errorText}
              label={'Durée (en jours)'}
              onChange={onChange}
              sx={{ mb: 2 }}
              value={value}
            />
          );
        }}
      />

      <Controller
        name={'frequency'}
        control={control}
        rules={{
          min: 1,
          pattern: /^\d+$/,
          required: true
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          let errorText = '';
          if (error) {
            if (error.type === 'min') {
              errorText = 'La fréquence doit être supérieure ou égale à 1.';
            }
            if (error.type === 'pattern') {
              errorText = 'La fréquence doit être un nombre (de jours).';
            }
            if (error.type === 'required') {
              errorText = 'La fréquence est requise.';
            }
          }
          return (
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="frequency">Fréquence de répétition (en jours)</InputLabel>
              <Select
                onChange={onChange}
                value={value}
                label={'Fréquence de répétition (en jours)'}>
                <MenuItem value={1}>1 (Quotidien)</MenuItem>
                <MenuItem value={7}>7 (Hebdomadaire)</MenuItem>
                <MenuItem value={14}>14 (Bihebdomadaire)</MenuItem>
                <MenuItem value={365}>365 (Annuel)</MenuItem>
                <Divider />
                {NUMBER_OF_DAYS_FOR_FREQUENCY.map((x) => (
                  <MenuItem key={x} value={x}>
                    {x}
                  </MenuItem>
                ))}
              </Select>
              {error && errorText && <FormHelperText>{errorText}</FormHelperText>}
            </FormControl>
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

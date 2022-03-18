import { useForm, Controller } from 'react-hook-form';
import { Box, Button, TextField, Stack } from '@mui/material';
import { v4 } from 'uuid';
import Tracker from '../../models/Tracker';
import TrackerStatus from '../../models/TrackerStatus';
import { useAppDispatch } from '../../app/hooks';
import { createTracker } from '../../store/trackers/trackersSlice';

type FormValues = Omit<Tracker, 'duration'> & { duration: string }; // duration is used as a string for input control here

const getDefaultValues = () => ({
  id: v4(),
  beginDate: new Date().toString(),
  duration: '',
  entries: [],
  name: '',
  requiredCompletions: [],
  status: TrackerStatus.active
});

function TrackerForm() {
  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: getDefaultValues()
  });

  const dispatch = useAppDispatch();

  const resetToDefault = () => {
    reset(getDefaultValues());
  };

  const onSubmit = (data: FormValues) => {
    dispatch(
      createTracker({
        ...data,
        duration: parseInt(data.duration)
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
            helperText={error ? 'Un nom est requis' : ''}
            label={'Nom du tracker'}
            onChange={onChange}
            sx={{ mb: 2 }}
            value={value}
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
              helperText={error && errorText}
              label={'Durée du tracker (en jours)'}
              onChange={onChange}
              sx={{ mb: 2 }}
              value={value}
            />
          );
        }}
      />
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

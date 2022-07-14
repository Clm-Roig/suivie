import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Stack,
  Typography
} from '@mui/material';
import { FC, useEffect } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { v4 } from 'uuid';

import Completion from '../../../models/Completion';
import Tracker from '../../../models/Tracker';
import TrackerColor from '../../../models/TrackerColor';
import TrackerStatus from '../../../models/TrackerStatus';
import { validateFacultativePositiveInteger } from '../../../utils/validateNumber';
import HelperAdornment from '../HelperAdornment/HelperAdornment';
import TrackerColorPicker from '../TrackerColorPicker/TrackerColorPicker';
import DefaultCompletionsForm from '../completions/DefaultCompletionsForm/DefaultCompletionsForm';
import RequiredCompletionsForm from '../completions/RequiredCompletionsForm/RequiredCompletionsForm';
import DateInput from '../formElements/DateInput';
import NumberInput from '../formElements/NumberInput';
import TextInput from '../formElements/TextInput';
import FrequencyPicker from './FrequencyPicker';
import { FormValues } from './types';

const getDefaultValues = (): FormValues => ({
  id: v4(),
  beginDate: new Date().toString(),
  color: TrackerColor.YELLOW_CRAYOLA,
  doneDays: [],
  defaultCompletions: [],
  duration: '',
  entries: [],
  frequency: '1',
  isDoneForToday: false,
  name: '',
  requiredCompletions: [],
  status: TrackerStatus.ACTIVE
});

const formatInitialValues = (initialValues: Tracker): FormValues => ({
  ...initialValues,
  defaultCompletions: initialValues.defaultCompletions
    ? initialValues.defaultCompletions.map((dc) => ({
        ...dc,
        quantity: dc.quantity.toString()
      }))
    : [],
  duration: initialValues.duration ? initialValues.duration.toString() : '',
  frequency: initialValues.frequency ? initialValues.frequency.toString() : '',
  requiredCompletions: initialValues.requiredCompletions.map((rc) => ({
    ...rc,
    quantity: rc.quantity.toString()
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
  const formMethods = useForm<FormValues>({
    defaultValues: initialValues ? formatInitialValues(initialValues) : getDefaultValues()
  });

  const { control, handleSubmit, reset, setValue, watch } = formMethods;

  const defaultCompletions = watch('defaultCompletions');
  const requiredCompletions = watch('requiredCompletions');

  const defaultCompletionsFieldArray = useFieldArray({
    control,
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
    const { beginDate, defaultCompletions, duration, frequency, requiredCompletions } = data;

    // Convert FormValues to Tracker
    onSubmit({
      ...data,
      beginDate: beginDate.toString(),
      defaultCompletions: defaultCompletions
        ? defaultCompletions.map((c) => ({
            ...c,
            quantity: Number(c.quantity.replace(',', '.'))
          }))
        : [],
      duration: duration ? parseInt(duration) : undefined,
      frequency: frequency ? parseInt(frequency) : undefined,
      requiredCompletions: [
        ...requiredCompletions.map((c) => ({
          ...c,
          quantity: Number(c.quantity.replace(',', '.'))
        }))
      ]
    } as Tracker);
    resetToDefault();
  };

  const canCreateDefaultCompletions =
    requiredCompletions.length > 0 &&
    requiredCompletions.some((rc) => rc.unit !== '' && rc.unit !== undefined);

  return (
    <Box component="form" textAlign="center">
      <FormProvider {...formMethods}>
        <TextInput
          id="name"
          name="name"
          rules={{ required: { value: true, message: 'Un nom est requis.' } }}
          fullWidth
          label="Nom"
          sx={{ mb: 2 }}
        />

        <FrequencyPicker valueName="frequency" />

        <RequiredCompletionsForm
          valueName="requiredCompletions"
          requiredCompletions={requiredCompletions.map(
            (rc) =>
              ({
                ...rc,
                quantity: Number(rc.quantity)
              } as Completion)
          )}
        />

        <Accordion sx={{ mb: 2, boxShadow: 'none', bgcolor: 'transparent' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} id="more-options-header">
            <Typography sx={{ fontWeight: 'bold' }}>{"PLUS D'OPTIONS"}</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 1 }}>
            {canCreateDefaultCompletions && (
              <DefaultCompletionsForm
                defaultCompletions={defaultCompletions.map(
                  (rc) =>
                    ({
                      ...rc,
                      quantity: Number(rc.quantity)
                    } as Completion)
                )}
                requiredCompletions={requiredCompletions.map(
                  (rc) =>
                    ({
                      ...rc,
                      quantity: Number(rc.quantity)
                    } as Completion)
                )}
                valueName="defaultCompletions"
              />
            )}

            <TrackerColorPicker
              control={control}
              id="color"
              label="Couleur"
              setValue={setValue}
              mb={2}
              textAlign="left"
            />

            <DateInput
              id="begin-date"
              name="beginDate"
              rules={{ required: { value: true, message: 'Une date de début est requise.' } }}
              fullWidth
              label="Date de début"
              sx={{ mb: 2 }}
            />

            <NumberInput
              id="duration"
              name="duration"
              rules={{
                min: {
                  value: 1,
                  message: 'La durée doit être supérieure ou égale à 1.'
                },
                validate: (value) =>
                  validateFacultativePositiveInteger(value) ||
                  'La durée doit être un nombre entier positif (de jours).'
              }}
              label={'Durée (en jours)'}
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <HelperAdornment
                    name={'duration'}
                    text={
                      "Une fois la durée écoulée, le tracker sera automatiquement archivé, sans vous que vous n'ayez à le faire manuellement."
                    }
                    position={'end'}
                  />
                )
              }}
            />
          </AccordionDetails>
        </Accordion>

        <Stack direction="row" justifyContent="center" spacing={1}>
          <Button type="submit" onClick={handleSubmit(handleOnSubmit)} variant={'outlined'}>
            {isNewTracker ? 'Créer' : 'Éditer'}
          </Button>
          <Button onClick={() => resetToDefault()}>Réinitialiser</Button>
        </Stack>
      </FormProvider>
    </Box>
  );
};

export default TrackerForm;

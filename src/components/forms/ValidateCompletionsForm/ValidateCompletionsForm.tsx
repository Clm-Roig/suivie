import styled from '@emotion/styled';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Grid } from '@mui/material';
import { FC, useEffect } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';

import Completion from '../../../models/Completion';
import { validateFacultativePositiveFloat } from '../../../utils/validateNumber';
import CompletionQuantityTextField from '../completions/CompletionQuantityTextField';
import CompletionUnitTextField from '../completions/CompletionUnitTextField';
import {
  computeDecrementedStringQuantity,
  computeIncrementedStringQuantity
} from '../completions/utils';

export const FieldsetGrid = styled(Grid)`
  border-radius: 4px;
  padding: 8px;
`;

type FormValues = {
  completions: Array<{ quantity: string; unit: string }>;
};

interface Props {
  completions: Completion[];
  formId?: string;
  onSubmit: (completions: Completion[]) => void;
}

/**
 * This form is used for entering some quantities on predefined completions.
 * Completions units are disabled within this form.
 */
const ValidateCompletionsForm: FC<Props> = ({ completions, formId, onSubmit }) => {
  const { control, handleSubmit, setValue, getValues } = useForm<FormValues>();
  const { fields } = useFieldArray({
    control, // control props comes from useForm
    name: 'completions'
  });
  const [animateRef] = useAutoAnimate<HTMLFormElement>();

  useEffect(() => {
    const previousCompletions = getValues().completions;
    // Add only new completions
    const newCompletions = completions.map((c) => {
      const previousFound = previousCompletions.find((pc) => pc.unit === c.unit);
      if (previousFound) {
        return previousFound;
      } else {
        return c;
      }
    });
    setValue(
      'completions',
      newCompletions.map((c) => ({ quantity: c.quantity.toString(), unit: c.unit }))
    );
  }, [completions]);

  const formatAndSubmit = (data: FormValues) => {
    const { completions } = data;
    onSubmit(
      completions.map(
        (c) =>
          ({
            quantity: Number(c.quantity.replace(',', '.')),
            unit: c.unit
          } as Completion)
      )
    );
  };

  return (
    <form id={formId} onSubmit={handleSubmit(formatAndSubmit)} ref={animateRef}>
      {fields.map((field, index) => (
        <FieldsetGrid
          columns={2}
          container
          key={field.id}
          sx={{
            mb: 1
          }}>
          <Grid item xs={1}>
            <Controller
              control={control}
              name={`completions.${index}.quantity` as const}
              rules={{
                required: { value: true, message: 'La quantité est requise.' },
                validate: (value) =>
                  validateFacultativePositiveFloat(value) ||
                  'La quantité doit être un nombre positif.'
              }}
              render={({ field: { name, onChange, value }, fieldState: { error } }) => (
                <CompletionQuantityTextField
                  autoFocus={completions?.length === 1}
                  onDecrement={() => setValue(name, computeDecrementedStringQuantity(value))}
                  onIncrement={() => setValue(name, computeIncrementedStringQuantity(value))}
                  textFieldProps={{
                    error: !!error,
                    helperText: error && error.message,
                    onChange: onChange,
                    required: true,
                    size: 'small',
                    sx: { mb: 1 },
                    value: value || ''
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={1}>
            <Controller
              control={control}
              name={`completions.${index}.unit` as const}
              rules={{ required: true }}
              render={({ field: { value } }) => (
                <CompletionUnitTextField
                  label={'Unité'}
                  size="small"
                  sx={{ mb: 1 }}
                  value={value}
                  inputProps={{ readOnly: true }}
                />
              )}
            />
          </Grid>
        </FieldsetGrid>
      ))}
    </form>
  );
};

export default ValidateCompletionsForm;

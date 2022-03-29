import { FC, useEffect } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { Grid } from '@mui/material';
import styled from '@emotion/styled';

import CompletionQuantityTextField from '../completions/CompletionQuantityTextField';
import CompletionUnitTextField from '../completions/CompletionUnitTextField';
import Completion from '../../../models/Completion';

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
 *
 * @param {*} { completions, formId, onSubmit }
 * @return {*}
 */
const ValidateCompletionsForm: FC<Props> = ({ completions, formId, onSubmit }) => {
  const { control, handleSubmit, setValue, getValues } = useForm<FormValues>();
  const { fields } = useFieldArray({
    control, // control props comes from useForm
    name: 'completions'
  });

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
            quantity: parseInt(c.quantity),
            unit: c.unit
          } as Completion)
      )
    );
  };

  return (
    <form id={formId} onSubmit={handleSubmit(formatAndSubmit)}>
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
                min: 0,
                pattern: /^\d+$/,
                required: true
              }}
              render={({ field: { onChange, value }, fieldState: { error } }) => {
                let errorText = '';
                if (error) {
                  switch (error.type) {
                    case 'min':
                      errorText = 'La quantité doit être supérieure à 0.';
                      break;

                    case 'pattern':
                      errorText = 'La quantité doit être un nombre.';
                      break;

                    case 'required':
                      errorText = 'La quantité est requise';
                      break;
                  }
                }
                return (
                  <CompletionUnitTextField
                    error={!!error}
                    helperText={error && errorText}
                    label={'Quantité'}
                    onChange={onChange}
                    required
                    size="small"
                    inputProps={{
                      style: {
                        textAlign: 'right'
                      }
                    }}
                    sx={{ mb: 1 }}
                    style={{}}
                    value={value || ''}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={1}>
            <Controller
              control={control}
              name={`completions.${index}.unit` as const}
              rules={{ required: true }}
              render={({ field: { value } }) => (
                <CompletionQuantityTextField
                  label={'Unité'}
                  required
                  size="small"
                  sx={{ mb: 1 }}
                  value={value}
                  disabled
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

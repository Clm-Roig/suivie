import styled from '@emotion/styled';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  GridProps,
  IconButton,
  InputLabel,
  MenuItem,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import { FC } from 'react';
import {
  Control,
  Controller,
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormSetValue
} from 'react-hook-form';

import { useAppSelector } from '../../../app/hooks';
import Completion from '../../../models/Completion';
import ThemeMode from '../../../models/ThemeMode';
import { selectThemeMode } from '../../../store/theme/theme.selectors';
import { FormValues } from '../TrackerForm/types';
import CompletionQuantityTextField from '../completions/CompletionQuantityTextField';
import CompletionUnitSelect from '../completions/CompletionUnitSelect';
import {
  computeDecrementedQuantity,
  computeIncrementedQuantity
} from '../completions/computeNewQuantity';

export const FieldsetGrid = styled(Grid)`
  border: 1px solid rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  padding: 8px;
`;

interface Props {
  append: UseFieldArrayAppend<FormValues, 'defaultCompletions'>;
  control: Control<FormValues, any> /* eslint-disable-line @typescript-eslint/no-explicit-any */;
  defaultCompletions: Completion[];
  fields: FieldArrayWithId<FormValues, 'defaultCompletions', 'id'>[];
  gridProps?: GridProps;
  remove: UseFieldArrayRemove;
  requiredCompletions: Completion[];
  setValue: UseFormSetValue<FormValues>;
}

const DefaultCompletionsForm: FC<Props> = ({
  append,
  control,
  defaultCompletions,
  fields,
  gridProps,
  remove,
  requiredCompletions,
  setValue
}) => {
  const themeMode = useAppSelector(selectThemeMode);
  const theme = useTheme();
  const [animateRef] = useAutoAnimate<HTMLDivElement>();

  const fieldsetSx = {
    bgcolor: themeMode === ThemeMode.LIGHT ? theme.palette.grey[100] : theme.palette.grey[900],
    mb: 1
  };

  return (
    <Box ref={animateRef}>
      {fields.map((field, index) => (
        <FieldsetGrid columns={2} container key={field.id} sx={fieldsetSx} {...gridProps}>
          <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="subtitle1">Réalisation par défaut n°{index + 1}</Typography>
            <IconButton onClick={() => remove(index)} sx={{ p: 0 }}>
              <DeleteIcon color="error" />
            </IconButton>
          </Grid>
          <Grid item xs={1}>
            <Controller
              control={control}
              name={`defaultCompletions.${index}.quantity` as const}
              rules={{
                min: 1,
                pattern: /^\d+$/,
                required: true
              }}
              render={({ field: { name, onChange, value }, fieldState: { error } }) => {
                let errorText = '';
                if (error) {
                  switch (error.type) {
                    case 'min':
                      errorText = 'La quantité doit être supérieure ou égale à 1.';
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
                  <CompletionQuantityTextField
                    onDecrement={() => setValue(name, computeDecrementedQuantity(value))}
                    onIncrement={() => setValue(name, computeIncrementedQuantity(value))}
                    textFieldProps={{
                      error: !!error,
                      helperText: error && errorText,
                      onChange: onChange,
                      required: true,
                      size: 'small',
                      sx: { mb: 1 },
                      value: value || ''
                    }}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={1}>
            <Controller
              control={control}
              name={`defaultCompletions.${index}.unit` as const}
              rules={{
                required: true
              }}
              render={({ field: { onChange, value }, fieldState: { error } }) => {
                let errorText = '';
                if (error) {
                  switch (error.type) {
                    case 'required':
                      errorText = "L'unité est requise";
                      break;
                  }
                }
                return (
                  <FormControl fullWidth error={!!error} size="small">
                    <InputLabel>Unité</InputLabel>
                    <CompletionUnitSelect
                      required
                      value={(requiredCompletions.find((rc) => rc.unit === value) && value) || ''}
                      label="Unité"
                      onChange={onChange}
                      size="small">
                      {requiredCompletions
                        .filter((rc) => rc.unit && rc.unit !== '')
                        .map((rc) => (
                          <MenuItem
                            key={rc.unit}
                            value={rc.unit}
                            disabled={defaultCompletions.some((dc) => dc.unit === rc.unit)}>
                            {rc.unit}
                          </MenuItem>
                        ))}
                    </CompletionUnitSelect>
                    <FormHelperText>{error ? errorText : ''}</FormHelperText>
                  </FormControl>
                );
              }}
            />
          </Grid>
        </FieldsetGrid>
      ))}

      <Tooltip
        title={
          requiredCompletions.length === defaultCompletions.length
            ? 'Tous les objectifs ont déjà une réalisation par défaut.'
            : ''
        }>
        <span>
          <Button
            disabled={requiredCompletions.length === defaultCompletions.length}
            onClick={() => append({})}
            startIcon={<AddCircleOutlineIcon />}
            sx={{ mb: 2 }}
            variant="contained">
            Réalisation par défaut
          </Button>
        </span>
      </Tooltip>
    </Box>
  );
};

export default DefaultCompletionsForm;

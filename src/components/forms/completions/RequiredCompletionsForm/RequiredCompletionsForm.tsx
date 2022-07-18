import styled from '@emotion/styled';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import HelpIcon from '@mui/icons-material/Help';
import { Box, Button, Grid, GridProps, IconButton, Typography, useTheme } from '@mui/material';
import { FC, useRef, useState } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import { useAppSelector } from '../../../../hooks/redux';
import { useAutoAnimate } from '../../../../hooks/useAutoAnimate';
import Completion from '../../../../models/Completion';
import ThemeMode from '../../../../models/ThemeMode';
import { selectThemeMode } from '../../../../store/theme/theme.selectors';
import { validateFacultativePositiveFloat } from '../../../../utils/validateNumber';
import Popover from '../../../Popover/Popover';
import CompletionQuantityTextField from '../CompletionQuantityTextField';
import CompletionUnitTextField from '../CompletionUnitTextField';
import { computeDecrementedStringQuantity, computeIncrementedStringQuantity } from '../utils';

export const FieldsetGrid = styled(Grid)`
  border: 1px solid rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  padding: 8px;
`;

interface Props {
  gridProps?: GridProps;
  requiredCompletions: Completion[];
  valueName: string;
}

/**
 * This forms is used to create one or many requiredCompletions for a new tracker.
 */
const RequiredCompletionsForm: FC<Props> = ({ requiredCompletions, gridProps, valueName }) => {
  const { control, setValue } = useFormContext();
  const { append, fields, remove } = useFieldArray({
    control,
    name: valueName
  });

  const themeMode = useAppSelector(selectThemeMode);
  const theme = useTheme();
  const animateRef = useRef(null);
  useAutoAnimate(animateRef);

  const fieldsetSx = {
    bgcolor: themeMode === ThemeMode.LIGHT ? theme.palette.grey[100] : theme.palette.grey[900],
    mb: 1
  };

  const uniqueUnit = (v: string) => {
    const nbCompletions = requiredCompletions.filter((v2) => v2.unit === v);
    return nbCompletions.length < 2;
  };

  // Popover management
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'popover-' + name : undefined;

  return (
    <div ref={animateRef}>
      {fields.map((field, index) => (
        <FieldsetGrid columns={2} container key={field.id} sx={fieldsetSx} {...gridProps}>
          <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="subtitle1">Objectif n°{index + 1}</Typography>
            <IconButton onClick={() => remove(index)} sx={{ p: 0 }}>
              <DeleteIcon color="error" />
            </IconButton>
          </Grid>
          <Grid item xs={1}>
            <Controller
              control={control}
              name={`requiredCompletions.${index}.quantity` as const}
              rules={{
                required: { value: true, message: 'La quantité est requise.' },
                validate: (value) =>
                  validateFacultativePositiveFloat(value) ||
                  'La quantité doit être un nombre positif.'
              }}
              render={({ field: { onChange, value, name }, fieldState: { error } }) => (
                <CompletionQuantityTextField
                  onDecrement={() => setValue(name, computeDecrementedStringQuantity(value))}
                  onIncrement={() => setValue(name, computeIncrementedStringQuantity(value))}
                  textFieldProps={{
                    id: 'required-completion-quantity-' + index,
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
              name={`requiredCompletions.${index}.unit` as const}
              rules={{
                required: true,
                validate: {
                  uniqueUnit
                }
              }}
              render={({ field: { onChange, value }, fieldState: { error } }) => {
                let errorText = '';
                if (error) {
                  switch (error.type) {
                    case 'uniqueUnit':
                      errorText = 'Les unités doivent toutes être différentes.';
                      break;

                    case 'required':
                      errorText = "L'unité est requise";
                      break;
                  }
                }
                return (
                  <CompletionUnitTextField
                    id={'required-completion-unit-' + index}
                    error={!!error}
                    helperText={error && errorText}
                    label={'Unité'}
                    onChange={onChange}
                    required
                    size="small"
                    sx={{ mb: 1 }}
                    value={value}
                  />
                );
              }}
            />
          </Grid>
        </FieldsetGrid>
      ))}
      <Box mb={2} display="flex" justifyContent="center" alignItems="center">
        <Button onClick={() => append({})} startIcon={<AddCircleOutlineIcon />} variant="contained">
          Objectif
        </Button>
        <IconButton color="primary" onClick={handleClick}>
          <HelpIcon />
        </IconButton>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          text={
            "Les objectifs définissent ce que vous devez accomplir pour valider le tracker. Ils se component d'une quantité et d'une unité."
          }
        />
      </Box>
    </div>
  );
};

export default RequiredCompletionsForm;

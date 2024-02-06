import styled from '@emotion/styled';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import HelpIcon from '@mui/icons-material/Help';
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
import { FC, useState } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import { useAppSelector } from '../../../../hooks/redux';
import Completion from '../../../../models/Completion';
import ThemeMode from '../../../../models/ThemeMode';
import { selectThemeMode } from '../../../../store/theme/theme.selectors';
import { validateFacultativePositiveFloat } from '../../../../utils/validateNumber';
import Popover from '../../../Popover/Popover';
import CompletionQuantityTextField from '../CompletionQuantityTextField';
import CompletionUnitSelect from '../CompletionUnitSelect';
import { computeDecrementedStringQuantity, computeIncrementedStringQuantity } from '../utils';

export const FieldsetGrid = styled(Grid)`
  border: 1px solid rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  padding: 8px;
`;

interface Props {
  defaultCompletions: Completion[];
  gridProps?: GridProps;
  requiredCompletions: Completion[];
  valueName: string;
}

const DefaultCompletionsForm: FC<Props> = ({
  defaultCompletions,
  gridProps,
  requiredCompletions,
  valueName
}) => {
  const { control, setValue } = useFormContext();
  const { append, fields, remove } = useFieldArray({
    control,
    name: valueName
  });
  const themeMode = useAppSelector(selectThemeMode);
  const theme = useTheme();
  const [animateRef] = useAutoAnimate();

  const fieldsetSx = {
    bgcolor: themeMode === ThemeMode.LIGHT ? theme.palette.grey[100] : theme.palette.grey[900],
    mb: 1
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
                required: { value: true, message: 'La quantité est requise.' },
                validate: (value) =>
                  validateFacultativePositiveFloat(value) ||
                  'La quantité doit être un nombre positif.'
              }}
              render={({ field: { name, onChange, value }, fieldState: { error } }) => (
                <CompletionQuantityTextField
                  onDecrement={() => setValue(name, computeDecrementedStringQuantity(value))}
                  onIncrement={() => setValue(name, computeIncrementedStringQuantity(value))}
                  textFieldProps={{
                    id: 'default-completion-quantity-' + index,
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
                      id={'default-completion-unit-' + index}
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

      <Box mb={2} display="flex" justifyContent="center" alignItems="center">
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
              variant="contained">
              Réalisation par défaut
            </Button>
          </span>
        </Tooltip>
        <IconButton color="primary" onClick={handleClick}>
          <HelpIcon />
        </IconButton>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          text={
            "Les réalisations par défaut définissent, lors de la validation du tracker, quelle portion de l'objectif vous réalisez. Si vous n'en spécifiez aucune, celles-ci seront égales aux objectifs."
          }
        />
      </Box>
    </Box>
  );
};

export default DefaultCompletionsForm;

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, IconButton, Typography } from '@mui/material';
import { BaseToolbarProps } from '@mui/x-date-pickers/internals/models/props/baseToolbarProps';
import { FC } from 'react';

type Props = BaseToolbarProps<Date | null>;

const WeekPickerToolbar: FC<Props> = (props) => {
  const { isMobileKeyboardViewOpen, toggleMobileKeyboardView } = props;
  return (
    <Box
      onClick={toggleMobileKeyboardView}
      display="flex"
      alignItems={'center'}
      justifyContent="space-between">
      <Typography>
        {isMobileKeyboardViewOpen ? 'SEMAINE CHOISIE' : 'CHOIX DE LA SEMAINE'}
      </Typography>
      <IconButton sx={{ p: 0.5 }}>
        {isMobileKeyboardViewOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </IconButton>
    </Box>
  );
};

export default WeekPickerToolbar;

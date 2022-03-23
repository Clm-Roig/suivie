import { Box, IconButton, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import formatDate from '../../utils/formatDate';

const DateSelector = () => {
  return (
    <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', width: '100%' }}>
      <IconButton>
        <ChevronLeftIcon color="primary" fontSize="large" />
      </IconButton>
      <Typography variant="h5">{formatDate(new Date())}</Typography>
      <IconButton>
        <ChevronRightIcon color="primary" fontSize="large" />
      </IconButton>
    </Box>
  );
};

export default DateSelector;

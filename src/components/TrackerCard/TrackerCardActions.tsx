import { FC } from 'react';
import { Box, CardActions, CardActionsProps, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckIcon from '@mui/icons-material/Check';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface Props {
  cardActionsProps?: CardActionsProps;
}

const TrackerCardActions: FC<Props> = ({ cardActionsProps }) => {
  return (
    <CardActions {...cardActionsProps}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <IconButton color="primary" size="large">
          <CheckIcon fontSize="large" />
        </IconButton>
        <IconButton color="primary" size="large">
          <CheckCircleIcon fontSize="large" />
        </IconButton>
        <IconButton color="primary" size="large">
          <VisibilityOffIcon fontSize="large" />
        </IconButton>
      </Box>
    </CardActions>
  );
};

export default TrackerCardActions;

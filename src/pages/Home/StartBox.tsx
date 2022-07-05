import { Box, BoxProps, Button } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';

const StartBox: FC<BoxProps> = (boxProps) => (
  <Box display="flex" justifyContent="center" {...boxProps}>
    <Button component={Link} size="large" to="/trackers" variant="contained">
      🚀 Commencer
    </Button>
  </Box>
);
export default StartBox;

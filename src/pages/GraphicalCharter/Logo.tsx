import { Typography } from '@mui/material';
import { Box } from '@mui/system';

import AppLogo from '../../components/AppLogo';

const Logo = () => {
  return (
    <Box>
      <Typography variant="h3" component="h2" gutterBottom>
        Logo
      </Typography>
      <Box display="flex" justifyContent="space-between" flexWrap="wrap">
        <AppLogo height="90px" color="lightBlue" />
        <Box bgcolor="black">
          <AppLogo height="90px" color="white" />
        </Box>
        <Box bgcolor="white">
          <AppLogo height="90px" color="black" />
        </Box>
      </Box>
    </Box>
  );
};

export default Logo;

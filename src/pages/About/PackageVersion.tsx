import { Box, Typography } from '@mui/material';

import packageInfo from '../../../package.json';

const PackageVersion = () => (
  <Box
    bgcolor="primary.main"
    color="common.white"
    px={1}
    style={{ bottom: 0, right: 0, position: 'fixed' }}>
    <Typography>v{packageInfo.version}</Typography>
  </Box>
);
export default PackageVersion;

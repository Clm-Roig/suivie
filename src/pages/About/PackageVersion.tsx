import { Box, BoxProps, Typography } from '@mui/material';
import { FC } from 'react';

import packageInfo from '../../../package.json';

const PackageVersion: FC<BoxProps> = (boxProps) => (
  <Box bgcolor="primary.main" color="common.white" px={1} {...boxProps}>
    <Typography>v{packageInfo.version}</Typography>
  </Box>
);
export default PackageVersion;

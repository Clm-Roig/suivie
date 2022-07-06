import { Box } from '@mui/material';
import { FC } from 'react';

import ChildrenProp from '../../types/ChildrenProp';

const SpacedBox: FC<ChildrenProp> = ({ children }) => <Box mb={1}>{children}</Box>;

export default SpacedBox;

import { Theme } from '@mui/material';

import ThemeMode from '../../models/ThemeMode';

const defaultCardProps = (themeMode: ThemeMode, theme: Theme) => ({
  sx: {
    mb: 2,
    bgcolor: themeMode === ThemeMode.LIGHT ? 'secondary.main' : theme.palette.grey[900]
  }
});

export default defaultCardProps;

import { ListSubheader, Stack } from '@mui/material';
import { FC } from 'react';

import { useAppSelector } from '../../../hooks/redux';
import ThemeMode from '../../../models/ThemeMode';
import { selectThemeMode } from '../../../store/theme/theme.selectors';

interface TrackerListSubheaderProps {
  text: string;
  icon: React.ReactNode; // MUI icon
}

const TrackerListSubheader: FC<TrackerListSubheaderProps> = ({ text, icon }) => {
  const themeMode = useAppSelector(selectThemeMode);
  const sx = {
    bgcolor: themeMode === ThemeMode.DARK ? 'primary.main' : 'primary.main',
    color: themeMode === ThemeMode.DARK ? 'primary.contrastText' : 'primary.contrastText'
  };

  return (
    <ListSubheader sx={sx} alignItems="center" gap={1} direction="row" component={Stack}>
      <>
        {icon}
        {text}
      </>
    </ListSubheader>
  );
};

export default TrackerListSubheader;

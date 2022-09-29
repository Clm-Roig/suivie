import DarkModeIcon from '@mui/icons-material/DarkMode';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Box, Divider, Fab, Tooltip, Typography } from '@mui/material';
import { Stack } from '@mui/system';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import ThemeMode from '../../models/ThemeMode';
import { selectThemeMode } from '../../store/theme/theme.selectors';
import { toggleThemeMode } from '../../store/theme/themeSlice';
import Buttons from './Buttons';
import Colors from './Colors';
import Components from './Components';
import Logo from './Logo';
import AppTypography from './Typography';

const GraphicalCharter = () => {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector(selectThemeMode);
  return (
    // Little padding to avoid bottom floating buttons to overlap the page
    <Box pb={8}>
      <Typography variant="h1" gutterBottom>
        Charte Graphique
      </Typography>

      <Tooltip title="Changer le thème">
        <Fab
          color="primary"
          size="medium"
          aria-label="Theme toggler"
          sx={{
            position: 'fixed',
            bottom: 16,
            left: 16
          }}
          onClick={() => dispatch(toggleThemeMode())}>
          {themeMode === ThemeMode.DARK ? <DarkModeIcon /> : <LightModeIcon />}{' '}
        </Fab>
      </Tooltip>

      <Tooltip title="Remonter en haut">
        <Fab
          color="primary"
          size="medium"
          aria-label="scroll back to top"
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <KeyboardArrowUpIcon />
        </Fab>
      </Tooltip>

      <Stack divider={<Divider sx={{ borderWidth: '1px' }} />} spacing={3}>
        <Logo />
        <Colors />
        <AppTypography />
        <Buttons />
        <Components />
      </Stack>
    </Box>
  );
};

export default GraphicalCharter;

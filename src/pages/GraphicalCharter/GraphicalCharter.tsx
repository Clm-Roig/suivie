import DarkModeIcon from '@mui/icons-material/DarkMode';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Divider, Fab, Tooltip, Typography } from '@mui/material';
import { Stack } from '@mui/system';

import DefaultPageLayout from '../../components/DefaultPageLayout/DefaultPageLayout';
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
    <>
      {/* Little margin to avoid bottom floating buttons to overlap the page */}
      <DefaultPageLayout mb={8}>
        <Typography variant="h1" gutterBottom>
          Charte Graphique
        </Typography>

        <Stack divider={<Divider sx={{ borderWidth: '1px' }} />} spacing={3}>
          <Logo />
          <Colors />
          <AppTypography />
          <Buttons />
          <Components />
        </Stack>
      </DefaultPageLayout>
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
    </>
  );
};

export default GraphicalCharter;

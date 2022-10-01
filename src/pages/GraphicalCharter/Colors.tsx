import { Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery/useMediaQuery';
import { Box, Stack, useTheme } from '@mui/system';
import { FC } from 'react';

import TrackerColor from '../../models/TrackerColor';

interface ColorBlockProps {
  color: string;
  legend: string;
}
const ColorBlock: FC<ColorBlockProps> = ({ color, legend }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box bgcolor={color} width="2.5rem" height="2.5rem" borderRadius="50%" />
      <Typography variant="subtitle1">{legend}</Typography>
    </Box>
  );
};

const Colors = () => {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery('(min-width:660px)');
  return (
    <>
      <Typography variant="h2">Couleurs</Typography>
      <Box
        columnGap={4}
        display="flex"
        flexDirection={isMediumScreen ? 'row' : 'column'}
        flexWrap="wrap">
        <Box>
          <Typography variant="h5" component="h3">
            Primaires
          </Typography>
          <Stack direction="row" gap={2} mb={1}>
            <ColorBlock color={theme.palette.primary.main} legend="main" />
            <ColorBlock color={theme.palette.primary.light} legend="light" />
            <ColorBlock color={theme.palette.primary.dark} legend="dark" />
          </Stack>
        </Box>
        <Box>
          <Typography variant="h5" component="h3">
            Secondaires
          </Typography>
          <Stack direction="row" gap={2}>
            <ColorBlock color={theme.palette.secondary.main} legend="main" />
            <ColorBlock color={theme.palette.secondary.light} legend="light" />
            <ColorBlock color={theme.palette.secondary.dark} legend="dark" />
          </Stack>
        </Box>
        <Box>
          <Typography variant="h5" component="h3">
            Contextuelles
          </Typography>
          <Stack direction="row" gap={2}>
            <ColorBlock color={theme.palette.info.main} legend="info" />
            <ColorBlock color={theme.palette.warning.main} legend="warning" />
            <ColorBlock color={theme.palette.error.main} legend="error" />
            <ColorBlock color={theme.palette.success.main} legend="success" />
          </Stack>
        </Box>
        <Box>
          <Typography variant="h5" component="h3">
            Trackers
          </Typography>
          <Stack direction="row" gap={2}>
            <ColorBlock color={TrackerColor.BLIZZARD_BLUE} legend="Bleu" />
            <ColorBlock color={TrackerColor.RED_PINK} legend="Rouge" />
            <ColorBlock color={TrackerColor.SEA_FOG_GREY} legend="Gris" />
            <ColorBlock color={TrackerColor.SULU_GREEN} legend="Vert" />
            <ColorBlock color={TrackerColor.YELLOW_CORN} legend="Jaune" />
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default Colors;

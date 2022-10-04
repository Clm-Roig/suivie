import { Typography as MuiTypography, TypographyVariant } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { FC } from 'react';

import { useAppSelector } from '../../hooks/redux';
import ThemeMode from '../../models/ThemeMode';
import { selectThemeMode } from '../../store/theme/theme.selectors';

interface BodyTypographyBlockProps {
  typoVariant: TypographyVariant;
  legend: string;
}
const BodyTypographyBlock: FC<BodyTypographyBlockProps> = ({ typoVariant, legend }) => {
  const themeMode = useAppSelector(selectThemeMode);
  return (
    <Box display="flex" flexDirection="row">
      <MuiTypography
        color={themeMode === ThemeMode.DARK ? 'white' : 'black'}
        flex="0 0 120px"
        alignSelf="center">
        {legend}
      </MuiTypography>
      <MuiTypography variant={typoVariant} component="p">
        SuiVie est une application web mobile vous permettant de suivre vos habitudes et de vous
        donner des statistiques sur celles-ci.
      </MuiTypography>
    </Box>
  );
};

const Typography = () => {
  return (
    <Stack spacing={1}>
      <MuiTypography variant="h2">Typographie</MuiTypography>
      {[1, 2, 3, 4, 5, 6].map((x) => (
        <MuiTypography key={x} variant={('h' + x) as TypographyVariant}>
          Titre {x}
        </MuiTypography>
      ))}

      <BodyTypographyBlock legend="CORPS 1" typoVariant="body1" />
      <BodyTypographyBlock legend="CORPS 2" typoVariant="body2" />
      <BodyTypographyBlock legend="LÉGENDE" typoVariant="caption" />
      <BodyTypographyBlock legend="SOUS-TITRE 1" typoVariant="subtitle1" />
      <BodyTypographyBlock legend="SOUS-TITRE 2" typoVariant="subtitle2" />
    </Stack>
  );
};

export default Typography;

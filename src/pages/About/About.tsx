import GitHubIcon from '@mui/icons-material/GitHub';
import PaletteIcon from '@mui/icons-material/Palette';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { Box, Button, Link, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import DefaultPageLayout from '../../components/DefaultPageLayout/DefaultPageLayout';
import ExternalLink from '../../components/ExternalLink/ExternalLink';
import { APP_NAME, PAYPAL_DONATE_URL } from '../../config/Constants';
import PackageVersion from './PackageVersion';

function About() {
  return (
    <>
      <DefaultPageLayout>
        <Box display="flex" flexDirection="column">
          <Typography gutterBottom variant="h1">
            À propos de {APP_NAME}
          </Typography>
          <Stack spacing={2} textAlign="center">
            <Typography>
              {"L'interface de " + APP_NAME + ' est '}
              <b>optimisée pour mobile</b>.
            </Typography>
            <Typography>
              Application développée avec passion par{' '}
              <ExternalLink href="https://github.com/clm-roig">Clément ROIG</ExternalLink>
            </Typography>
            <Typography>
              Merci à <ExternalLink href="https://laurakaczmarek.fr">Laura KACZMAREK</ExternalLink>{' '}
              pour le logo ❤
            </Typography>
            <Link component={RouterLink} to="/graphical-charter">
              <Box display="flex" justifyContent="center">
                <PaletteIcon sx={{ mr: 1 }} />
                <Typography>Charte Graphique</Typography>
              </Box>
            </Link>
            <Typography>
              <GitHubIcon sx={{ mr: 1 }} />
              Code source disponible sur{' '}
              <ExternalLink href="https://github.com/clm-roig/suivie">Github</ExternalLink>
            </Typography>
            <Link sx={{ mx: 'auto' }} target="_blank" rel="noreferrer" href={PAYPAL_DONATE_URL}>
              <Button color="secondary" variant="contained" endIcon={<VolunteerActivismIcon />}>
                Faire un don
              </Button>
            </Link>
          </Stack>
        </Box>
      </DefaultPageLayout>
      <PackageVersion style={{ bottom: 0, right: 0, position: 'fixed' }} />
    </>
  );
}
export default About;

import GitHubIcon from '@mui/icons-material/GitHub';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { Box, Button, Link, Stack, Typography } from '@mui/material';

import packageInfo from '../../package.json';
import ExternalLink from '../components/ExternalLink/ExternalLink';
import { APP_NAME, PAYPAL_DONATE_LINK } from '../config/Constants';

function About() {
  return (
    <>
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
            pour le logo et le design ❤
          </Typography>
          <Typography>
            Code source disponible sur{' '}
            <ExternalLink href="https://github.com/clm-roig/suivie">Github</ExternalLink>
            <GitHubIcon />
          </Typography>
          <Link sx={{ mx: 'auto' }} target="_blank" rel="noreferrer" href={PAYPAL_DONATE_LINK}>
            <Button color="secondary" variant="contained" endIcon={<VolunteerActivismIcon />}>
              Faire un don
            </Button>
          </Link>
        </Stack>
      </Box>
      <Box sx={{ mr: 1 }} style={{ bottom: 0, right: 0, position: 'absolute' }}>
        <Typography>v{packageInfo.version}</Typography>
      </Box>
    </>
  );
}
export default About;

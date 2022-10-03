import GitHubIcon from '@mui/icons-material/GitHub';
import PaletteIcon from '@mui/icons-material/Palette';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { Box, Button, Divider, Link, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import ExternalLink from '../../components/ExternalLink/ExternalLink';
import {
  APP_NAME,
  BUG_REPORT_FORM_URL,
  IMPROVEMENT_SUGGESTION_FORM_URL,
  PAYPAL_DONATE_URL
} from '../../config/Constants';
import PackageVersion from './PackageVersion';

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

      <Divider sx={{ my: 2 }} />

      <Box>
        <Typography variant="h2" gutterBottom>
          Suggérer une amélioration
        </Typography>
        <iframe src={IMPROVEMENT_SUGGESTION_FORM_URL} width="100%" height="600"></iframe>
        <Typography>
          {
            "Si le formulaire n'apparaît pas ci-dessus, vous pouvez le remplir en suivant ce lien : "
          }
          <ExternalLink href={IMPROVEMENT_SUGGESTION_FORM_URL}>
            {"SuiVie - Suggestion d'amélioration"}
          </ExternalLink>
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box>
        <Typography variant="h2" gutterBottom>
          Signaler un bug
        </Typography>
        <iframe src={BUG_REPORT_FORM_URL} width="100%" height="600"></iframe>
        <Typography>
          {
            "Si le formulaire n'apparaît pas ci-dessus, vous pouvez le remplir en suivant ce lien : "
          }
          <ExternalLink href={BUG_REPORT_FORM_URL}>SuiVie - Rapport de bug</ExternalLink>
        </Typography>
      </Box>

      <PackageVersion style={{ bottom: 0, right: 0, position: 'fixed' }} />
    </>
  );
}
export default About;

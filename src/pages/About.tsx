import { Box, Button, Link, Stack, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import ExternalLink from '../components/ExternalLink/ExternalLink';
import { PAYPAL_DONATE_LINK } from '../config/Constants';

function About() {
  return (
    <Box display="flex" flexDirection="column">
      <Typography gutterBottom variant="h1">
        À propos de Bujo Tracker
      </Typography>
      <Stack spacing={2} textAlign="center">
        <Typography>
          {"L'interface de Bujo Tracker est "}
          <b>optimisée pour mobile</b>.
        </Typography>
        <Typography>
          Application développée avec passion par{' '}
          <ExternalLink href="https://github.com/clm-roig">Clément ROIG</ExternalLink>
        </Typography>
        <Typography>
          Merci à <ExternalLink href="https://laurakaczmarek.fr">Laura KACZMAREK</ExternalLink> pour
          le design ❤
        </Typography>
        <Typography>
          Code source disponible sur{' '}
          <ExternalLink href="https://github.com/clm-roig/bujo-tracker">Github</ExternalLink>
          <GitHubIcon />
        </Typography>
        <Link sx={{ mx: 'auto' }} target="_blank" rel="noreferrer" href={PAYPAL_DONATE_LINK}>
          <Button color="secondary" variant="contained" endIcon={<VolunteerActivismIcon />}>
            Faire un don
          </Button>
        </Link>
      </Stack>
    </Box>
  );
}
export default About;

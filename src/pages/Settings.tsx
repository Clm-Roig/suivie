import { Button, Stack, Typography } from '@mui/material';

function Settings() {
  return (
    <>
      <Typography gutterBottom variant="h1">
        Paramètres
      </Typography>
      <Stack spacing={2} direction="column">
        <Typography>Fonctionnalités en cours de développement</Typography>
        <Button disabled variant="contained">
          Importer des données
        </Button>
        <Button disabled variant="contained">
          Exporter les données
        </Button>
        <Button disabled variant="contained" color="error">
          Supprimer toutes les données
        </Button>
      </Stack>
    </>
  );
}
export default Settings;

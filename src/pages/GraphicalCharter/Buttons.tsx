import { Button, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';

const generateButtons = (variant: 'text' | 'outlined' | 'contained') => (
  <>
    <Button variant={variant}>Standard</Button>
    <Button variant={variant} color="secondary">
      Secondaire
    </Button>
    <Button variant={variant} color="info">
      Info
    </Button>
    <Button variant={variant} color="warning">
      Avertissement
    </Button>
    <Button variant={variant} color="error">
      Erreur
    </Button>
    <Button variant={variant} color="success">
      Succès
    </Button>
  </>
);

const Buttons = () => {
  return (
    <Box>
      <Typography variant="h3" component="h2" gutterBottom>
        Boutons
      </Typography>
      <Stack mb={2} direction="row" flexWrap="wrap" gap={1}>
        {generateButtons('contained')}
      </Stack>
      <Stack mb={2} direction="row" flexWrap="wrap" gap={1}>
        {generateButtons('text')}
      </Stack>
      <Stack direction="row" flexWrap="wrap" gap={1}>
        {generateButtons('outlined')}
      </Stack>
    </Box>
  );
};

export default Buttons;

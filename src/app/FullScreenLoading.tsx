import { Box, CircularProgress, Typography } from '@mui/material';

function FullScreenLoading() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'center'
      }}>
      <Typography variant="h4" align="center">
        Chargement des données...
      </Typography>
      <CircularProgress size={50} sx={{ mt: 4 }} />
    </Box>
  );
}

export default FullScreenLoading;

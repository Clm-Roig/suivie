import { Divider, Stack, Typography } from '@mui/material';

import DeleteSection from '../components/settings/DeleteSection';
import ExportSection from '../components/settings/ExportSection';
import ImportSection from '../components/settings/ImportSection';

const Settings = () => {
  return (
    <>
      <Typography gutterBottom variant="h1">
        Paramètres
      </Typography>
      <Stack spacing={2} direction="column">
        <ImportSection />
        <Divider />
        <ExportSection />
        <Divider />
        <DeleteSection />
      </Stack>
    </>
  );
};
export default Settings;

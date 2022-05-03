import { ListSubheader, Stack } from '@mui/material';
import { FC } from 'react';

interface TrackerListSubheaderProps {
  text: string;
  icon: React.ReactNode; // MUI icon
}

const TrackerListSubheader: FC<TrackerListSubheaderProps> = ({ text, icon }) => (
  <ListSubheader disableGutters alignItems="center" gap={1} direction="row" component={Stack}>
    <>
      {icon}
      {text}
    </>
  </ListSubheader>
);

export default TrackerListSubheader;

import ArchiveIcon from '@mui/icons-material/Archive';
import BallotIcon from '@mui/icons-material/Ballot';
import CheckIcon from '@mui/icons-material/Check';
import { List, ListProps, ListSubheader, Stack } from '@mui/material';
import { FC } from 'react';

import Tracker from '../../models/Tracker';
import TrackerStatus from '../../models/TrackerStatus';
import TrackerListItem from './TrackerListItem/TrackerListItem';

interface Props {
  listProps?: ListProps;
  trackers: Tracker[];
}

const TrackerList: FC<Props> = ({ trackers, listProps }) => {
  const archivedTrackers = trackers.filter((t) => t.status === TrackerStatus.archived);
  const activeTrackers = trackers.filter((t) => t.status === TrackerStatus.active);
  const doneTrackers = trackers.filter((t) => t.status === TrackerStatus.done);
  return (
    <List {...listProps}>
      {archivedTrackers.length > 0 && (
        <ListSubheader alignItems="center" gap={1} direction="row" component={Stack}>
          <ArchiveIcon />
          ARCHIVÉS
        </ListSubheader>
      )}
      {archivedTrackers.map((t) => (
        <TrackerListItem tracker={t} key={t.id} />
      ))}
      {activeTrackers.length > 0 && (
        <ListSubheader alignItems="center" gap={1} direction="row" component={Stack}>
          <BallotIcon />
          ACTIFS
        </ListSubheader>
      )}
      {activeTrackers.map((t) => (
        <TrackerListItem tracker={t} key={t.id} />
      ))}
      {doneTrackers.length > 0 && (
        <ListSubheader alignItems="center" gap={1} direction="row" component={Stack}>
          <CheckIcon />
          FAITS
        </ListSubheader>
      )}
      {doneTrackers.map((t) => (
        <TrackerListItem tracker={t} key={t.id} />
      ))}
    </List>
  );
};

export default TrackerList;

import ArchiveIcon from '@mui/icons-material/Archive';
import BallotIcon from '@mui/icons-material/Ballot';
import CheckIcon from '@mui/icons-material/Check';
import { List, ListProps } from '@mui/material';
import { FC, useState } from 'react';

import Tracker from '../../models/Tracker';
import TrackerStatus from '../../models/TrackerStatus';
import TrackerListActions from './TrackerListActions/TrackerListActions';
import TrackerListItem from './TrackerListItem/TrackerListItem';
import TrackerListSubheader from './TrackerListSubheader/TrackerListSubheader';

interface Props {
  listProps?: ListProps;
  trackers: Tracker[];
}

const TrackerList: FC<Props> = ({ trackers, listProps }) => {
  const [selectedTrackers, setSelectedTrackers] = useState<Tracker[]>([]);
  const archivedTrackers = trackers.filter((t) => t.status === TrackerStatus.archived);
  const activeTrackers = trackers.filter((t) => t.status === TrackerStatus.active);
  const doneTrackers = trackers.filter((t) => t.status === TrackerStatus.done);

  const toggleTrackerChecked = (tracker: Tracker) => {
    const trackerIdx = selectedTrackers.indexOf(tracker);
    if (trackerIdx === -1) {
      setSelectedTrackers([...selectedTrackers, tracker]);
    } else {
      const newChecked = selectedTrackers.filter((id) => id !== tracker);
      setSelectedTrackers(newChecked);
    }
  };

  return (
    <>
      <TrackerListActions
        selectedTrackers={selectedTrackers}
        setSelectedTrackers={setSelectedTrackers}
        trackers={trackers}
      />

      <List {...listProps}>
        {archivedTrackers.length > 0 && (
          <TrackerListSubheader icon={<ArchiveIcon />} text="ARCHIVÉS" />
        )}
        {archivedTrackers.map((t) => (
          <TrackerListItem
            checked={selectedTrackers.indexOf(t) !== -1}
            toggleTrackerChecked={toggleTrackerChecked}
            tracker={t}
            key={t.id}
          />
        ))}
        {activeTrackers.length > 0 && <TrackerListSubheader icon={<BallotIcon />} text="ACTIFS" />}
        {activeTrackers.map((t) => (
          <TrackerListItem
            checked={selectedTrackers.indexOf(t) !== -1}
            toggleTrackerChecked={toggleTrackerChecked}
            tracker={t}
            key={t.id}
          />
        ))}
        {doneTrackers.length > 0 && <TrackerListSubheader icon={<CheckIcon />} text="FAITS" />}
        {doneTrackers.map((t) => (
          <TrackerListItem
            checked={selectedTrackers.indexOf(t) !== -1}
            toggleTrackerChecked={toggleTrackerChecked}
            tracker={t}
            key={t.id}
          />
        ))}
      </List>
    </>
  );
};

export default TrackerList;

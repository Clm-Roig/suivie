import { useAutoAnimate } from '@formkit/auto-animate/react';
import ArchiveIcon from '@mui/icons-material/Archive';
import MovingIcon from '@mui/icons-material/Moving';
import { List, ListProps } from '@mui/material';
import { FC, useCallback, useState } from 'react';

import Tracker from '../../models/Tracker';
import TrackerStatus from '../../models/TrackerStatus';
import Order from './Order';
import TrackerListActions from './TrackerListActions/TrackerListActions';
import TrackerListItem from './TrackerListItem/TrackerListItem';
import TrackerListSubheader from './TrackerListSubheader/TrackerListSubheader';

interface Props {
  listProps?: ListProps;
  trackers: Tracker[];
}

const TrackerList: FC<Props> = ({ trackers, listProps }) => {
  const [selectedTrackers, setSelectedTrackers] = useState<Tracker[]>([]);
  const [order, setOrder] = useState(Order.ASC);
  const [animateRef] = useAutoAnimate<HTMLUListElement>();
  const sortByName = useCallback(
    (t1: Tracker, t2: Tracker) =>
      order === Order.ASC ? t1.name.localeCompare(t2.name) : -t1.name.localeCompare(t2.name),
    [order]
  );
  const archivedTrackers = trackers
    .filter((t) => t.status === TrackerStatus.ARCHIVED)
    .sort(sortByName);
  const activeTrackers = trackers.filter((t) => t.status === TrackerStatus.ACTIVE).sort(sortByName);

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
        order={order}
        selectedTrackers={selectedTrackers}
        setOrder={setOrder}
        setSelectedTrackers={setSelectedTrackers}
        trackers={trackers}
      />

      <List {...listProps} ref={animateRef}>
        {activeTrackers.length > 0 && <TrackerListSubheader icon={<MovingIcon />} text="ACTIFS" />}
        {activeTrackers.map((t) => (
          <TrackerListItem
            checked={selectedTrackers.indexOf(t) !== -1}
            toggleTrackerChecked={toggleTrackerChecked}
            tracker={t}
            key={t.id}
          />
        ))}
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
      </List>
    </>
  );
};

export default TrackerList;

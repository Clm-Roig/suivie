import { SerializedError } from '@reduxjs/toolkit';

import SliceStatus from '../../models/SliceStatus';
import Tracker from '../../models/Tracker';

export default interface TrackersState {
  error: SerializedError;
  status: SliceStatus;
  trackers: Tracker[];
}

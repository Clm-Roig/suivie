import { SerializedError } from '@reduxjs/toolkit';

import SliceStatus from '../../models/SliceStatus';
import Tracker from '../../models/Tracker';

export default interface TrackersState {
  error: SerializedError;
  selectedDate: string;
  status: SliceStatus;
  trackers: Tracker[];
}

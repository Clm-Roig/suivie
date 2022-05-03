import { PayloadAction, SerializedError, createSlice } from '@reduxjs/toolkit';
import { v4 } from 'uuid';

import Completion from '../../models/Completion';
import SliceStatus from '../../models/SliceStatus';
import Tracker from '../../models/Tracker';
import TrackerEntry from '../../models/TrackerEntry';
import TrackerStatus from '../../models/TrackerStatus';

// ===== State

export interface TrackersState {
  error: SerializedError;
  status: SliceStatus;
  trackers: Tracker[];
}

const initialState: TrackersState = {
  error: {},
  status: SliceStatus.idle,
  trackers: []
};

// ===== Thunk

// export const fetchAllTrackers = createAsyncThunk('trackers/fetchAllTrackers', async () => {
//   const response = await TrackersActions.fetchAll();
//   return response.data;
// });

// ===== Reducers

export const trackersSlice = createSlice({
  name: 'trackers',
  initialState,
  reducers: {
    createTracker: (state, action: PayloadAction<Tracker>) => {
      state.trackers.unshift(action.payload);
    },
    completelyValidate: (state, action: PayloadAction<Tracker['id']>) => {
      const trackerFound = state.trackers.find((t) => t.id === action.payload);
      if (trackerFound) {
        trackerFound.entries.push({
          id: v4(),
          completions: trackerFound.requiredCompletions,
          date: new Date().toString(),
          trackerId: trackerFound.id
        } as TrackerEntry);
      }
      return state;
    },
    customValidate: (
      state,
      action: PayloadAction<{ id: Tracker['id']; completions: Completion[] }>
    ) => {
      const trackerFound = state.trackers.find((t) => t.id === action.payload.id);
      if (trackerFound) {
        trackerFound.entries.push({
          id: v4(),
          completions: action.payload.completions,
          date: new Date().toString(),
          trackerId: trackerFound.id
        } as TrackerEntry);
      }
      return state;
    },
    deleteTracker: (state, action: PayloadAction<Tracker['id']>) => {
      const filteredTrackers = state.trackers.filter((t) => t.id !== action.payload);
      return {
        ...state,
        trackers: filteredTrackers
      };
    },
    deleteTrackers: (state, action: PayloadAction<Array<Tracker['id']>>) => {
      const filteredTrackers = state.trackers.filter((t) => !action.payload.includes(t.id));
      return {
        ...state,
        trackers: filteredTrackers
      };
    },
    hideTracker: (state, action: PayloadAction<Tracker['id']>) => {
      const idx = state.trackers.findIndex((t) => t.id === action.payload);
      if (idx !== -1) {
        state.trackers[idx].dateHidden = new Date().toString();
      }
    },
    makeTrackerVisible: (state, action: PayloadAction<Tracker['id']>) => {
      const idx = state.trackers.findIndex((t) => t.id === action.payload);
      if (idx !== -1) {
        state.trackers[idx].dateHidden = undefined;
      }
    },
    archiveTracker: (state, action: PayloadAction<Tracker['id']>) => {
      const idx = state.trackers.findIndex((t) => t.id === action.payload);
      if (idx !== -1) {
        state.trackers[idx].endDate = new Date().toString();
        state.trackers[idx].status = TrackerStatus.archived;
      }
    },
    archiveTrackers: (state, action: PayloadAction<Array<Tracker['id']>>) => {
      const filteredTrackers = state.trackers.filter((t) => action.payload.includes(t.id));
      for (const tracker of filteredTrackers) {
        tracker.endDate = new Date().toString();
        tracker.status = TrackerStatus.archived;
      }
    },
    unarchiveTrackers: (state, action: PayloadAction<Array<Tracker['id']>>) => {
      const filteredTrackers = state.trackers.filter((t) => action.payload.includes(t.id));
      for (const tracker of filteredTrackers) {
        tracker.endDate = undefined;
        tracker.status = TrackerStatus.active;
      }
    },
    makeTrackerDone: (state, action: PayloadAction<Tracker['id']>) => {
      const idx = state.trackers.findIndex((t) => t.id === action.payload);
      if (idx !== -1) {
        state.trackers[idx].endDate = new Date().toString();
        state.trackers[idx].status = TrackerStatus.done;
      }
    },
    makeTrackersDone: (state, action: PayloadAction<Array<Tracker['id']>>) => {
      const filteredTrackers = state.trackers.filter((t) => action.payload.includes(t.id));
      for (const tracker of filteredTrackers) {
        tracker.endDate = new Date().toString();
        tracker.status = TrackerStatus.done;
      }
    },
    makeTrackerActive: (state, action: PayloadAction<Tracker['id']>) => {
      const idx = state.trackers.findIndex((t) => t.id === action.payload);
      if (idx !== -1) {
        state.trackers[idx].endDate = undefined;
        state.trackers[idx].status = TrackerStatus.active;
      }
    },
    makeTrackersActive: (state, action: PayloadAction<Array<Tracker['id']>>) => {
      const filteredTrackers = state.trackers.filter((t) => action.payload.includes(t.id));
      for (const tracker of filteredTrackers) {
        tracker.endDate = undefined;
        tracker.status = TrackerStatus.active;
      }
    }
  }
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  // extraReducers: (builder) => {})
});

export const {
  archiveTracker,
  archiveTrackers,
  createTracker,
  completelyValidate,
  customValidate,
  deleteTracker,
  deleteTrackers,
  hideTracker,
  makeTrackerActive,
  makeTrackersActive,
  makeTrackerDone,
  makeTrackersDone,
  makeTrackerVisible,
  unarchiveTrackers
} = trackersSlice.actions;
export default trackersSlice.reducer;

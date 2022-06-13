import { PayloadAction } from '@reduxjs/toolkit';

import TrackersState from '../TrackersState';

const setSelectedDateReducer = (state: TrackersState, action: PayloadAction<string>) => {
  state.selectedDate = action.payload;
};
export { setSelectedDateReducer };

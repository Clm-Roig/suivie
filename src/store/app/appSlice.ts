import { createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';

const initialState = {};
export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    createStoreFromJSON: () => {
      // Redux creation is handled in rootReducer
    },
    deleteStore: () => {
      storage.removeItem('persist:root');
      // Redux deletion is handled in rootReducer
    }
  }
});

export const { deleteStore } = appSlice.actions;

export default appSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';

const initialState = {};
export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    deleteStore: () => {
      storage.removeItem('persist:root');
    }
  }
});

export const { deleteStore } = appSlice.actions;

export default appSlice.reducer;

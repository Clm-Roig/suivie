import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';

const initialState = {};
export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createStoreFromJSONString: (state, action: PayloadAction<string>) => {
      // Redux creation is handled in rootReducer
    },
    deleteStore: () => {
      storage.removeItem('persist:root');
      // Redux deletion is handled in rootReducer
    }
  }
});

export const { createStoreFromJSONString, deleteStore } = appSlice.actions;

export default appSlice.reducer;

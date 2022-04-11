import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import ThemeMode from '../../models/ThemeMode';

export interface ThemeState {
  themeMode: ThemeMode;
}

const initialState: ThemeState = {
  themeMode: ThemeMode.LIGHT
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.themeMode = action.payload;
    },
    toggleThemeMode: (state) => {
      const { themeMode } = state;
      state.themeMode = themeMode === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT;
    }
  }
});

export const { setThemeMode, toggleThemeMode } = themeSlice.actions;

export default themeSlice.reducer;

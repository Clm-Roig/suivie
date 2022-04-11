import { RootState } from '../store';

const selectThemeMode = (state: RootState) => {
  return state.theme.themeMode;
};

export { selectThemeMode };

import ThemeMode from '../../../models/ThemeMode';
import themeReducer, { setThemeMode, toggleThemeMode } from '../themeSlice';

describe('theme reducer', () => {
  describe('set theme mode', () => {
    it('should set the theme mode', () => {
      const finalState = themeReducer(
        {
          themeMode: ThemeMode.LIGHT
        },
        setThemeMode(ThemeMode.DARK)
      );
      const { themeMode } = finalState;
      expect(themeMode).toEqual(ThemeMode.DARK);
    });
  });
  describe('toggle theme mode', () => {
    it('should toggle the theme mode', () => {
      // From DARK to LIGHT
      let finalState = themeReducer(
        {
          themeMode: ThemeMode.DARK
        },
        toggleThemeMode()
      );
      const { themeMode } = finalState;
      expect(themeMode).toEqual(ThemeMode.LIGHT);

      // From LIGHT to DARK
      finalState = themeReducer(finalState, toggleThemeMode());
      const { themeMode: newThemeMode } = finalState;
      expect(newThemeMode).toEqual(ThemeMode.DARK);
    });
  });
});

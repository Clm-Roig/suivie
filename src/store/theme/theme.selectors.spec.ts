import ThemeMode from '../../models/ThemeMode';
import { createTestStore } from '../createTestStore';
import { RootState } from '../store';
import { selectThemeMode } from './theme.selectors';

let state: RootState;
describe('selectThemeMode()', () => {
  beforeEach(() => {
    state = createTestStore().getState();
  });

  it('should return theme mode', () => {
    const stateWithThemeMode = {
      ...state,
      theme: { themeMode: ThemeMode.DARK }
    };
    const themeMode = selectThemeMode(stateWithThemeMode);
    expect(themeMode).toEqual(ThemeMode.DARK);
  });
});

import { addDays, addYears, startOfDay, startOfToday, subDays, subYears } from 'date-fns';

import { SEVEN_DAYS_AGO_DATE, SEVEN_DAYS_AGO_STRING } from '../../config/Constants';
import SliceStatus from '../../models/SliceStatus';
import ThemeMode from '../../models/ThemeMode';
import Tracker from '../../models/Tracker';
import TrackerStatus from '../../models/TrackerStatus';
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

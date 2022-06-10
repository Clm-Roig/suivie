import { subDays } from 'date-fns';

import { SEVEN_DAYS_AGO_STRING } from '../../../../config/Constants';
import trackersReducer, { initialState, setSelectedDate } from '../../trackersSlice';

describe('set selected date reducer', () => {
  const THREE_DAYS_AGO_STRING = subDays(new Date(), 3).toString();
  it('should set the selected date', () => {
    const finalState = trackersReducer(
      {
        ...initialState,
        trackers: [],
        selectedDate: SEVEN_DAYS_AGO_STRING
      },
      setSelectedDate(THREE_DAYS_AGO_STRING)
    );

    expect(finalState.selectedDate).toEqual(THREE_DAYS_AGO_STRING);
  });
});

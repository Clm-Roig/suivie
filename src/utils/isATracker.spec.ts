import { v4 } from 'uuid';

import makeFakeCompletion from '../models/factories/makeFakeCompletion';
import makeFakeTracker from '../models/factories/makeFakeTracker';
import isATracker from './isATracker';

describe('isATracker helper', () => {
  const basicTracker = makeFakeTracker({
    name: 'A basic tracker'
  });
  const complexTrackerId = v4();
  const completeTracker = makeFakeTracker({
    id: complexTrackerId,
    duration: 8,
    endDate: 'Sun Mar 20 2022 03:50:05 GMT+0100 (Central European Standard Time)',
    requiredCompletions: [
      makeFakeCompletion({
        quantity: 2,
        unit: 'things'
      }),
      makeFakeCompletion({
        quantity: 20,
        unit: 'minutes'
      })
    ],
    remainingDays: 10,
    entries: [
      {
        trackerId: complexTrackerId,
        id: '0987-4567',
        date: 'Fri Mar 18 2022 03:50:05 GMT+0100 (Central European Standard Time)',
        completions: [
          makeFakeCompletion({
            quantity: 1,
            unit: 'things'
          }),
          makeFakeCompletion({
            quantity: 50,
            unit: 'minutes'
          })
        ]
      }
    ]
  });
  it('should validate a minimal tracker', () => {
    expect(isATracker(basicTracker).errors.length).toBe(0);
  });
  it('should validate a complete tracker', () => {
    expect(isATracker(completeTracker).errors.length).toBe(0);
  });
  it('should reject a tracker without id', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...trackerWithoutId } = completeTracker;
    const res = isATracker(trackerWithoutId);
    expect(res.errors.length).toBeGreaterThan(0);
    expect(res.errors[0].key).toBe('id');
    expect(res.errors[0].valueType).toBe('undefined');
    expect(res.errors[0].expectedTypes[0]).toBe('string');
    expect(res.problematicData).toStrictEqual(trackerWithoutId);
  });
  it('should reject a tracker without requiredCompletions', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { requiredCompletions, ...trackerWithoutRequiredCompletions } = completeTracker;
    const res = isATracker(trackerWithoutRequiredCompletions);
    expect(res.errors.length).toBeGreaterThan(0);
    expect(res.errors[0].key).toBe('requiredCompletions');
    expect(res.errors[0].valueType).toBe('undefined');
    expect(res.errors[0].expectedTypes[0]).toBe('array');
    expect(res.problematicData).toStrictEqual(trackerWithoutRequiredCompletions);
  });
  it('should reject a tracker with invalid type on entries', () => {
    const invalidTracker = {
      ...completeTracker,
      entries: 'invalid value for entries'
    };
    const res = isATracker(invalidTracker);
    expect(res.errors.length).toBeGreaterThan(0);
    expect(res.errors[0].key).toBe('entries');
    expect(res.errors[0].valueType).toBe('string');
    expect(res.errors[0].expectedTypes[0]).toBe('array');
    expect(res.problematicData).toStrictEqual(invalidTracker);
  });
});

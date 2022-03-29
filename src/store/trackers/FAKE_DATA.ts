import { subDays } from 'date-fns';
import Tracker from '../../models/Tracker';
import TrackerEntry from '../../models/TrackerEntry';
import TrackerStatus from '../../models/TrackerStatus';

export const testTracker1Id = '123e4567-e89b-12d3-a456-426614174000';
export const testTracker1: Tracker = {
  id: testTracker1Id,
  beginDate: subDays(new Date(), 3).toString(),
  duration: 13,
  name: 'Musculation',
  remainingDays: 10,
  requiredCompletions: [
    {
      quantity: 10,
      unit: 'push-ups'
    },
    {
      quantity: 15,
      unit: 'squats'
    }
  ],
  status: TrackerStatus.active,
  entries: []
};

export const testTracker2Id = '456e4567-e89b-12d3-b456-426614174000';
export const testTracker2: Tracker = {
  id: testTracker2Id,
  beginDate: subDays(new Date(), 10).toString(),
  duration: 70,
  entries: [],
  name: 'Eat',
  requiredCompletions: [
    {
      quantity: 6,
      unit: 'vegetables or fruits'
    }
  ],
  status: TrackerStatus.active
};

export const testEntry1Id = '676e4567-e89b-12d3-b456-426614174000';
export const testEntry1: TrackerEntry = {
  id: testEntry1Id,
  completions: [
    {
      quantity: 5,
      unit: 'push-ups'
    },
    {
      quantity: 20,
      unit: 'squats'
    }
  ],
  date: new Date().toString(),
  trackerId: testTracker1Id
};

export const testEntry2Id = '876e4567-e89b-12e3-b456-426615174000';
export const testEntry2: TrackerEntry = {
  id: testEntry2Id,
  completions: [
    {
      quantity: 5,
      unit: 'push-ups'
    },
    {
      quantity: 5,
      unit: 'squats'
    }
  ],
  date: new Date().toString(),
  trackerId: testTracker1Id
};

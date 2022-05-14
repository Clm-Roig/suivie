import { subDays } from 'date-fns';

import { SEVEN_DAYS_AGO_STRING } from '../../config/Constants';
import Tracker from '../../models/Tracker';
import TrackerEntry from '../../models/TrackerEntry';
import TrackerStatus from '../../models/TrackerStatus';

export const testTracker1Id = '123e4567-e89b-12d3-a456-426614174000';
export const testTracker1: Tracker = {
  id: testTracker1Id,
  beginDate: subDays(new Date(), 3).toString(),
  defaultCompletions: [
    {
      quantity: 10,
      unit: 'push-ups'
    },
    {
      quantity: 15,
      unit: 'squats'
    }
  ],
  duration: 13,
  isDoneForToday: false,
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
  status: TrackerStatus.ACTIVE,
  entries: []
};

export const testTracker2Id = '456e4567-e89b-12d3-b456-426614174000';
export const testTracker2: Tracker = {
  id: testTracker2Id,
  beginDate: subDays(new Date(), 10).toString(),
  duration: 70,
  entries: [],
  isDoneForToday: false,
  name: 'Eat',
  requiredCompletions: [
    {
      quantity: 6,
      unit: 'vegetables or fruits'
    }
  ],
  status: TrackerStatus.ACTIVE
};

// Tracker without required and default completions
export const testTracker4Id = '123e4567-e59b-12k3-a456-429114174000';
export const testTracker4: Tracker = {
  id: testTracker4Id,
  beginDate: new Date().toString(),
  defaultCompletions: [],
  entries: [],
  isDoneForToday: false,
  name: 'Wake up',
  requiredCompletions: [],
  status: TrackerStatus.ACTIVE
};

export const testTracker3Id = '656e4567-e89b-12k3-b456-427614174000';
export const testTracker3: Tracker = {
  id: testTracker3Id,
  beginDate: new Date().toString(),
  defaultCompletions: [
    {
      quantity: 0.5,
      unit: 'L of water'
    }
  ],
  entries: [],
  isDoneForToday: false,
  name: 'Drink',
  requiredCompletions: [
    {
      quantity: 2,
      unit: 'L of water'
    }
  ],
  status: TrackerStatus.ACTIVE
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

export const testEntry3Id = '876e4567-e19b-12y3-b456-326515174000';
export const testEntry3: TrackerEntry = {
  id: testEntry3Id,
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
  date: SEVEN_DAYS_AGO_STRING,
  trackerId: testTracker1Id
};

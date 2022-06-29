import { addDays, subDays } from 'date-fns';

import { SEVEN_DAYS_AGO_STRING } from '../../config/Constants';
import Tracker from '../../models/Tracker';
import TrackerEntry from '../../models/TrackerEntry';
import makeFakeTracker from '../../models/factories/makeFakeTracker';

export const testTracker1Id = '123e4567-e89b-12d3-a456-426614174000';
export const testTracker1: Tracker = makeFakeTracker({
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
  ]
});

export const testTracker2Id = '456e4567-e89b-12d3-b456-426614174000';
export const testTracker2: Tracker = makeFakeTracker({
  id: testTracker2Id,
  beginDate: subDays(new Date(), 10).toString(),
  duration: 70,
  name: 'Eat',
  requiredCompletions: [
    {
      quantity: 6,
      unit: 'vegetables or fruits'
    }
  ]
});

export const testTracker3Id = '656e4567-e89b-12k3-b456-427614174000';
export const testTracker3: Tracker = makeFakeTracker({
  id: testTracker3Id,
  defaultCompletions: [
    {
      quantity: 0.5,
      unit: 'L of water'
    }
  ],
  name: 'Drink',
  requiredCompletions: [
    {
      quantity: 2,
      unit: 'L of water'
    }
  ]
});

// Tracker without required and default completions
export const testTracker4Id = '123e4567-e59b-12k3-a456-429114174000';
export const testTracker4: Tracker = makeFakeTracker({
  id: testTracker4Id,
  name: 'Wake up'
});

export const testTracker5Id = '766e4567-e19b-12k3-x456-427614174570';
export const testTracker5: Tracker = makeFakeTracker({
  id: testTracker5Id,
  beginDate: SEVEN_DAYS_AGO_STRING,
  defaultCompletions: [
    {
      quantity: 3,
      unit: 'x'
    },
    {
      quantity: 4,
      unit: 'y'
    }
  ],
  entries: [
    {
      id: '1234-5432-azer',
      completions: [
        {
          quantity: 3,
          unit: 'x'
        },
        {
          quantity: 4,
          unit: 'y'
        }
      ],
      date: subDays(new Date(), 4).toString(),
      trackerId: testTracker5Id
    }
  ],
  frequency: 3,
  name: 'Tracker 5',
  requiredCompletions: [
    {
      quantity: 3,
      unit: 'x'
    },
    {
      quantity: 4,
      unit: 'y'
    }
  ]
});

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

export const todayEntries = [
  {
    id: '2',
    completions: [
      {
        quantity: 3,
        unit: 'x'
      },
      {
        quantity: 6,
        unit: 'y'
      }
    ],
    date: new Date().toString(),
    trackerId: '1'
  } as TrackerEntry,
  {
    id: '3',
    completions: [
      {
        quantity: 7,
        unit: 'x'
      },
      {
        quantity: 10,
        unit: 'y'
      }
    ],
    date: new Date().toString(),
    trackerId: '1'
  } as TrackerEntry
];

export const variousEntries = [
  {
    id: '2',
    completions: [
      {
        quantity: 3,
        unit: 'x'
      },
      {
        quantity: 6,
        unit: 'y'
      }
    ],
    date: subDays(new Date(), 3).toString(),
    trackerId: '1'
  } as TrackerEntry,
  {
    id: '3',
    completions: [
      {
        quantity: 7,
        unit: 'x'
      },
      {
        quantity: 10,
        unit: 'y'
      }
    ],
    date: addDays(new Date(), 3).toString(),
    trackerId: '1'
  } as TrackerEntry,
  {
    id: '4',
    completions: [
      {
        quantity: 7,
        unit: 'x'
      },
      {
        quantity: 10,
        unit: 'y'
      }
    ],
    date: new Date().toString(),
    trackerId: '1'
  } as TrackerEntry,
  {
    id: '5',
    completions: [
      {
        quantity: 7,
        unit: 'x'
      },
      {
        quantity: 10,
        unit: 'y'
      }
    ],
    date: new Date().toString(),
    trackerId: '1'
  } as TrackerEntry
];

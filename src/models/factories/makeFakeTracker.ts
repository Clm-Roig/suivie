import { faker } from '@faker-js/faker/locale/fr';
import { v4 } from 'uuid';

import Tracker from '../Tracker';
import TrackerStatus from '../TrackerStatus';

const makeFakeTracker = (tracker?: Partial<Tracker>): Tracker => {
  return {
    id: v4(),
    beginDate: new Date().toString(),
    dateHidden: undefined,
    duration: undefined,
    entries: [],
    frequency: 1,
    isDoneForToday: false,
    name: faker.word.verb() + ' ' + faker.word.noun(),
    requiredCompletions: [],
    status: TrackerStatus.ACTIVE,
    ...tracker
  };
};

export default makeFakeTracker;

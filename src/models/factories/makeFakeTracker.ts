import { faker } from '@faker-js/faker/locale/fr';
import { v4 } from 'uuid';

import Tracker from '../Tracker';
import TrackerColor from '../TrackerColor';
import TrackerStatus from '../TrackerStatus';

const makeFakeTracker = (tracker?: Partial<Tracker>): Tracker => {
  return {
    id: v4(),
    beginDate: new Date().toString(),
    color: TrackerColor.YELLOW_CORN,
    dateHidden: undefined,
    defaultCompletions: [],
    doneDays: [],
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

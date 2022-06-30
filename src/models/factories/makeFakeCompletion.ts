import { faker } from '@faker-js/faker/locale/fr';

import Completion from '../Completion';

const makeFakeCompletion = (completion?: Partial<Completion>): Completion => {
  return {
    creationDate: new Date().toString(),
    quantity: faker.datatype.number(100),
    unit: faker.science.unit().name,
    ...completion
  };
};

export default makeFakeCompletion;

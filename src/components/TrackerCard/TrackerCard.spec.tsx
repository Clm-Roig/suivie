import { render, screen } from '@testing-library/react';
import { subDays } from 'date-fns';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';

import makeFakeTracker from '../../models/factories/makeFakeTracker';
import { createTestStore } from '../../store/createTestStore';
import formatDate from '../../utils/formatDate';
import TrackerCard from './TrackerCard';

const tracker1 = makeFakeTracker({
  beginDate: subDays(new Date(), 3).toString(),
  duration: 13,
  name: 'Musculation',
  remainingDays: 10,
  requiredCompletions: [
    {
      creationDate: new Date().toString(),
      quantity: 10,
      unit: 'push-ups'
    },
    {
      creationDate: new Date().toString(),
      quantity: 15,
      unit: 'squats'
    }
  ]
});
const setup = () => {
  // TODO: refactor Providers elsewhere
  render(
    <Provider store={createTestStore()}>
      <SnackbarProvider>
        <TrackerCard tracker={tracker1} />
      </SnackbarProvider>
    </Provider>
  );
};

describe('<TrackerCard />', () => {
  it('shows tracker informations', () => {
    setup();
    const { beginDate, name, remainingDays, requiredCompletions } = tracker1;
    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText('Reste ' + remainingDays + ' jours')).toBeInTheDocument();
    expect(screen.getByText('Commencé le ' + formatDate(new Date(beginDate)))).toBeInTheDocument();
    for (const completion of requiredCompletions) {
      const { quantity, unit } = completion;
      const elements = screen.getAllByText(quantity + ' ' + unit);
      // Present twice in the document (required and remaining)
      expect(elements[0]).toBeInTheDocument();
      expect(elements[1]).toBeInTheDocument();
    }
  });
});

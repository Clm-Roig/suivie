import { render, screen } from '@testing-library/react';
import { subDays } from 'date-fns';
import TrackerStatus from '../../models/TrackerStatus';
import formatDate from '../../utils/formatDate';
import TrackerCard from './TrackerCard';
import { v4 } from 'uuid';

const tracker1 = {
  id: v4(),
  beginDate: subDays(new Date(), 3).toString(),
  defaultQuantity: 15,
  duration: 13,
  name: 'Faire des pompes',
  remainingDays: 10,
  status: TrackerStatus.active,
  unit: 'pompes',
  entries: []
};
const setup = () => render(<TrackerCard tracker={tracker1} />);

describe('<TrackerCard />', () => {
  it('shows tracker informations', () => {
    setup();
    const { beginDate, name, defaultQuantity, remainingDays, unit } = tracker1;
    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText('Reste ' + remainingDays + ' jours')).toBeInTheDocument();
    expect(screen.getByText('Commencé le ' + formatDate(new Date(beginDate)))).toBeInTheDocument();
    expect(screen.getByText(defaultQuantity + ' ' + unit)).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import CompletionChip from './CompletionChip';

const completion1 = {
  quantity: 10,
  unit: 'push-ups'
};

describe('Simple <CompletionChip />', () => {
  it('shows completion informations', () => {
    render(<CompletionChip completion={completion1} />);
    const { quantity, unit } = completion1;
    expect(screen.getByText(`${quantity} ${unit}`)).toBeInTheDocument();
  });
});

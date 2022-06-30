import { render, screen } from '@testing-library/react';

import makeFakeCompletion from '../../models/factories/makeFakeCompletion';
import CompletionChip from './CompletionChip';

const completion1 = makeFakeCompletion();

describe('Simple <CompletionChip />', () => {
  it('shows completion informations', () => {
    render(<CompletionChip completion={completion1} />);
    const { quantity, unit } = completion1;
    expect(screen.getByText(`${quantity} ${unit}`)).toBeInTheDocument();
  });
});

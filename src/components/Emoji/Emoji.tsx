import { FC } from 'react';

interface Props {
  label?: string;
  symbol: string;
}

const Emoji: FC<Props> = ({ label, symbol }) => (
  <span
    className="emoji"
    role="img"
    aria-label={label ? label : ''}
    aria-hidden={label ? 'false' : 'true'}>
    {symbol}
  </span>
);
export default Emoji;

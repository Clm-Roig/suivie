// Taken from: https://blog.hackages.io/conditionally-wrap-an-element-in-react-a8b9a47fab2
import { FC } from 'react';

interface Props {
  children: React.ReactElement;
  condition: boolean;
  wrapper: (children: React.ReactNode) => JSX.Element;
}

const ConditionalWrapper: FC<Props> = ({ condition, wrapper, children }) =>
  condition ? wrapper(children) : children;

export default ConditionalWrapper;

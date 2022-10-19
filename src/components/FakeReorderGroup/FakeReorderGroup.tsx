import { styled } from '@mui/material/styles';
import { Reorder } from 'framer-motion';
import { FC } from 'react';

const StyledReorderGroup = styled(Reorder.Group)(() => ({
  listStyleType: 'none',
  paddingLeft: 0
}));

interface Props {
  children: React.ReactNode;
  values: Array<unknown>;
}

const FakeReorderGroup: FC<Props> = ({ children, values }) => {
  return (
    <StyledReorderGroup
      values={values}
      onReorder={() => {
        return;
      }}>
      {children}
    </StyledReorderGroup>
  );
};

export default FakeReorderGroup;

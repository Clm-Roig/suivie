import { Button, styled } from '@mui/material';
import { FC } from 'react';

interface BlockProps {
  bg: string;
}
const ColorBlockButton = styled(Button)<BlockProps>((props) => ({
  background: props.bg,
  boxShadow: '1px',
  minHeight: '40px',
  minWidth: '70px',
  ':hover': {
    background: props.bg
  }
}));

interface Props {
  colorCode: string;
  isSelected: boolean;
  onBlockClick: () => void;
}

const TrackerColorButton: FC<Props> = ({ colorCode, isSelected, onBlockClick }) => {
  return (
    <ColorBlockButton
      id={colorCode}
      sx={{ border: isSelected ? 2 : undefined, boxShadow: 1 }}
      bg={colorCode}
      onClick={onBlockClick}>
      {isSelected && '✓'}
    </ColorBlockButton>
  );
};
export default TrackerColorButton;

import { Popover as MuiPopover, PopoverProps, Typography } from '@mui/material';
import { FC } from 'react';

interface Props extends PopoverProps {
  text: string;
}

const Popover: FC<Props> = ({ text, ...popoverProps }) => {
  return (
    <MuiPopover {...popoverProps}>
      <Typography sx={{ p: 2 }}>{text}</Typography>
    </MuiPopover>
  );
};

export default Popover;

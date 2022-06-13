import HelpIcon from '@mui/icons-material/Help';
import { IconButton, InputAdornment, InputAdornmentProps } from '@mui/material';
import { FC, useState } from 'react';

import Popover from '../../Popover/Popover';

interface Props extends InputAdornmentProps {
  name: string;
  text: string;
}

const HelperAdornment: FC<Props> = ({ name, text, ...inputAdormnentProps }) => {
  // Popover management
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'popover-' + name : undefined;

  return (
    <>
      <InputAdornment {...inputAdormnentProps}>
        <IconButton edge="end" onClick={handleClick} color="primary">
          <HelpIcon />
        </IconButton>
      </InputAdornment>
      <Popover
        sx={{ whiteSpace: 'pre-line' }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        text={text}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: inputAdormnentProps.position === 'end' ? 'left' : 'right'
        }}
      />
    </>
  );
};

export default HelperAdornment;

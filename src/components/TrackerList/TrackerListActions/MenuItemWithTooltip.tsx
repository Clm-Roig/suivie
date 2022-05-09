import { MenuItem, Tooltip } from '@mui/material';
import { FC } from 'react';

interface Props {
  disabled: boolean;
  icon: React.ReactNode; // MUI icon
  onClick: () => void;
  text: string;
  tooltipTitle?: string;
}

const MenuItemWithTooltip: FC<Props> = ({ disabled, icon, onClick, text, tooltipTitle = '' }) => {
  return (
    <Tooltip
      arrow
      // Fix delay enter / leave for mobile use
      enterTouchDelay={50}
      leaveTouchDelay={3000}
      title={tooltipTitle}>
      <span>
        <MenuItem disabled={disabled} onClick={onClick}>
          {icon}
          &nbsp; {text}
        </MenuItem>
      </span>
    </Tooltip>
  );
};

export default MenuItemWithTooltip;

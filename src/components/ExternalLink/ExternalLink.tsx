import LaunchIcon from '@mui/icons-material/Launch';
import { Link, LinkProps } from '@mui/material';
import { FC } from 'react';

const ExternalLink: FC<LinkProps> = (linkProps) => (
  <>
    <Link {...linkProps} target="_blank" rel="noreferrer">
      {linkProps.children}
      <LaunchIcon fontSize={'small'} sx={{ fontSize: '0.8rem', ml: '1px', verticalAlign: 'top' }} />
    </Link>
  </>
);
export default ExternalLink;

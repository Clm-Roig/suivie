import { FC } from 'react';
import { LinkProps, Link } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';

const ExternalLink: FC<LinkProps> = (linkProps) => (
  <>
    <Link {...linkProps} target="_blank" rel="noreferrer">
      {linkProps.children}
      <LaunchIcon fontSize={'small'} sx={{ fontSize: '0.8rem', ml: '1px', verticalAlign: 'top' }} />
    </Link>
  </>
);
export default ExternalLink;

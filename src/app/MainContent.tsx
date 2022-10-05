import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { FC, ReactNode } from 'react';

import background from '../images/texture_yellow_blue.jpg';

const ContentPaper = styled(Paper)(({ theme }) => ({
  borderRadius: 0,
  flex: 1,
  overflow: 'hidden',
  padding: theme.spacing(2),
  position: 'relative'
}));

const ImgWrapper = styled(Box)(({ theme }) => ({
  backgroundImage: `url(${background})`,
  backgroundAttachment: 'fixed',
  filter: 'blur(5px) brightness(150%)',
  height: '100%',
  margin: '-' + theme.spacing(2),
  opacity: 0.14,
  overflow: 'hidden',
  position: 'absolute',
  width: '100%'
}));

interface Props {
  children: ReactNode;
}
const MainContent: FC<Props> = ({ children }) => {
  return (
    <ContentPaper>
      <ImgWrapper />
      {children}
    </ContentPaper>
  );
};

export default MainContent;

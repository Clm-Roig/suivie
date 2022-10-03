import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FC, ReactNode } from 'react';

import { useAppSelector } from '../hooks/redux';
import ThemeMode from '../models/ThemeMode';
import { selectThemeMode } from '../store/theme/theme.selectors';

interface ContentPaperProps {
  themeMode: ThemeMode;
}

const ContentPaper = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'themeMode'
})<ContentPaperProps>(({ theme, themeMode }) => ({
  borderRadius: 0,
  flex: 1,
  padding: theme.spacing(2),
  backgroundImage: `radial-gradient(at 0% 100%, ${
    themeMode === ThemeMode.DARK ? 'rgba(20, 40, 50, 0.2)' : 'rgba(255, 255, 200, 0.2)'
  } 0px, transparent 30%),
  radial-gradient(at 100% 0%, ${
    themeMode === ThemeMode.DARK ? 'rgba(20, 40, 50, 0.2)' : 'rgba(255, 255, 200, 0.2)'
  } 0px, transparent 30%),
  radial-gradient(at 0% 0%, ${
    themeMode === ThemeMode.DARK ? 'rgba(20, 40, 50, 0.2)' : 'rgba(255, 255, 200, 0.2)'
  } 0px, transparent 30%),
  radial-gradient(at 100% 100%, ${
    themeMode === ThemeMode.DARK ? 'rgba(20, 40, 50, 0.2)' : 'rgba(255, 255, 200, 0.2)'
  } 0px, transparent 30%)`
}));

interface Props {
  children: ReactNode;
}
const MainContent: FC<Props> = ({ children }) => {
  const themeMode = useAppSelector(selectThemeMode);
  return <ContentPaper themeMode={themeMode}>{children}</ContentPaper>;
};

export default MainContent;

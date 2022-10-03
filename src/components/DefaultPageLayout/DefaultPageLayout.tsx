import { Box, BoxProps } from '@mui/material';
import { motion } from 'framer-motion';
import { FC } from 'react';

const pageAnimation = {
  initial: {
    opacity: 0,
    x: '-100%'
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 }
  },
  exit: {
    opacity: 0,
    x: '+100%',
    transition: { duration: 0.2 }
  }
};

interface DefaultPageLayoutProps {
  children: React.ReactNode;
}
const DefaultPageLayout: FC<DefaultPageLayoutProps & BoxProps> = (props) => {
  const { children, ...boxProps } = props;
  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={pageAnimation}>
      <Box {...boxProps}>{children}</Box>
    </motion.div>
  );
};

export default DefaultPageLayout;

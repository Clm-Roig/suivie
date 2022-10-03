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

interface AnimatedPageProps {
  children: React.ReactNode;
}
const AnimatedPage: FC<AnimatedPageProps> = ({ children }) => {
  return (
    <motion.div key={3} initial="initial" animate="animate" exit="exit" variants={pageAnimation}>
      {children}
    </motion.div>
  );
};

export default AnimatedPage;

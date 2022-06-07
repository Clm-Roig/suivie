import autoAnimate from '@formkit/auto-animate';
import { RefObject, useEffect } from 'react';

// Hooks originally in @formkit/auto-animate/react because of this issue: https://github.com/formkit/auto-animate/issues/29
// TODO: remove it when the test work with auto-animate

// https://github.com/formkit/auto-animate/issues/11
export const useAutoAnimate = (ref: RefObject<HTMLElement | null>) => {
  useEffect(() => {
    ref.current && autoAnimate(ref.current);
  }, [ref]);
};

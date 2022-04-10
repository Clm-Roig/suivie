import { useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '../store/store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useThemeMode = () => {
  const [themeMode, setThemeMode] = useState('light');
  const theme = useTheme();
  useEffect(() => {
    setThemeMode(theme.palette.mode);
  }, [theme]);
  return themeMode;
};

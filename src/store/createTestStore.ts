import { EnhancedStore, configureStore } from '@reduxjs/toolkit';

import rootReducer from './rootReducer';

export function createTestStore(): EnhancedStore {
  const store = configureStore({
    reducer: rootReducer
  });
  return store;
}

import { configureStore } from '@reduxjs/toolkit';

import commonReducer from './slices/commonSlice';
import toastReducer from './slices/toastSlice';
import triggerReducer from './slices/triggerTableSlices';
 
export const store = configureStore({
  reducer: {
    toast: toastReducer,
    common: commonReducer,
    tableTrigger: triggerReducer
  },
});
 
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
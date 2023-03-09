import { configureStore } from '@reduxjs/toolkit';
import storeReducer from './features/storeSlice';

export default configureStore({
  reducer: {
    store: storeReducer,
  },
});

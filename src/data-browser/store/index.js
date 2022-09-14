import { configureStore } from '@reduxjs/toolkit';
import { institutions, graphs } from '../graphs/slice'

export const store = configureStore({
  reducer: {
    institutions: institutions.default,
    graphs: graphs.default
  }
});
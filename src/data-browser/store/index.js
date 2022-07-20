import { configureStore } from '@reduxjs/toolkit';
import { institutions, charts } from '../graphs/slice'

export const store = configureStore({
  reducer: {
    institutions: institutions.default,
    charts: charts.default
  }
});
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as institutionsApi from './api/institutions';
import { IDLE, PENDING, SUCCEEDED } from './api/status';

const initialState = {
  loading: IDLE,
  currentRequestId: null,
  data: null,
};

export const institutionsSlice = createSlice({
  name: 'institutions',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchInstitutionLars.pending, (state, action) => {
        if (state.loading === IDLE) {
          state.loading = PENDING;
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(fetchInstitutionLars.fulfilled, (state, action) => {
        state.loading = SUCCEEDED;
        state.currentRequestId = null;
        state.data = action.payload;
      });
  },
});

export const fetchInstitutionLars = createAsyncThunk(
  'institutions/fetchStatus',
  async ({ year, past }, { getState, requestId }) => {
    const { currentRequestId, data, loading } = getState().institutions;
    if (loading === SUCCEEDED && data) {
      return data;
    }

    if (loading !== PENDING || requestId !== currentRequestId) {
      return;
    }

    const response = await institutionsApi.fetchQuarterliesWithLars(year, past);
    return response;
  }
);

export default institutionsSlice.reducer;
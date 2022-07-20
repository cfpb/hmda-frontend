import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as institutionsApi from './api/institutions';

const initialState = {
  loading: 'idle',
  currentRequestId: null,
  data: [],
};

export const institutionsSlice = createSlice({
  name: 'institutions',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchInstitutionLars.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(fetchInstitutionLars.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.currentRequestId = null;
        state.data = action.payload;
      });
  },
});

export const fetchInstitutionLars = createAsyncThunk(
  'institutions/fetchStatus',
  async ({ year, past }, { getState, requestId }) => {
    const { currentRequestId, data, loading } = getState().institutions;
    if (data.length) {
      return data;
    }

    if (loading !== 'pending' || requestId !== currentRequestId) {
      return;
    }

    const response = await institutionsApi.fetchQuarterliesWithLars(year, past);
    return response;
  }
);

export default institutionsSlice.reducer;
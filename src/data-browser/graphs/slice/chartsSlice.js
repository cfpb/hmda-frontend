import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: 'idle',
  currentRequestId: null,
  data: [],
};

export const chartsSlice = createSlice({
  name: 'charts',
  initialState,
  reducers: {},
});

export default chartsSlice.reducer;
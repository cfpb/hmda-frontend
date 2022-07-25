import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import * as graphsApi from './api/graphs';
import { IDLE, PENDING, REJECTED, SUCCEEDED } from './api/status';

const initState = {
  loading: IDLE,
  currentRequestId: null,
  data: null
};

const detailsAdapter = createEntityAdapter({
  selectId: graph => graph.endpoint
});

const initialState = {
  list: initState,
  details: detailsAdapter.getInitialState()
};

export const graphsSlice = createSlice({
  name: 'graphs',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchGraphsInfo.pending, (state, action) => {
        if (state.list.loading === IDLE) {
          state.list.loading = PENDING;
          state.list.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(fetchGraphsInfo.fulfilled, (state, action) => {
        state.list.loading = SUCCEEDED;
        state.list.currentRequestId = null;
        state.list.data = action.payload;
      })
      .addCase(fetchGraphsInfo.rejected, (state, action) => {
        state.list.loading = REJECTED;
        state.list.currentRequestId = null;
        state.list.data = action.payload;
      })
      .addCase(fetchGraph.pending, (state, action) => {
        const { arg: endpoint, requestId } = action.meta;
        const { loading } = state.details.entities[endpoint] || initState;
        if (loading === IDLE || loading === REJECTED) {
          detailsAdapter.upsertOne(state.details, {
            ...initState,
            currentRequestId: requestId,
            endpoint,
            loading: PENDING,
          });
        }
      })
      .addCase(fetchGraph.fulfilled, (state, action) => {
        const { arg: endpoint } = action.meta;
        detailsAdapter.upsertOne(state.details, {
          endpoint,
          loading: SUCCEEDED,
          currentRequestId: null,
          data: action.payload
        });
      })
      .addCase(fetchGraph.rejected, (state, action) => {
        const { arg: endpoint } = action.meta;
        detailsAdapter.upsertOne(state.details, {
          endpoint,
          loading: REJECTED,
          currentRequestId: null,
          data: action.payload
        });
      });
  }
});

export const fetchGraphsInfo = createAsyncThunk(
  'graphs/fetchGraphsInfo',
  async (_, { getState, requestId, rejectWithValue }) => {
    const { currentRequestId, loading } = getState().graphs.list;
    if (loading !== PENDING || requestId !== currentRequestId) {
      return;
    }
    try {
      return await graphsApi.getGraphsInfo();
    } catch (err) {
      return rejectWithValue(err);
    }
  },
  {
    condition: (_, { getState }) => {
      const { loading } = getState().graphs.list;
      if (loading === SUCCEEDED || loading === PENDING) {
        return false;
      }
    },
  }
);

export const fetchGraph = createAsyncThunk(
  'graphs/fetchGraph',
  async (endpoint, { getState, requestId, rejectWithValue }) => {
    const graphSelectors = detailsAdapter.getSelectors(state => state.graphs.details);
    const  { data, currentRequestId, loading } = graphSelectors.selectById(getState(), endpoint) || {};
    if (loading === SUCCEEDED) {
      return data;
    }
    if (loading !== PENDING || requestId !== currentRequestId) {
      return;
    }

    try {
      return await graphsApi.getGraph(endpoint);
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export default graphsSlice.reducer;
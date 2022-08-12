import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import * as graphsApi from './api/graphs';
import { IDLE, PENDING, REJECTED, SUCCEEDED } from './api/status';

const idleState = {
  loading: IDLE,
  currentRequestId: null,
  data: null,
};

const detailsAdapter = createEntityAdapter({
  selectId: graph => graph.endpoint,
});

const detailSelectors = detailsAdapter.getSelectors(state => state.details);

const configsAdapter = createEntityAdapter({
  selectId: config => config.id,
});

const configSelectors = configsAdapter.getSelectors(state => state.configs);

const initialState = {
  list: idleState,
  details: detailsAdapter.getInitialState(),
  configs: configsAdapter.getInitialState(),
};

export const graphsSlice = createSlice({
  name: 'graphs',
  initialState,
  reducers: {
    setConfig: (state, action) => {
      configsAdapter.upsertOne(state.configs, action);
    },
  },
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
        const { loading } = detailSelectors.selectById(state, endpoint) || idleState;
        if (loading === IDLE || loading === REJECTED) {
          detailsAdapter.upsertOne(state.details, {
            ...idleState,
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
    const { data, currentRequestId, loading } = detailSelectors.selectById(getState().graphs, endpoint) || {};
    if (loading === SUCCEEDED) {
      return data;
    }
    if (loading !== PENDING || requestId !== currentRequestId) {
      return;
    }

    try {
      return await graphsApi.getGraph(endpoint);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const { setConfig: setConfigAction } = graphsSlice.actions;

export const setConfig = (id, value) => setConfigAction({ id, value });

export const getConfig = (state, id) => configSelectors.selectById(state, id)?.value;

export default graphsSlice.reducer;
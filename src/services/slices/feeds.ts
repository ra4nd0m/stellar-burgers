import { getFeedsApi } from '@api';
import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';

type TFeedsState = {
  isLoading: boolean;
  error: null | SerializedError;
  feeds: TOrdersData;
};

const initialState: TFeedsState = {
  isLoading: true,
  error: null,
  feeds: {
    orders: [],
    total: 0,
    totalToday: 0
  }
};

const getFeeds = createAsyncThunk('feeds/get', async () => getFeedsApi());

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    getFeedsSelector: (state) => state.feeds,
    getFeedsOrdersSelector: (state) => state.feeds?.orders,
    getFeedsIsLoadingSelector: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feeds = action.payload;
        state.error = null;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  }
});

export const {
  getFeedsSelector,
  getFeedsOrdersSelector,
  getFeedsIsLoadingSelector
} = feedsSlice.selectors;

export const ingredientsReducer = feedsSlice.reducer;

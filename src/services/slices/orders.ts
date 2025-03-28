import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrderState = {
  orderRequest: boolean;
  order: TOrder | null;
  orders: TOrder[];
  isLoadingOrder: boolean;
  isLoadingOrders: boolean;
  error: null | SerializedError;
};

const initialState: TOrderState = {
  orderRequest: false,
  order: null,
  orders: [],
  isLoadingOrder: true,
  isLoadingOrders: true,
  error: null
};

export const getOrder = createAsyncThunk(
  'order/get',
  async (number: number) => (await getOrderByNumberApi(number)).orders[0]
);

export const getOrders = createAsyncThunk(
  'orders/get',
  async () => await getOrdersApi()
);

const createOrder = createAsyncThunk(
  'order/create',
  async (order: string[]) => await orderBurgerApi(order)
);

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    resetOrderModal(state) {
      state.order = null;
    }
  },
  selectors: {
    getOrderSelector: (state) => state.order,
    getOrdersSelector: (state) => state.orders,
    getOrderRequestSelector: (state) => state.orderRequest,
    getOrderIsLoadingSelector: (state) => state.isLoadingOrder,
    getOrdersIsLoadingSelector: (state) => state.isLoadingOrders
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrder.pending, (state) => {
        state.isLoadingOrder = true;
        state.error = null;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.isLoadingOrder = false;
        state.order = action.payload;
        state.error = null;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.isLoadingOrder = false;
        state.error = action.error;
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoadingOrders = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoadingOrders = false;
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoadingOrders = false;
        state.error = action.error;
      })
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.order = action.payload.order;
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error;
      });
  }
});

export const {
  getOrderSelector,
  getOrdersSelector,
  getOrderRequestSelector,
  getOrderIsLoadingSelector,
  getOrdersIsLoadingSelector
} = orderSlice.selectors;

export const { resetOrderModal } = orderSlice.actions;

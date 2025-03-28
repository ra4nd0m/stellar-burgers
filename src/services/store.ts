import { configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { feedsSlice } from './slices/feeds';
import { ingredientsSlice } from './slices/ingredients';
import { userSlice } from './slices/user';
import { burgerConstructorSlice } from './slices/burger-constructor';
import { orderSlice } from './slices/orders';

const rootReducer = {
  feeds: feedsSlice.reducer,
  ingredients: ingredientsSlice.reducer,
  user: userSlice.reducer,
  burgerConstructor: burgerConstructorSlice.reducer,
  orders: orderSlice.reducer
};

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;

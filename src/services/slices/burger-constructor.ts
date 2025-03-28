import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { randomUUID } from 'crypto';

type TBurgerConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TBurgerConstructorState = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addBurgerIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        const ingredient = action.payload;
        if (ingredient.type === 'bun') {
          state.bun = ingredient;
        } else {
          state.ingredients.push(ingredient);
        }
      },
      prepare: (items) => ({
        payload: { ...items, id: randomUUID() }
      })
    },
    removeBurgerInredient(state, action: PayloadAction<string>) {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    moveBurgerIngredient(
      state,
      action: PayloadAction<{
        ingredient: TConstructorIngredient;
        moveUp: boolean;
      }>
    ) {
      const index = state.ingredients.findIndex(
        (item) => item.id === action.payload.ingredient.id
      );
      if (action.payload.moveUp) {
        state.ingredients.splice(index, 1);
        state.ingredients.splice(index - 1, 0, action.payload.ingredient);
      } else {
        state.ingredients.splice(index, 1);
        state.ingredients.splice(index + 1, 0, action.payload.ingredient);
      }
    },
    resetConstructor(state) {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    getBurgerConsturctor: (state) => state
  }
});

export const {
  addBurgerIngredient,
  removeBurgerInredient,
  moveBurgerIngredient,
  resetConstructor
} = burgerConstructorSlice.actions;
export const { getBurgerConsturctor } = burgerConstructorSlice.selectors;

import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  getBurgerConsturctorSelector,
  resetConstructor
} from './../../services/slices/burger-constructor';
import { useSelector } from 'react-redux';
import {
  createOrder,
  getOrderRequestSelector,
  getOrderSelector,
  resetOrderModal
} from './../../services/slices/orders';
import { getIsAuthenticatedSelector } from './../../services/slices/user';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from './../../services/store';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(getBurgerConsturctorSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const orderRequest = useSelector(getOrderRequestSelector);

  const orderModalData = useSelector(getOrderSelector);
  const isAuthenticated = useSelector(getIsAuthenticatedSelector);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!isAuthenticated) {
      return navigate('/login');
    }

    const order = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];
    dispatch(createOrder(order));
  };
  const closeOrderModal = () => {
    dispatch(resetOrderModal());
    dispatch(resetConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  //return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};

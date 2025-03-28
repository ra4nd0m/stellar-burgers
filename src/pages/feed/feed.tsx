import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { getFeedsOrdersSelector, getFeedSelector } from './../../services/slices/feeds';

export const Feed: FC = () => {
  const orders: TOrder[] = useSelector(getFeedsOrdersSelector);
  const feed = useSelector(getFeedSelector);

  if (!orders.length) {
    return <Preloader />;
  }

  <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};

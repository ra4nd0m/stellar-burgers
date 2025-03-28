import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { getUserSelector } from 'src/services/slices/user';
import { useSelector } from 'react-redux';

export const AppHeader: FC = () => {
  const user = useSelector(getUserSelector);

  return <AppHeaderUI userName={user.name} />;
};

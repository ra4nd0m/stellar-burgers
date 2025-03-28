import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch } from './../../services/store';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getLoginErrorSelector, loginUser } from './../../services/slices/user';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errorText = useSelector(getLoginErrorSelector);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const res = await dispatch(loginUser({ email, password })).unwrap();
      if (res && res.success) {
        navigate('/');
      }
    } catch (_) {}
  };

  return (
    <LoginUI
      errorText={errorText}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};

import {
  setAccessToken,
  setRefreshToken,
  setUsername,
} from '@/store/features/authSlice';
import { useAppDispatch } from '@/store/store';
import { useRef, useEffect } from 'react';

export const useInitAuth = () => {
  const dispatch = useAppDispatch();
  const isInitialized = useRef(false);

  // Переносим синхронный код в useEffect
  useEffect(() => {
    if (!isInitialized.current && typeof window !== 'undefined') {
      const access = localStorage.getItem('access') || '';
      const refresh = localStorage.getItem('refresh') || '';
      const username = localStorage.getItem('username') || '';

      dispatch(setAccessToken(access));
      dispatch(setRefreshToken(refresh));
      dispatch(setUsername(username));
      isInitialized.current = true;
    }
  }, [dispatch]);
};

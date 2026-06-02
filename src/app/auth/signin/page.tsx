'use client';

import { authUser, getTokens } from '@/services/auth/authAPI';
import styles from './signin.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store/store';
import {
  setAccessToken,
  setRefreshToken,
  setUsername,
} from '@/store/features/authSlice';
import { toast } from 'react-toastify';

export default function Signin() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim()) {
      return setErrorMessage('Заполните все поля');
    }

    setIsLoading(true);

    authUser({ email, password })
      .then((res) => {
        dispatch(setUsername(res.username));
        return getTokens({ email, password });
      })
      .then((res) => {
        dispatch(setAccessToken(res.access));
        dispatch(setRefreshToken(res.refresh));
        router.push('/music/main');

        toast.success('✨ Приятного прослушивания!', {
          position: 'top-center',
          autoClose: 2000,
          theme: 'dark',
        });
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            setErrorMessage(error.response.data.message);

            toast.error('🤷 Хм... что-то пошло не так', {
              position: 'top-center',
              autoClose: 3000,
              theme: 'dark',
            });
          } else if (error.request) {
            console.log(error.request);
            setErrorMessage('Проблемы с интернетом');

            toast.error('🌐 Проблемы с интернетом', {
              position: 'top-center',
              autoClose: 3000,
              theme: 'dark',
            });
          } else {
            console.log('Ошибка:', error.message);
            setErrorMessage('Неизвестная ошибка');

            toast.error('🤷 Хм... что-то пошло не так', {
              position: 'top-center',
              autoClose: 3000,
              theme: 'dark',
            });
          }
        }
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <a href="/music/main">
        <div className={styles.modal__logo}>
          <img src="/img/logo_modal.png" alt="logo" />
        </div>
      </a>
      <input
        className={classNames(styles.modal__input, styles.login)}
        type="text"
        name="login"
        placeholder="Почта"
        onChange={onChangeEmail}
      />
      <input
        className={classNames(styles.modal__input)}
        type="password"
        name="password"
        placeholder="Пароль"
        onChange={onChangePassword}
      />
      <div className={styles.errorContainer}>{errorMessage}</div>
      <button
        disabled={isLoading}
        onClick={onSubmit}
        className={styles.modal__btnEnter}
      >
        Войти
      </button>
      <Link href={'/auth/signup'} className={styles.modal__btnSignup}>
        Зарегистрироваться
      </Link>
    </>
  );
}

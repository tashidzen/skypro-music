'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './mainNavigation.module.css';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { clearUser } from '@/store/features/authSlice';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function MainNav() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuth = useAppSelector((state) => !!state.auth.access);

  const switchMenu = () => {
    if (isMenuOpen === true) {
      setIsMenuOpen(false);
    } else {
      setIsMenuOpen(true);
    }
  };

  const logout = () => {
    dispatch(clearUser());
    router.push('/auth/signin');

    toast.success('🎵 Музыка всегда с тобой!', {
      position: 'top-center',
      autoClose: 2000,
      theme: 'dark',
    });
  };

  return (
    <nav className={styles.main__nav}>
      <Link href="/music/main">
        <div className={styles.nav__logo}>
          <Image
            width={250}
            height={170}
            className={styles.logo__image}
            src="/img/logo.png"
            alt={'logo'}
          />
        </div>
      </Link>
      <div className={styles.nav__burger} onClick={switchMenu}>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
      </div>
      {isMenuOpen && (
        <div className={styles.nav__menu}>
          <ul className={styles.menu__list}>
            <li className={styles.menu__item}>
              <Link href="/music/main" className={styles.menu__link}>
                Главное
              </Link>
            </li>
            {isAuth ? (
              <li className={styles.menu__item}>
                <Link href="/music/favorite" className={styles.menu__link}>
                  Мои треки
                </Link>
              </li>
            ) : null}
            <li className={styles.menu__item}>
              <p onClick={logout} className={styles.menu__link}>
                {isAuth ? 'Выйти' : 'Войти'}
              </p>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

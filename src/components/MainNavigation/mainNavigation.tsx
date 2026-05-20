'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './mainNavigation.module.css';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { clearUser } from '@/store/features/authSlice';
import { useRouter } from 'next/navigation';

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
  };

  return (
    <nav className={styles.main__nav}>
      <div className={styles.nav__logo}>
        <Image
          width={250}
          height={170}
          className={styles.logo__image}
          src="/img/logo.png"
          alt={'logo'}
        />
      </div>
      <div className={styles.nav__burger} onClick={switchMenu}>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
      </div>
      {isMenuOpen && (
        <div className={styles.nav__menu}>
          <ul className={styles.menu__list}>
            <li className={styles.menu__item}>
              <Link href="#" className={styles.menu__link}>
                Главное
              </Link>
            </li>
            <li className={styles.menu__item}>
              <Link href="#" className={styles.menu__link}>
                Мой плейлист
              </Link>
            </li>
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

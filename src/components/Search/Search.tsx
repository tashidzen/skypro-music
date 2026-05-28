'use client';

import { useState, ChangeEvent } from 'react';
import styles from './search.module.css';
import { useAppDispatch } from '@/store/store';
import { setFilterSearch } from '@/store/features/trackSlice';

export default function Search() {
  const [searchInput, setSearchInput] = useState('');
  const dispatch = useAppDispatch();

  const onSearchInput = (
    e: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    setSearchInput(e.target.value);
    dispatch(setFilterSearch(e.target.value));
  };

  return (
    <div className={styles.centerblock__search}>
      <svg className={styles.search__svg}>
        <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
      </svg>
      <input
        className={styles.search__text}
        type="search"
        placeholder="Поиск"
        name="search"
        value={searchInput}
        onChange={onSearchInput}
      />
    </div>
  );
}

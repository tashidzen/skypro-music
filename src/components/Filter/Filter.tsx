'use client';

import FilterItem from '../FilterItem/FilterItem';
import styles from './filter.module.css';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { getUniqueValuesByKey } from '@/utils/helper';
import { useState } from 'react';

type FilterProps = {
  tracks: TrackType[];
};

type FilterType = 'author' | 'year' | 'genre' | null;

export default function Filter({ tracks }: FilterProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>(null);

  const authors = getUniqueValuesByKey(tracks, 'author');
  const years = ['По умолчанию', 'Сначала новые', 'Сначала старые'];
  const genres = getUniqueValuesByKey(tracks, 'genre');

  const handleFilterClick = (filter: FilterType) => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };

  return (
    <div className={styles.centerblock__filter}>
      <div className={styles.filter__title}>Искать по:</div>
      <div className={styles.filterWrapper}>
        <FilterItem
          btnName="исполнителю"
          isActive={activeFilter === 'author'}
          onClick={() => handleFilterClick('author')}
        />
        {activeFilter === 'author' && (
          <div className={styles.filter__list}>
            <div className={styles.filter__listWrapper}>
              <ul className={styles.filter__listScroll}>
                {authors.map((item, index) => (
                  <li key={index} className={styles.filter__item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
      <div className={styles.filterWrapper}>
        <FilterItem
          btnName="году выпуска"
          isActive={activeFilter === 'year'}
          onClick={() => handleFilterClick('year')}
        />
        {activeFilter === 'year' && (
          <div className={styles.filter__list}>
            <div className={styles.filter__listWrapper}>
              <ul className={styles.filter__listScroll}>
                {years.map((item, index) => (
                  <li key={index} className={styles.filter__item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
      <div className={styles.filterWrapper}>
        <FilterItem
          btnName="жанру"
          isActive={activeFilter === 'genre'}
          onClick={() => handleFilterClick('genre')}
        />
        {activeFilter === 'genre' && (
          <div className={styles.filter__list}>
            <div className={styles.filter__listWrapper}>
              <ul className={styles.filter__listScroll}>
                {genres.map((item, index) => (
                  <li key={index} className={styles.filter__item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

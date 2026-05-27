'use client';

import FilterItem from '../FilterItem/FilterItem';
import styles from './filter.module.css';
import { TrackType } from '@/sharedTypes/sharedTypes';
import {
  setFilterAuthors,
  setFilterGenres,
  setFilterYear,
} from '@/store/features/trackSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { getUniqueValuesByKey } from '@/utils/helper';
import { useState } from 'react';
import cn from 'classnames';

type FilterProps = {
  tracks: TrackType[];
};

type FilterType = 'author' | 'year' | 'genre' | null;

export default function Filter({ tracks }: FilterProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>(null);
  const dispatch = useAppDispatch();

  const selectedAuthors = useAppSelector(
    (state) => state.tracks.filters.authors,
  );
  const selectedYearSort = useAppSelector(
    (state) => state.tracks.filters.years,
  );
  const selectedGenres = useAppSelector((state) => state.tracks.filters.genres);

  const authors = getUniqueValuesByKey(tracks, 'author');
  const years = ['По умолчанию', 'Сначала новые', 'Сначала старые'];
  const genres = getUniqueValuesByKey(tracks, 'genre');

  const handleFilterClick = (filter: FilterType) => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };

  const onSelectAuthor = (author: string) => {
    dispatch(setFilterAuthors(author));
  };

  const onSelectYearSort = (yearSort: string) => {
    dispatch(setFilterYear(yearSort));
  };

  const onSelectGenre = (genre: string) => {
    dispatch(setFilterGenres(genre));
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
                  <li
                    onClick={() => onSelectAuthor(item)}
                    key={index}
                    className={cn(styles.filter__item, {
                      [styles.active]: selectedAuthors.includes(item),
                    })}
                  >
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
                  <li
                    onClick={() => onSelectYearSort(item)}
                    key={index}
                    className={cn(styles.filter__item, {
                      [styles.active]: selectedYearSort === item,
                    })}
                  >
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
                  <li
                    onClick={() => onSelectGenre(item)}
                    key={index}
                    className={cn(styles.filter__item, {
                      [styles.active]: selectedGenres.includes(item),
                    })}
                  >
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

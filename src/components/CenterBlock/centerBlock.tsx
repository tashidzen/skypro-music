'use client';

import styles from './centerBlock.module.css';
import cn from 'classnames';
import Search from '../Search/Search';
import Track from '../Track/Track';
import Filter from '../Filter/Filter';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { useEffect, useMemo } from 'react';
import { useAppDispatch } from '@/store/store';
import { setPagePlaylist } from '@/store/features/trackSlice';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type CenterBlockProp = {
  namePlaylist?: string;
  error?: string | null;
  tracklist: TrackType[];
  isLoading?: boolean;
  pagePlaylist: TrackType[];
};

export default function CenterBlock({
  namePlaylist,
  error,
  tracklist,
  isLoading,
  pagePlaylist,
}: CenterBlockProp) {
  const dispatch = useAppDispatch();

  const filterProps = useMemo(
    () => ({
      tracks: pagePlaylist,
    }),
    [pagePlaylist],
  );

  const renderedTracks = useMemo(() => {
    return tracklist.map((track) => (
      <div key={track._id} className={styles.playlist__item}>
        <Track track={track} playlist={tracklist} />
      </div>
    ));
  }, [tracklist]);

  // Компонент скелетонов для трека
  const TrackSkeleton = () => (
    <div className={styles.track}>
      <div className={styles.col01}>
        <Skeleton
          width="90%"
          baseColor="#271A58"
          highlightColor="#7868CC"
          borderRadius={4}
        />
      </div>
      <div className={styles.col02}>
        <Skeleton
          width="80%"
          baseColor="#271A58"
          highlightColor="#7868CC"
          borderRadius={4}
        />
      </div>
      <div className={styles.col03}>
        <Skeleton
          width="70%"
          baseColor="#271A58"
          highlightColor="#7868CC"
          borderRadius={4}
        />
      </div>
      <div className={styles.skeleton_col04}>
        <Skeleton
          width="60px"
          baseColor="#271A58"
          highlightColor="#7868CC"
          borderRadius={4}
        />
      </div>
    </div>
  );

  useEffect(() => {
    if (!isLoading && !error) {
      dispatch(setPagePlaylist(pagePlaylist));
    }
  }, [isLoading, error]);

  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>{namePlaylist || 'Треки'}</h2>
      <h3 className={styles.centerblock__h3}>{error}</h3>
      <Filter {...filterProps} />
      <div className={styles.centerblock__content}>
        <div className={styles.content__title}>
          <div className={cn(styles.playlistTitle__col, styles.col01)}>
            Трек
          </div>
          <div className={cn(styles.playlistTitle__col, styles.col02)}>
            Исполнитель
          </div>
          <div className={cn(styles.playlistTitle__col, styles.col03)}>
            Альбом
          </div>
          <div className={cn(styles.playlistTitle__col, styles.col04)}>
            <svg className={styles.playlistTitle__svg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>
        <div className={styles.content__playlist}>
          {error ? (
            <div className={styles.content__playlist_loading}>{error}</div>
          ) : isLoading ? (
            <>
              <TrackSkeleton />
              <TrackSkeleton />
              <TrackSkeleton />
            </>
          ) : tracklist.length === 0 ? (
            <div className={styles.content__playlist_empty}>
              🎧 Список треков пуст
            </div>
          ) : (
            renderedTracks
          )}
        </div>
      </div>
    </div>
  );
}

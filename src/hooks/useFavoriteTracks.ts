import { useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { getMyPlaylist } from '@/services/tracks/tracksApi';
import { setFavoriteTracks } from '@/store/features/trackSlice';
import { withReauth } from '@/utils/withReAuth';

export const useFavoriteTracks = () => {
  const { access, refresh } = useAppSelector((state) => state.auth);
  const { favoriteTracks } = useAppSelector((state) => state.tracks);
  const dispatch = useAppDispatch();

  //для защиты от дублирования запросов
  const isFetchingRef = useRef(false);

  useEffect(() => {
    if (!access || favoriteTracks.length > 0 || isFetchingRef.current) return;

    isFetchingRef.current = true;
    let isMounted = true;

    withReauth((token) => getMyPlaylist(token || access), refresh, dispatch)
      .then((tracks) => {
        if (isMounted) {
          dispatch(setFavoriteTracks(tracks || []));
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.warn('Не удалось загрузить избранные треки:', err);
        }
      })
      .finally(() => {
        if (isMounted) isFetchingRef.current = false;
      });

    return () => {
      isMounted = false;
      isFetchingRef.current = false;
    };
  }, [access, refresh, dispatch, favoriteTracks.length]);
};

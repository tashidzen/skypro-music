'use client';

import CenterBlock from '@/components/CenterBlock/centerBlock';
import { useEffect } from 'react';
import { getMyPlaylist } from '@/services/tracks/tracksApi';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  setFavoriteTracks,
  setFetchError,
  setFetchIsLoading,
} from '@/store/features/trackSlice';
import { withReauth } from '@/utils/withReAuth';

export default function FavoriteTracks() {
  const { access, refresh } = useAppSelector((state) => state.auth);
  const { favoriteTracks, fetchError, fetchIsLoading } = useAppSelector(
    (state) => state.tracks,
  );
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!access) return;

    dispatch(setFetchIsLoading(true));
    setError(null);

    withReauth((token) => getMyPlaylist(token || access), refresh, dispatch)
      .then((tracks) => {
        dispatch(setFavoriteTracks(tracks));
        dispatch(setFetchError(''));
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            setError(error.response.data);
            console.log(error.response.status);
          } else if (error.request) {
            console.log(error.request);
            setError('Проблемы с интернетом');
          } else {
            console.log('Ошибка:', error.message);
            setError('Неизвестная ошибка');
          }
          dispatch(setFetchError(error.message));
        }
      })
      .finally(() => {
        dispatch(setFetchIsLoading(false));
      });
  }, [access, refresh, dispatch]);

  return (
    <CenterBlock
      namePlaylist="Мои треки"
      error={error || fetchError}
      tracklist={favoriteTracks}
      isLoading={fetchIsLoading}
    />
  );
}

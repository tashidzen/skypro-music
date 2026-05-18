'use client';

import CenterBlock from '@/components/CenterBlock/centerBlock';
import { useEffect } from 'react';
import { getTracks } from '@/services/tracks/tracksApi';
import { useState } from 'react';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { AxiosError } from 'axios';

export default function Home() {
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getTracks()
      .then((result) => {
        setTracks(result);
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
          } else if (error.request) {
            console.log(error.request);
            setError('Проблемы с интернетом');
          } else {
            console.log('Ошибка:', error.message);
            setError('Неизвестная ошибка');
          }
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <CenterBlock error={error} tracklist={tracks} isLoading={isLoading} />
    </>
  );
}

'use client';

import { useParams } from 'next/navigation';
import CenterBlock from '@/components/CenterBlock/centerBlock';
import { useEffect } from 'react';
import { getPlaylistById } from '@/services/tracks/tracksApi';
import { useState } from 'react';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { AxiosError } from 'axios';

export default function CategoryPage() {
  const params = useParams<{ id: string }>();
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [playlistName, setPlaylistName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const playlistIdMapping: Record<string, string> = {
    '1': '2',
    '2': '3',
    '3': '4',
  };
  const uiId = params.id;
  const apiId = playlistIdMapping[uiId] || uiId;

  useEffect(() => {
    setIsLoading(true);
    getPlaylistById(apiId)
      .then(({ playlistName, tracks }) => {
        setPlaylistName(playlistName);
        setTracks(tracks);
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
      <CenterBlock
        namePlaylist={playlistName}
        error={error}
        tracklist={tracks}
        isLoading={isLoading}
      />
    </>
  );
}

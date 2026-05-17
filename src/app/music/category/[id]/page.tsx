'use client';

import { useParams } from 'next/navigation';
import CenterBlock from '@/components/CenterBlock/centerBlock';
import { useEffect } from 'react';
import { getPlaylistById } from '@/services/tracks/tracksApi';
import { useState } from 'react';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { AxiosError } from 'axios';
import { useAppSelector } from '@/store/store';

export default function CategoryPage() {
  const params = useParams<{ id: string }>();
  const { allTracks, fetchIsLoading, fetchError } = useAppSelector(
    (state) => state.tracks,
  );
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [playlistName, setPlaylistName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const playlistIdMapping: Record<string, string> = {
    '1': '2',
    '2': '3',
    '3': '4',
  };
  const uiId = params.id;
  const apiId = playlistIdMapping[uiId] || uiId;

  useEffect(() => {
    setIsLoading(true);
    if (!fetchIsLoading && allTracks.length) {
      getPlaylistById(apiId)
        .then((res) => {
          setPlaylistName(res.playlistName);
          const tracksIds = res.items;
          const resultTracks = allTracks.filter((el) =>
            tracksIds.includes(el._id),
          );
          setTracks(resultTracks);
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
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [fetchIsLoading]);

  return (
    <>
      <CenterBlock
        namePlaylist={playlistName}
        error={error || fetchError}
        tracklist={tracks}
        isLoading={isLoading}
      />
    </>
  );
}

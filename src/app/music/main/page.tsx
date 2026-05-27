'use client';

import CenterBlock from '@/components/CenterBlock/centerBlock';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { useAppSelector } from '@/store/store';
import { useEffect, useState } from 'react';

export default function Home() {
  const { fetchError, fetchIsLoading, allTracks, filteredTracks, filters } =
    useAppSelector((state) => state.tracks);

  const [playlist, setPlaylist] = useState<TrackType[]>([]);

  useEffect(() => {
    const currentPlaylist =
      filters.authors.length ||
      filters.genres.length ||
      filters.years !== 'По умолчанию'
        ? filteredTracks
        : allTracks;
    setPlaylist(currentPlaylist);
  }, [filteredTracks, allTracks]);

  return (
    <>
      <CenterBlock
        pagePlaylist={allTracks}
        error={fetchError}
        tracklist={playlist}
        isLoading={fetchIsLoading}
      />
    </>
  );
}

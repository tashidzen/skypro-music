'use client';

import CenterBlock from '@/components/CenterBlock/centerBlock';
import { useAppSelector } from '@/store/store';

export default function Home() {
  const { fetchError, fetchIsLoading, allTracks } = useAppSelector(
    (state) => state.tracks,
  );

  return (
    <>
      <CenterBlock
        error={fetchError}
        tracklist={allTracks}
        isLoading={fetchIsLoading}
      />
    </>
  );
}

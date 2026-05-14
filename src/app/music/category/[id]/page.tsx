'use client';

import { useParams } from 'next/navigation';
import CenterBlock from '@/components/CenterBlock/centerBlock';

export default function CategoryPage() {
  const params = useParams<{ id: string }>();

  const namePlaylistFunc = (id: string) => {
    if (id === '1') {
      return 'Плейлист дня';
    } else if (id === '2') {
      return '100 танцевальных хитов';
    } else if (id === '3') {
      return 'Инди заряд';
    } else {
      return 'Мои треки';
    }
  };

  return (
    <>
      <CenterBlock namePlaylist={namePlaylistFunc(params.id)} />
    </>
  );
}

'use client';

import FetchingTracks from '@/components/FetchingTracks/FetchingTracks';
import styles from './layout.module.css';
import Bar from '@/components/Bar/Bar';
import MainNav from '@/components/MainNavigation/mainNavigation';
import MainSidebar from '@/components/MainSidebar/mainSidebar';
import { ReactNode } from 'react';
import { useInitAuth } from '@/hooks/useInitAuth';

interface PlaylistLayoutProps {
  children: ReactNode;
}

export default function PlaylistLayout({ children }: PlaylistLayoutProps) {
  useInitAuth();
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <FetchingTracks />
          <MainNav />
          {children}
          <MainSidebar />
        </main>
        <Bar />
        <footer></footer>
      </div>
    </div>
  );
}

import styles from './layout.module.css';
import Bar from '@/components/Bar/Bar';
import MainNav from '@/components/MainNavigation/mainNavigation';
import MainSidebar from '@/components/MainSidebar/mainSidebar';
import { ReactNode } from 'react';

interface PlaylistLayoutProps {
  children: ReactNode;
}

export default function PlaylistLayout({ children }: PlaylistLayoutProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
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

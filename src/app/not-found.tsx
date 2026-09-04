import Link from 'next/link';
import styles from './not-found.module.css';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1>Страница не найдена</h1>
      <Link className={styles.link} href="/music/main">
        На главную
      </Link>
      <Image
        width={320}
        height={300}
        className={styles.notfound}
        src="/img/NotFound.png"
        alt={'Not Found'}
      />
    </div>
  );
}

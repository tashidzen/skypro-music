import styles from './centerBlock.module.css';
import cn from 'classnames';
import Search from '../Search/Search';
import { data } from '@/data';
import Track from '../Track/Track';
import Filter from '../Filter/Filter';

export default function CenterBlock() {
  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>Треки</h2>
      <Filter tracks={data} />
      <div className={styles.centerblock__content}>
        <div className={styles.content__title}>
          <div className={cn(styles.playlistTitle__col, styles.col01)}>
            Трек
          </div>
          <div className={cn(styles.playlistTitle__col, styles.col02)}>
            Исполнитель
          </div>
          <div className={cn(styles.playlistTitle__col, styles.col03)}>
            Альбом
          </div>
          <div className={cn(styles.playlistTitle__col, styles.col04)}>
            <svg className={styles.playlistTitle__svg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>
        <div className={styles.content__playlist}>
          {data.map((track) => (
            <div key={track._id} className={styles.playlist__item}>
              <Track track={track} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

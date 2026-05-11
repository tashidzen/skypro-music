'use client';

import Link from 'next/link';
import styles from './track.module.css';
import { formatTime } from '@/utils/helper';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  setCurrentPlaylist,
  setCurrentTrack,
} from '@/store/features/trackSlice';
import cn from 'classnames';

type TrackProps = {
  track: TrackType;
  playlist: TrackType[];
};

export default function Track({ track, playlist }: TrackProps) {
  const dispatch = useAppDispatch();
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const isPlay = useAppSelector((state) => state.tracks.isPlay);

  const isCurrentTrack = currentTrack?._id === track._id;

  const onClickTrack = () => {
    dispatch(setCurrentTrack(track));
    dispatch(setCurrentPlaylist(playlist));
  };

  return (
    <div className={styles.playlist__track} onClick={onClickTrack}>
      <div className={styles.track__title}>
        <div className={styles.track__titleImage}>
          <svg
            className={cn(styles.track__titleSvg, {
              [styles.active]: isCurrentTrack && isPlay,
            })}
          >
            {isCurrentTrack ? (
              <circle
                cx="8.5"
                cy="8.5"
                r="6"
                className={cn(styles.playingDot, {
                  [styles.animated]: isPlay,
                })}
              />
            ) : (
              <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
            )}
          </svg>
        </div>
        <div>
          <Link className={styles.track__titleLink} href="">
            {track.name}
            <span className={styles.track__titleSpan}></span>
          </Link>
        </div>
      </div>
      <div className={styles.track__author}>
        <Link className={styles.track__authorLink} href="">
          {track.author}
        </Link>
      </div>
      <div className={styles.track__album}>
        <Link className={styles.track__albumLink} href="">
          {track.album}
        </Link>
      </div>
      <div>
        <svg className={styles.track__timeSvg}>
          <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
        </svg>
        <span className={styles.track__timeText}>
          {formatTime(track.duration_in_seconds)}
        </span>
      </div>
    </div>
  );
}

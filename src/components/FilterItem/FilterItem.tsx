import cn from 'classnames';
import styles from './filterItem.module.css';

type FilterItemProps = {
  btnName: string;
  isActive?: boolean;
  onClick?: () => void;
};

export default function FilterItem({
  btnName,
  isActive,
  onClick,
}: FilterItemProps) {
  return (
    <div
      className={cn(styles.filter__button, styles['btn-text'], {
        [styles.active]: isActive,
      })}
      onClick={onClick}
    >
      {btnName}
    </div>
  );
}

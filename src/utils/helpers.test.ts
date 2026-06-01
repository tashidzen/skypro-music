import { data } from '@/data';
import { formatTime, getUniqueValuesByKey, getTimePanel } from './helper';

describe('formatTime', () => {
  it('Добавление нуля, если секунд <10', () => {
    expect(formatTime(61)).toBe('1:01');
  });
  it('Форматирует время Б 1 минуты', () => {
    expect(formatTime(35)).toBe('0:35');
  });
  it('Обрабатывает 0 секунд', () => {
    expect(formatTime(0)).toBe('0:00');
  });
});

describe('getTimePanel', () => {
  it('Возвращает строку в формате "текущее время / общее время"', () => {
    expect(getTimePanel(125, 245)).toBe('2:05 / 4:05');
  });
  it('Обрабатывает нулевое время', () => {
    expect(getTimePanel(0, 180)).toBe('0:00 / 3:00');
  });
  it('Обрабатывает большие значения времени', () => {
    expect(getTimePanel(3661, 7322)).toBe('61:01 / 122:02');
  });
  it('Возвращает undefined, если totalTime не передан (undefined)', () => {
    expect(getTimePanel(120, undefined)).toBeUndefined();
  });
});

describe('getUniqueValuesByKey', () => {
  describe('На моковых данных из файла data', () => {
    it('Возвращает уникальные жанры из массива', () => {
      const result = getUniqueValuesByKey(data, 'genre');

      expect(result).toEqual(['Тест', 'Классическая музыка']);
      expect(result).toHaveLength(2);
    });

    it('Возвращает уникальные значения автора', () => {
      const result = getUniqueValuesByKey(data, 'author');

      expect(result).toEqual([
        'Alexander Nakarada',
        'Frank Schroter',
        'Kevin Macleod',
        'Mixkit',
        '-',
        'Waltz Piano',
        'Winniethemoog',
      ]);
      expect(result).toHaveLength(7);
    });

    it('Возвращает уникальные названия альбомов', () => {
      const result = getUniqueValuesByKey(data, 'album');

      expect(result).toEqual([
        'Тест',
        'Open Sea epic',
        'Sneaky Snitch',
        'Secret Garden',
        '-',
        'Epic Heroic Conquest',
        'The March OF The Final Battle',
        'True Summer',
        'Background Sensible',
        'Cinematic',
      ]);
      expect(result).toHaveLength(10);
    });

    it('Обрабатывает дубликаты', () => {
      const result = getUniqueValuesByKey(data, 'author');

      // Проверяем, что '-' встречается только один раз
      const dashCount = result.filter((author) => author === '-').length;
      expect(dashCount).toBe(1);
      expect(result).toContain('-');
    });
  });

  describe('Проверка пограничных случаев', () => {
    it('Обрабатывает null значения в полях', () => {
      const result = getUniqueValuesByKey(data, 'logo');
      expect(result).toEqual([]);
    });

    it('Возвращает пустой массив, если передан пустой массив данных', () => {
      const result = getUniqueValuesByKey([], 'genre');

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });
  });
});

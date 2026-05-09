import { TrackType } from '@/sharedTypes/sharedTypes';

export function formatTime(time: number) {
  const minutes = Math.floor(time / 60);
  const inputSeconds = Math.floor(time % 60);
  const outputSeconds = inputSeconds < 10 ? `0${inputSeconds}` : inputSeconds;

  return `${minutes}:${outputSeconds}`;
}

export function getUniqueValuesByKey(
  arr: TrackType[],
  key: keyof TrackType,
): string[] {
  // Используем Set для хранения уникальных значений
  const uniqueValues = new Set<string>();

  arr.forEach((item) => {
    const value = item[key];

    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (v) {
          uniqueValues.add(v);
        }
      });
    } else if (typeof value === 'string') {
      uniqueValues.add(value);
    }
  });

  //Преобразуем Set обратно в массив и возвращаем
  return Array.from(uniqueValues);
}

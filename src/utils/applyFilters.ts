import { TrackType } from '@/sharedTypes/sharedTypes';
import { initialStateType } from '@/store/features/trackSlice';

export const applyFilters = (state: initialStateType): TrackType[] => {
  let filteredPlaylist = state.pagePlaylist;

  if (state.filters.authors.length) {
    filteredPlaylist = filteredPlaylist.filter((track) => {
      return state.filters.authors.includes(track.author);
    });
  }

  if (state.filters.years === 'Сначала новые') {
    filteredPlaylist = [...filteredPlaylist].sort((a, b) => {
      const aIsEmpty = !a.release_date || a.release_date.trim() === '';
      const bIsEmpty = !b.release_date || b.release_date.trim() === '';
      //Оба трека с пустыми датами остаются на своих местах относительно друг друга
      if (aIsEmpty && bIsEmpty) return 0;
      // Только a пустой - отправляем a в конец
      if (aIsEmpty) return 1;
      // Только b пустой - отправляем b в конец
      if (bIsEmpty) return -1;
      return (
        new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
      );
    });
  } else if (state.filters.years === 'Сначала старые') {
    filteredPlaylist = [...filteredPlaylist].sort((a, b) => {
      const aIsEmpty = !a.release_date || a.release_date.trim() === '';
      const bIsEmpty = !b.release_date || b.release_date.trim() === '';
      //Оба трека с пустыми датами остаются на своих местах относительно друг друга
      if (aIsEmpty && bIsEmpty) return 0;
      // Только a пустой - отправляем a в конец
      if (aIsEmpty) return 1;
      // Только b пустой - отправляем b в конец
      if (bIsEmpty) return -1;
      return (
        new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
      );
    });
  }

  if (state.filters.genres.length) {
    filteredPlaylist = filteredPlaylist.filter((track) => {
      return state.filters.genres.some((el) => track.genre.includes(el));
    });
  }

  if (state.filters.search.length) {
    const search = state.filters.search.toLowerCase();
    filteredPlaylist = filteredPlaylist.filter((track) => {
      return (
        track.author.toLowerCase().includes(search) ||
        track.name.toLowerCase().includes(search)
      );
    });
  }

  return filteredPlaylist;
};

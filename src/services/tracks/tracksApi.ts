import axios from 'axios';
import { BASE_URL } from '../constants';
import { TrackType } from '@/sharedTypes/sharedTypes';

export const getTracks = async (): Promise<TrackType[]> => {
  return axios(BASE_URL + '/catalog/track/all/').then((result) => {
    return result.data.data;
  });
};

export const getPlaylistById = async (
  id: string | number,
): Promise<{ playlistName: string; tracks: TrackType[] }> => {
  const result = await axios(`${BASE_URL}/catalog/selection/${id}/`);
  const playlist = result.data.data;
  const allTracks = await getTracks();
  // Фильтруем треки, которые есть в плейлисте
  const playlistTracks = allTracks.filter((track) =>
    playlist.items.includes(track._id),
  );
  return {
    playlistName: playlist.name,
    tracks: playlistTracks,
  };
};

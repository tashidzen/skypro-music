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
): Promise<{ playlistName: string; items: number[] }> => {
  const result = await axios(`${BASE_URL}/catalog/selection/${id}/`);
  const playlistData = result.data.data;
  return {
    items: playlistData.items,
    playlistName: playlistData.name,
  };
};

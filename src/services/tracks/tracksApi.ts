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

export const addLike = (access: string, id: number) => {
  return axios.post(
    BASE_URL + `/catalog/track/${id}/favorite/`,
    {},
    {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    },
  );
};

export const removeLike = (access: string, id: number) => {
  return axios.delete(BASE_URL + `/catalog/track/${id}/favorite/`, {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
};

export const getMyPlaylist = async (access: string): Promise<TrackType[]> => {
  return axios(BASE_URL + '/catalog/track/favorite/all/', {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  }).then((result) => {
    return result.data.data;
  });
};

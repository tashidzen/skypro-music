import { TrackType } from '@/sharedTypes/sharedTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  currentTrack: null | TrackType;
  isPlay: boolean;
  isShuffle: boolean;
  shuffledPlaylist: TrackType[];
  playlist: TrackType[];
  allTracks: TrackType[];
  favoriteTracks: TrackType[];
  fetchError: null | string;
  fetchIsLoading: boolean;
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
  isShuffle: false,
  shuffledPlaylist: [],
  playlist: [],
  allTracks: [],
  favoriteTracks: [],
  fetchError: null,
  fetchIsLoading: true,
};

const trackSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
      state.currentTrack = action.payload;
    },
    setCurrentPlaylist: (state, action: PayloadAction<TrackType[]>) => {
      state.playlist = action.payload;
      state.shuffledPlaylist = [...state.playlist].sort(
        () => Math.random() - 0.5,
      );
    },
    setIsPlay: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload;
    },
    toggleShuffle: (state) => {
      state.isShuffle = !state.isShuffle;
    },
    setNextTrack: (state) => {
      const playlist = state.isShuffle
        ? state.shuffledPlaylist
        : state.playlist;
      const currentTrack = state.currentTrack;
      if (currentTrack) {
        const curIndex = playlist.findIndex(
          (el) => el._id === currentTrack._id,
        );
        const nextIndexTrack = curIndex + 1;
        if (nextIndexTrack >= playlist.length - 1) {
          state.currentTrack = playlist[playlist.length - 1];
        } else {
          state.currentTrack = playlist[nextIndexTrack];
        }
      }
    },
    setPrevTrack: (state) => {
      const playlist = state.isShuffle
        ? state.shuffledPlaylist
        : state.playlist;
      const currentTrack = state.currentTrack;
      if (currentTrack) {
        const curIndex = playlist.findIndex(
          (el) => el._id === currentTrack._id,
        );
        const prevIndexTrack = curIndex - 1;
        if (prevIndexTrack <= 0) {
          state.currentTrack = playlist[0];
        } else {
          state.currentTrack = playlist[prevIndexTrack];
        }
      }
    },
    setAllTracks: (state, action: PayloadAction<TrackType[]>) => {
      state.allTracks = action.payload;
    },
    setFavoriteTracks: (state, action: PayloadAction<TrackType[]>) => {
      state.favoriteTracks = action.payload;
    },
    addLikedTracks: (state, action: PayloadAction<TrackType>) => {
      state.favoriteTracks = [...state.favoriteTracks, action.payload];
    },
    removeLikedTracks: (state, action: PayloadAction<TrackType>) => {
      state.favoriteTracks = state.favoriteTracks.filter(
        (track) => track._id !== action.payload._id,
      );
    },
    setFetchError: (state, action: PayloadAction<string>) => {
      state.fetchError = action.payload;
    },
    setFetchIsLoading: (state, action: PayloadAction<boolean>) => {
      state.fetchIsLoading = action.payload;
    },
  },
});

export const {
  setCurrentTrack,
  setCurrentPlaylist,
  setIsPlay,
  toggleShuffle,
  setNextTrack,
  setPrevTrack,
  setAllTracks,
  setFavoriteTracks,
  addLikedTracks,
  removeLikedTracks,
  setFetchError,
  setFetchIsLoading,
} = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;

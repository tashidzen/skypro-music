import { TrackType } from '@/sharedTypes/sharedTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  currentTrack: null | TrackType;
  isPlay: boolean;
  isShuffle: boolean;
  shuffledPlaylist: TrackType[];
  playlist: TrackType[];
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
  isShuffle: false,
  shuffledPlaylist: [],
  playlist: [],
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
  },
});

export const {
  setCurrentTrack,
  setCurrentPlaylist,
  setIsPlay,
  toggleShuffle,
  setNextTrack,
  setPrevTrack,
} = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;

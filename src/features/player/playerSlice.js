import { createSlice } from '@reduxjs/toolkit';

const playerSlice = createSlice({
    name: 'player',
    initialState: {
        currentSong: null,
        queue: [],
        isPlaying: false,
        volume: 0.8,
        shuffle: false,
        repeat: false,
    },
    reducers: {
        playSong: (state, action) => {
            const { song, queue } = action.payload;
            state.currentSong = song;
            state.queue = queue || [song];
            state.isPlaying = true;
        },
        togglePlay: (state) => {
            state.isPlaying = !state.isPlaying;
        },
        setVolume: (state, action) => {
            state.volume = action.payload;
        },
        toggleShuffle: (state) => {
            state.shuffle = !state.shuffle;
        },
        toggleRepeat: (state) => {
            state.repeat = !state.repeat;
        },
        playNext: (state) => {
            if (!state.currentSong || state.queue.length === 0) return;
            const currentIndex = state.queue.findIndex(s => s._id === state.currentSong._id);

            if (state.repeat) {
                state.isPlaying = true;
                return;
            }

            let nextIndex;
            if (state.shuffle) {
                nextIndex = Math.floor(Math.random() * state.queue.length);
            } else {
                nextIndex = (currentIndex + 1) % state.queue.length;
            }
            state.currentSong = state.queue[nextIndex];
            state.isPlaying = true;
        },
        playPrevious: (state) => {
            if (!state.currentSong || state.queue.length === 0) return;
            const currentIndex = state.queue.findIndex(s => s._id === state.currentSong._id);
            const prevIndex = (currentIndex - 1 + state.queue.length) % state.queue.length;
            state.currentSong = state.queue[prevIndex];
            state.isPlaying = true;
        },
    },
});

export const { playSong, togglePlay, setVolume, toggleShuffle, toggleRepeat, playNext, playPrevious } = playerSlice.actions;
export default playerSlice.reducer;

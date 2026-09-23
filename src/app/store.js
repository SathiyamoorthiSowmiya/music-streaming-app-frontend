import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import songsReducer from '../features/songs/songsSlice';
import playlistsReducer from '../features/playlists/playlistsSlice';
import playerReducer from '../features/player/playerSlice';
import uiReducer from '../features/ui/uiSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        songs: songsReducer,
        playlists: playlistsReducer,
        player: playerReducer,
        ui: uiReducer,
    },
});

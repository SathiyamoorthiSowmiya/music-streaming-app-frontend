import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchPlaylists = createAsyncThunk('playlists/fetchAll', async () => {
    const res = await api.get('/playlists');
    return res.data;
});

export const createPlaylist = createAsyncThunk('playlists/create', async (name) => {
    const res = await api.post('/playlists', { name });
    return res.data;
});

export const deletePlaylist = createAsyncThunk('playlists/delete', async (id) => {
    await api.delete(`/playlists/${id}`);
    return id;
});

export const addSongToPlaylist = createAsyncThunk('playlists/addSong', async ({ playlistId, songId }) => {
    const res = await api.patch(`/playlists/${playlistId}/add-song`, { songId });
    return res.data;
});

export const removeSongFromPlaylist = createAsyncThunk('playlists/removeSong', async ({ playlistId, songId }) => {
    const res = await api.patch(`/playlists/${playlistId}/remove-song`, { songId });
    return res.data;
});

const playlistsSlice = createSlice({
    name: 'playlists',
    initialState: {
        items: [],
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPlaylists.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchPlaylists.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(createPlaylist.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(deletePlaylist.fulfilled, (state, action) => {
                state.items = state.items.filter(p => p._id !== action.payload);
            })
            .addCase(addSongToPlaylist.fulfilled, (state, action) => {
                const idx = state.items.findIndex(p => p._id === action.payload._id);
                if (idx !== -1) state.items[idx] = action.payload;
            })
            .addCase(removeSongFromPlaylist.fulfilled, (state, action) => {
                const idx = state.items.findIndex(p => p._id === action.payload._id);
                if (idx !== -1) state.items[idx] = action.payload;
            });
    },
});

export default playlistsSlice.reducer;

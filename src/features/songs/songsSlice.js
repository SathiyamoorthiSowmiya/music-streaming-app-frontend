import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchSongs = createAsyncThunk('songs/fetchAll', async (search = '') => {
    const res = await api.get('/songs', { params: search ? { search } : {} });
    return res.data;
});

export const fetchLikedSongs = createAsyncThunk('songs/fetchLiked', async () => {
    const res = await api.get('/songs/liked/mine');
    return res.data;
});

export const toggleLike = createAsyncThunk('songs/toggleLike', async (songId) => {
    const res = await api.patch(`/songs/${songId}/like`);
    return { songId, ...res.data };
});

export const addSong = createAsyncThunk('songs/add', async (data) => {
    const res = await api.post('/songs', data);
    return res.data;
});

export const deleteSong = createAsyncThunk('songs/delete', async (songId) => {
    await api.delete(`/songs/${songId}`);
    return songId;
});

const songsSlice = createSlice({
    name: 'songs',
    initialState: {
        items: [],
        likedSongs: [],
        status: 'idle',
        searchTerm: '',
    },
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSongs.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchSongs.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchSongs.rejected, (state) => { state.status = 'failed'; })
            .addCase(fetchLikedSongs.fulfilled, (state, action) => {
                state.likedSongs = action.payload;
            })
            .addCase(toggleLike.fulfilled, (state, action) => {
                const song = state.items.find(s => s._id === action.payload.songId);
                if (song) {
                    song.likes = action.payload.likes;
                }
                if (action.payload.liked) {
                    if (song && !state.likedSongs.some(s => s._id === song._id)) {
                        state.likedSongs.push(song);
                    }
                } else {
                    state.likedSongs = state.likedSongs.filter(s => s._id !== action.payload.songId);
                }
            })
            .addCase(addSong.fulfilled, (state, action) => {
                state.items.unshift(action.payload);
            })
            .addCase(deleteSong.fulfilled, (state, action) => {
                state.items = state.items.filter(s => s._id !== action.payload);
            });
    },
});

export const { setSearchTerm } = songsSlice.actions;
export default songsSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        commentSong: null,
    },
    reducers: {
        openComments: (state, action) => {
            state.commentSong = action.payload;
        },
        closeComments: (state) => {
            state.commentSong = null;
        },
    },
});

export const { openComments, closeComments } = uiSlice.actions;
export default uiSlice.reducer;

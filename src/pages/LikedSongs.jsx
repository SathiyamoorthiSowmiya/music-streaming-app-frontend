import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLikedSongs } from '../features/songs/songsSlice';
import SongCard from '../components/SongCard';

function LikedSongs() {
    const dispatch = useDispatch();
    const { likedSongs, status } = useSelector((state) => state.songs);

    useEffect(() => {
        dispatch(fetchLikedSongs());
    }, [dispatch]);

    return (
        <div className="browse-page">
            <h1>❤️ Liked Songs</h1>

            {status === 'loading' && <p className="loading-state">Loading...</p>}
            {status === 'succeeded' && likedSongs.length === 0 && (
                <p className="empty-state">No liked songs yet. Tap 🤍 on any song to add it here.</p>
            )}

            <div className="song-grid">
                {likedSongs.map((song) => (
                    <SongCard key={song._id} song={song} queue={likedSongs} />
                ))}
            </div>
        </div>
    );
}

export default LikedSongs;

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongs } from '../features/songs/songsSlice';
import { fetchPlaylists } from '../features/playlists/playlistsSlice';
import SongCard from '../components/SongCard';

function Browse() {
    const dispatch = useDispatch();
    const { items: songs, status, searchTerm } = useSelector((state) => state.songs);
    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchSongs());
        if (token) dispatch(fetchPlaylists());
    }, [dispatch, token]);

    const genres = [...new Set(songs.map((s) => s.genre).filter(Boolean))];

    return (
        <div className="browse-page">
            <h1>{searchTerm ? `Results for "${searchTerm}"` : 'Browse Music'}</h1>

            {status === 'loading' && <p className="loading-state">Loading songs...</p>}
            {status === 'succeeded' && songs.length === 0 && (
                <p className="empty-state">No songs found.</p>
            )}

            {genres.map((genre) => {
                const genreSongs = songs.filter((s) => s.genre === genre);
                return (
                    <div key={genre} className="genre-section">
                        <h3>{genre}</h3>
                        <div className="song-grid">
                            {genreSongs.map((song) => (
                                <SongCard key={song._id} song={song} queue={genreSongs} />
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Browse;

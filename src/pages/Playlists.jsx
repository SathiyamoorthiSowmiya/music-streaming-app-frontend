import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPlaylists, createPlaylist, deletePlaylist } from '../features/playlists/playlistsSlice';

function Playlists() {
    const dispatch = useDispatch();
    const { items: playlists, status } = useSelector((state) => state.playlists);
    const [name, setName] = useState('');

    useEffect(() => {
        dispatch(fetchPlaylists());
    }, [dispatch]);

    const handleCreate = (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        dispatch(createPlaylist(name));
        setName('');
    };

    return (
        <div className="playlists-page">
            <h1>My Playlists</h1>

            <form className="create-playlist-form" onSubmit={handleCreate}>
                <input
                    type="text"
                    placeholder="New playlist name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button type="submit">Create Playlist</button>
            </form>

            {status === 'loading' && <p className="loading-state">Loading playlists...</p>}
            {status === 'succeeded' && playlists.length === 0 && (
                <p className="empty-state">No playlists yet. Create one above.</p>
            )}

            <div className="playlist-grid">
                {playlists.map((pl) => (
                    <div key={pl._id} className="playlist-card">
                        <Link to={`/playlists/${pl._id}`}>
                            <h4>{pl.name}</h4>
                            <p>{pl.songs.length} song{pl.songs.length !== 1 ? 's' : ''}</p>
                        </Link>
                        <button className="btn-delete" onClick={() => dispatch(deletePlaylist(pl._id))}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Playlists;

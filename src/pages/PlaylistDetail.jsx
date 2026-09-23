import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlaylists, removeSongFromPlaylist, addSongToPlaylist } from '../features/playlists/playlistsSlice';
import { fetchSongs } from '../features/songs/songsSlice';
import { playSong } from '../features/player/playerSlice';

function PlaylistDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { items: playlists, status } = useSelector((state) => state.playlists);
    const { items: allSongs } = useSelector((state) => state.songs);
    const playlist = playlists.find((p) => p._id === id);
    const [showAddSongs, setShowAddSongs] = useState(false);
    const [songSearch, setSongSearch] = useState('');

    useEffect(() => {
        if (playlists.length === 0) dispatch(fetchPlaylists());
        if (allSongs.length === 0) dispatch(fetchSongs());
    }, [dispatch, playlists.length, allSongs.length]);

    if (status === 'loading') return <p className="loading-state">Loading...</p>;
    if (!playlist) return <p className="empty-state">Playlist not found.</p>;

    const playlistSongIds = new Set(playlist.songs.map((s) => s._id));
    const availableSongs = allSongs.filter((s) => {
        if (playlistSongIds.has(s._id)) return false;
        const term = songSearch.toLowerCase();
        if (!term) return true;
        return s.title.toLowerCase().includes(term) || s.artist.toLowerCase().includes(term);
    });

    return (
        <div className="playlist-detail-page">
            <h1>{playlist.name}</h1>
            <p>{playlist.songs.length} song{playlist.songs.length !== 1 ? 's' : ''}</p>

            <button className="btn-primary" style={{ margin: '1.5rem 0' }} onClick={() => setShowAddSongs(!showAddSongs)}>
                {showAddSongs ? 'Close' : '+ Add Songs'}
            </button>

            {showAddSongs && (
                <div className="add-songs-panel">
                    <input
                        type="text"
                        placeholder="Search songs to add..."
                        value={songSearch}
                        onChange={(e) => setSongSearch(e.target.value)}
                    />
                    <div className="add-songs-list">
                        {availableSongs.length === 0 ? (
                            <p className="empty-state">No matching songs to add.</p>
                        ) : (
                            availableSongs.map((song) => (
                                <div key={song._id} className="add-song-row">
                                    <span>{song.title} — {song.artist}</span>
                                    <button
                                        className="btn-edit"
                                        onClick={() => dispatch(addSongToPlaylist({ playlistId: playlist._id, songId: song._id }))}
                                    >
                                        Add
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

            {playlist.songs.length === 0 ? (
                <p className="empty-state">No songs in this playlist yet. Use "+ Add Songs" above.</p>
            ) : (
                <div className="table-wrapper">
                    <table className="product-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Artist</th>
                                <th>Album</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {playlist.songs.map((song) => (
                                <tr key={song._id}>
                                    <td>{song.title}</td>
                                    <td>{song.artist}</td>
                                    <td>{song.album || '—'}</td>
                                    <td className="actions">
                                        <button
                                            className="btn-edit"
                                            onClick={() => dispatch(playSong({ song, queue: playlist.songs }))}
                                        >
                                            Play
                                        </button>
                                        <button
                                            className="btn-delete"
                                            onClick={() => dispatch(removeSongFromPlaylist({ playlistId: playlist._id, songId: song._id }))}
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default PlaylistDetail;

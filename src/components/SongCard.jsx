import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { playSong, togglePlay } from '../features/player/playerSlice';
import { toggleLike } from '../features/songs/songsSlice';
import { addSongToPlaylist } from '../features/playlists/playlistsSlice';
import { openComments } from '../features/ui/uiSlice';

function SongCard({ song, queue }) {
    const dispatch = useDispatch();
    const { currentSong, isPlaying } = useSelector((state) => state.player);
    const { user, token } = useSelector((state) => state.auth);
    const { items: playlists } = useSelector((state) => state.playlists);
    const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);

    const isCurrent = currentSong?._id === song._id;
    const liked = user && song.likes?.includes(user.id);

    const handlePlay = () => {
        if (isCurrent) {
            dispatch(togglePlay());
        } else {
            dispatch(playSong({ song, queue }));
        }
    };

    const handleLike = () => {
        if (!token) return alert('Please login to like songs');
        dispatch(toggleLike(song._id));
    };

    const handleAddToPlaylist = (playlistId) => {
        dispatch(addSongToPlaylist({ playlistId, songId: song._id }));
        setShowPlaylistMenu(false);
    };

    return (
        <div className={`song-card ${isCurrent ? 'active' : ''}`}>
            <img src={song.coverImage || 'https://via.placeholder.com/200?text=Music'} alt={song.title} />

            <div className="song-card-info">
                <h4>{song.title}</h4>
                <p>{song.artist}</p>
                {song.movieName && <span className="song-movie">🎬 {song.movieName}</span>}
            </div>

            <div className="song-card-actions">
                <button className="icon-btn" onClick={handlePlay} title="Play">
                    {isCurrent && isPlaying ? '⏸' : '▶'}
                </button>
                <button className={`icon-btn ${liked ? 'liked' : ''}`} onClick={handleLike} title="Like">
                    {liked ? '❤️' : '🤍'} {song.likes?.length || 0}
                </button>
                {user && (
                    <div className="playlist-add-wrapper">
                        <button className="icon-btn" onClick={() => setShowPlaylistMenu(!showPlaylistMenu)} title="Add to playlist">
                            ➕
                        </button>
                        {showPlaylistMenu && (
                            <div className="playlist-menu">
                                {playlists.length === 0 ? (
                                    <p>No playlists yet</p>
                                ) : (
                                    playlists.map((pl) => (
                                        <button key={pl._id} onClick={() => handleAddToPlaylist(pl._id)}>
                                            {pl.name}
                                        </button>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                )}
                <button className="icon-btn" onClick={() => dispatch(openComments(song))} title="Comments">
                    💬
                </button>
            </div>
        </div>
    );
}

export default SongCard;

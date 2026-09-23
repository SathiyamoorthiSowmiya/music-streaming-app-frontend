import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongs, addSong, deleteSong } from '../features/songs/songsSlice';

const emptyForm = { title: '', artist: '', album: '', movieName: '', genre: '', coverImage: '', audioUrl: '' };

function AdminPanel() {
    const dispatch = useDispatch();
    const { items: songs, status } = useSelector((state) => state.songs);
    const [form, setForm] = useState(emptyForm);

    useEffect(() => {
        dispatch(fetchSongs());
    }, [dispatch]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.title || !form.artist || !form.audioUrl) return;
        dispatch(addSong(form));
        setForm(emptyForm);
    };

    return (
        <div className="admin-page">
            <h1>Admin — Manage Songs</h1>

            <form className="product-form" onSubmit={handleSubmit}>
                <h2>Add New Song</h2>
                <div className="form-row">
                    <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
                    <input type="text" name="artist" placeholder="Artist" value={form.artist} onChange={handleChange} required />
                </div>
                <div className="form-row">
                    <input type="text" name="album" placeholder="Album" value={form.album} onChange={handleChange} />
                    <input type="text" name="movieName" placeholder="Movie Name (optional)" value={form.movieName} onChange={handleChange} />
                </div>
                <div className="form-row">
                    <input type="text" name="genre" placeholder="Genre" value={form.genre} onChange={handleChange} />
                    <input type="text" name="coverImage" placeholder="Cover Image URL" value={form.coverImage} onChange={handleChange} />
                </div>
                <input type="text" name="audioUrl" placeholder="Audio File URL" value={form.audioUrl} onChange={handleChange} required style={{ marginBottom: '1.5rem' }} />
                <button type="submit" className="btn-primary">Add Song</button>
            </form>

            {status === 'loading' && <p className="loading-state">Loading songs...</p>}

            <div className="table-wrapper">
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Artist</th>
                            <th>Genre</th>
                            <th>Likes</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {songs.map((song) => (
                            <tr key={song._id}>
                                <td>{song.title}</td>
                                <td>{song.artist}</td>
                                <td>{song.genre || '—'}</td>
                                <td>{song.likes?.length || 0}</td>
                                <td className="actions">
                                    <button className="btn-delete" onClick={() => dispatch(deleteSong(song._id))}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminPanel;

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { setSearchTerm, fetchSongs } from '../features/songs/songsSlice';

function Navbar() {
    const { user } = useSelector((state) => state.auth);
    const { searchTerm } = useSelector((state) => state.songs);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSearch = (e) => {
        const value = e.target.value;
        dispatch(setSearchTerm(value));
        dispatch(fetchSongs(value));
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <nav className="app-navbar">
            <Link to="/" className="brand">🎵 TuneStream</Link>

            <input
                type="text"
                className="nav-search"
                placeholder="Search by song, artist, album, movie..."
                value={searchTerm}
                onChange={handleSearch}
            />

            <div className="nav-links">
                <Link to="/">Browse</Link>
                {user && <Link to="/liked">Liked Songs</Link>}
                {user && <Link to="/playlists">Playlists</Link>}
                {user?.role === 'admin' && <Link to="/admin">Admin</Link>}

                {user ? (
                    <>
                        <span className="nav-user">Hi, {user.username}</span>
                        <button className="nav-btn" onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="nav-btn">Login</Link>
                        <Link to="/register" className="nav-btn nav-btn-primary">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;

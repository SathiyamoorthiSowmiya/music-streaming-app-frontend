import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PlayerBar from './components/PlayerBar';
import CommentDrawer from './components/CommentDrawer';
import ProtectedRoute from './components/ProtectedRoute';
import Browse from './pages/Browse';
import LikedSongs from './pages/LikedSongs';
import Login from './pages/Login';
import Register from './pages/Register';
import Playlists from './pages/Playlists';
import PlaylistDetail from './pages/PlaylistDetail';
import AdminPanel from './pages/AdminPanel';
import './App.css';

function App() {
    return (
        <div className="app-shell">
            <Navbar />

            <main className="app-main">
                <Routes>
                    <Route path="/" element={<Browse />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/liked"
                        element={
                            <ProtectedRoute>
                                <LikedSongs />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/playlists"
                        element={
                            <ProtectedRoute>
                                <Playlists />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/playlists/:id"
                        element={
                            <ProtectedRoute>
                                <PlaylistDetail />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute adminOnly>
                                <AdminPanel />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </main>

            <PlayerBar />
            <CommentDrawer />
        </div>
    );
}

export default App;

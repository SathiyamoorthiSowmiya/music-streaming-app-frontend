import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute({ children, adminOnly = false }) {
    const { user, token } = useSelector((state) => state.auth);

    if (!token) return <Navigate to="/login" replace />;
    if (adminOnly && user?.role !== 'admin') return <Navigate to="/" replace />;

    return children;
}

export default ProtectedRoute;

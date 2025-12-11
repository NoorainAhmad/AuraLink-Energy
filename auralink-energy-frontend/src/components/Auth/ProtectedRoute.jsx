import { Navigate } from 'react-router-dom';
import authService from '../../services/authService';

function ProtectedRoute({ children, adminOnly = false }) {
    const isAuthenticated = authService.isAuthenticated();
    const isAdmin = authService.isAdmin();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // If route requires admin access and user is not admin, redirect to dashboard
    if (adminOnly && !isAdmin) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}

export default ProtectedRoute;

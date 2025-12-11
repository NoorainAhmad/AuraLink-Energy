import { useEffect, useState } from 'react';
import authService from '../../services/authService';
import AdminDashboard from './AdminDashboard';
import CustomerDashboard from './CustomerDashboard';

function Dashboard() {
    const [role, setRole] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const currentRole = authService.getRole();
        const currentUser = authService.getCurrentUser();
        setRole(currentRole);
        setUser(currentUser);
    }, []);

    if (!role || !user) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <>
            {role === 'admin' ? (
                <AdminDashboard user={user} />
            ) : (
                <CustomerDashboard user={user} />
            )}
        </>
    );
}

export default Dashboard;

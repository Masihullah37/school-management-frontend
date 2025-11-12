
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const { isStudent, isTeacher, isAdmin } = useAuth();

  // Rediriger vers le dashboard approprié selon le rôle
  if (isStudent) {
    return <Navigate to="/student/dashboard" replace />;
  }

  if (isTeacher) {
    return <Navigate to="/teacher/dashboard" replace />;
  }

  if (isAdmin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return null;
};

export default Dashboard;
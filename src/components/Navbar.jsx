import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Home, 
  User, 
  BookOpen, 
  GraduationCap, 
  Users, 
  BarChart, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout, isStudent, isTeacher, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo et navigation principale */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <GraduationCap className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                École Numérique
              </span>
            </div>

            {/* Menu desktop */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/dashboard"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-primary-500 hover:text-gray-700"
              >
                <Home className="h-4 w-4 mr-1" />
                Accueil
              </Link>

              {isStudent && (
                <>
                  <Link
                    to="/student/profile"
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-primary-500 hover:text-gray-700"
                  >
                    <User className="h-4 w-4 mr-1" />
                    Profil
                  </Link>
                  <Link
                    to="/student/tasks"
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-primary-500 hover:text-gray-700"
                  >
                    <BookOpen className="h-4 w-4 mr-1" />
                    Devoirs
                  </Link>
                  <Link
                    to="/student/grades"
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-primary-500 hover:text-gray-700"
                  >
                    <BarChart className="h-4 w-4 mr-1" />
                    Notes
                  </Link>
                </>
              )}

              {isTeacher && (
                <>
                  <Link
                    to="/teacher/profile"
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-primary-500 hover:text-gray-700"
                  >
                    <User className="h-4 w-4 mr-1" />
                    Profil
                  </Link>
                  <Link
                    to="/teacher/students"
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-primary-500 hover:text-gray-700"
                  >
                    <Users className="h-4 w-4 mr-1" />
                    Élèves
                  </Link>
                  <Link
                    to="/teacher/tasks"
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-primary-500 hover:text-gray-700"
                  >
                    <BookOpen className="h-4 w-4 mr-1" />
                    Devoirs
                  </Link>
                  <Link
                    to="/teacher/grades"
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-primary-500 hover:text-gray-700"
                  >
                    <BarChart className="h-4 w-4 mr-1" />
                    Notes
                  </Link>
                </>
              )}

              {isAdmin && (
                <>
                  <Link
                    to="/admin/users"
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-primary-500 hover:text-gray-700"
                  >
                    <Users className="h-4 w-4 mr-1" />
                    Utilisateurs
                  </Link>
                  <Link
                    to="/admin/statistics"
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-primary-500 hover:text-gray-700"
                  >
                    <BarChart className="h-4 w-4 mr-1" />
                    Statistiques
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Menu utilisateur */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                {user?.name}
              </span>
              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-primary-100 text-primary-800">
                {user?.role === 'student' && 'Élève'}
                {user?.role === 'teacher' && 'Professeur'}
                {user?.role === 'admin' && 'Admin'}
              </span>
              <button
                onClick={handleLogout}
                className="btn btn-secondary flex items-center"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Déconnexion
              </button>
            </div>
          </div>

          {/* Bouton menu mobile */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/dashboard"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-primary-500 hover:text-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Home className="inline h-4 w-4 mr-2" />
              Accueil
            </Link>

            {isStudent && (
              <>
                <Link
                  to="/student/profile"
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-primary-500 hover:text-gray-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="inline h-4 w-4 mr-2" />
                  Profil
                </Link>
                <Link
                  to="/student/tasks"
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-primary-500 hover:text-gray-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <BookOpen className="inline h-4 w-4 mr-2" />
                  Devoirs
                </Link>
                <Link
                  to="/student/grades"
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-primary-500 hover:text-gray-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <BarChart className="inline h-4 w-4 mr-2" />
                  Notes
                </Link>
              </>
            )}

            {isTeacher && (
              <>
                <Link
                  to="/teacher/profile"
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-primary-500 hover:text-gray-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="inline h-4 w-4 mr-2" />
                  Profil
                </Link>
                <Link
                  to="/teacher/students"
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-primary-500 hover:text-gray-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Users className="inline h-4 w-4 mr-2" />
                  Élèves
                </Link>
                <Link
                  to="/teacher/tasks"
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-primary-500 hover:text-gray-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <BookOpen className="inline h-4 w-4 mr-2" />
                  Devoirs
                </Link>
                <Link
                  to="/teacher/grades"
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-primary-500 hover:text-gray-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <BarChart className="inline h-4 w-4 mr-2" />
                  Notes
                </Link>
              </>
            )}

            {isAdmin && (
              <>
                <Link
                  to="/admin/users"
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-primary-500 hover:text-gray-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Users className="inline h-4 w-4 mr-2" />
                  Utilisateurs
                </Link>
                <Link
                  to="/admin/statistics"
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-primary-500 hover:text-gray-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <BarChart className="inline h-4 w-4 mr-2" />
                  Statistiques
                </Link>
              </>
            )}
          </div>

          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold">
                  {user?.name?.charAt(0)}
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">{user?.name}</div>
                <div className="text-sm font-medium text-gray-500">{user?.email}</div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                <LogOut className="inline h-4 w-4 mr-2" />
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
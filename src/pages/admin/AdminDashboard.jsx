import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import { Users, GraduationCap, BookOpen, BarChart, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const response = await api.get('/admin/statistics');
      setStats(response.data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Tableau de bord administrateur</h1>
        <p className="mt-2 text-gray-600">Vue d'ensemble du système</p>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total utilisateurs</p>
              <p className="text-3xl font-bold mt-2">{stats?.total_users || 0}</p>
            </div>
            <Users className="h-12 w-12 text-blue-200" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Élèves</p>
              <p className="text-3xl font-bold mt-2">{stats?.total_students || 0}</p>
            </div>
            <GraduationCap className="h-12 w-12 text-green-200" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Professeurs</p>
              <p className="text-3xl font-bold mt-2">{stats?.total_teachers || 0}</p>
            </div>
            <Users className="h-12 w-12 text-purple-200" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm">Administrateurs</p>
              <p className="text-3xl font-bold mt-2">{stats?.total_admins || 0}</p>
            </div>
            <Users className="h-12 w-12 text-yellow-200" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-indigo-500 to-indigo-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100 text-sm">Total devoirs</p>
              <p className="text-3xl font-bold mt-2">{stats?.total_tasks || 0}</p>
            </div>
            <BookOpen className="h-12 w-12 text-indigo-200" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-pink-500 to-pink-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-pink-100 text-sm">Total notes</p>
              <p className="text-3xl font-bold mt-2">{stats?.total_grades || 0}</p>
            </div>
            <BarChart className="h-12 w-12 text-pink-200" />
          </div>
        </div>
      </div>

      {/* Actions rapides */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/admin/users" className="card hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-4">
            <div className="p-4 bg-primary-100 rounded-lg">
              <Users className="h-8 w-8 text-primary-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Gérer les utilisateurs</h3>
              <p className="text-sm text-gray-600">Ajouter, modifier ou supprimer des utilisateurs</p>
            </div>
          </div>
        </Link>

        <Link to="/admin/statistics" className="card hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-4">
            <div className="p-4 bg-green-100 rounded-lg">
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Statistiques détaillé</h3>
              <p className="text-sm text-gray-600">Voir les rapports et analyses</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { Users, GraduationCap, BookOpen, BarChart, TrendingUp, Award } from 'lucide-react';

const AdminStatistics = () => {
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
        <h1 className="text-3xl font-bold text-gray-900">Statistiques détaillées</h1>
        <p className="mt-2 text-gray-600">Analyses et rapports du système</p>
      </div>

      {/* Vue d'ensemble */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Vue d'ensemble</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-3">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">{stats?.total_users || 0}</div>
            <div className="text-sm text-gray-600">Utilisateurs</div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-3">
              <GraduationCap className="h-8 w-8 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">{stats?.total_students || 0}</div>
            <div className="text-sm text-gray-600">Élèves</div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-3">
              <Users className="h-8 w-8 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">{stats?.total_teachers || 0}</div>
            <div className="text-sm text-gray-600">Professeurs</div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-3">
              <Award className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">{stats?.total_admins || 0}</div>
            <div className="text-sm text-gray-600">Admins</div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-3">
              <BookOpen className="h-8 w-8 text-indigo-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">{stats?.total_tasks || 0}</div>
            <div className="text-sm text-gray-600">Devoirs</div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full mb-3">
              <BarChart className="h-8 w-8 text-pink-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">{stats?.total_grades || 0}</div>
            <div className="text-sm text-gray-600">Notes</div>
          </div>
        </div>
      </div>

      {/* Statistiques détaillées */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Répartition par rôle</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Élèves</span>
                <span className="text-sm font-semibold text-gray-900">
                  {stats?.total_students || 0} ({stats?.total_users > 0 ? Math.round((stats?.total_students / stats?.total_users) * 100) : 0}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full" 
                  style={{ width: `${stats?.total_users > 0 ? (stats?.total_students / stats?.total_users) * 100 : 0}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Professeurs</span>
                <span className="text-sm font-semibold text-gray-900">
                  {stats?.total_teachers || 0} ({stats?.total_users > 0 ? Math.round((stats?.total_teachers / stats?.total_users) * 100) : 0}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full" 
                  style={{ width: `${stats?.total_users > 0 ? (stats?.total_teachers / stats?.total_users) * 100 : 0}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Administrateurs</span>
                <span className="text-sm font-semibold text-gray-900">
                  {stats?.total_admins || 0} ({stats?.total_users > 0 ? Math.round((stats?.total_admins / stats?.total_users) * 100) : 0}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-600 h-2 rounded-full" 
                  style={{ width: `${stats?.total_users > 0 ? (stats?.total_admins / stats?.total_users) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Activité pédagogique</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <div className="text-sm text-gray-600">Devoirs créés</div>
                  <div className="text-2xl font-bold text-gray-900">{stats?.total_tasks || 0}</div>
                </div>
              </div>
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>

            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <BarChart className="h-8 w-8 text-green-600 mr-3" />
                <div>
                  <div className="text-sm text-gray-600">Notes attribuées</div>
                  <div className="text-2xl font-bold text-gray-900">{stats?.total_grades || 0}</div>
                </div>
              </div>
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>

            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center">
                <Award className="h-8 w-8 text-purple-600 mr-3" />
                <div>
                  <div className="text-sm text-gray-600">Moyenne devoirs/prof</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {stats?.total_teachers > 0 ? (stats?.total_tasks / stats?.total_teachers).toFixed(1) : 0}
                  </div>
                </div>
              </div>
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Informations système */}
      <div className="card">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Informations système</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {stats?.total_students + stats?.total_teachers + stats?.total_admins || 0}
            </div>
            <div className="text-sm text-gray-700 font-medium">Comptes actifs</div>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
            <div className="text-4xl font-bold text-green-600 mb-2">
              {stats?.total_students > 0 ? (stats?.total_grades / stats?.total_students).toFixed(1) : 0}
            </div>
            <div className="text-sm text-gray-700 font-medium">Notes par élève</div>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
            <div className="text-4xl font-bold text-purple-600 mb-2">
              {stats?.total_students > 0 ? (stats?.total_tasks / stats?.total_students).toFixed(1) : 0}
            </div>
            <div className="text-sm text-gray-700 font-medium">Devoirs par élève</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStatistics;
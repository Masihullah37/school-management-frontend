import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import { BookOpen, BarChart, User, Calendar } from 'lucide-react';

const StudentDashboard = () => {
  const [stats, setStats] = useState({
    tasksCount: 0,
    gradesCount: 0,
    averageGrade: 0,
  });
  const [recentTasks, setRecentTasks] = useState([]);
  const [recentGrades, setRecentGrades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [tasksRes, gradesRes] = await Promise.all([
        api.get('/student/tasks'),
        api.get('/student/grades'),
      ]);

      const tasks = tasksRes.data;
      const grades = gradesRes.data;

      // Calculer les statistiques
      const average = grades.length > 0
        ? grades.reduce((sum, g) => sum + parseFloat(g.grade), 0) / grades.length
        : 0;

      setStats({
        tasksCount: tasks.length,
        gradesCount: grades.length,
        averageGrade: average.toFixed(2),
      });

      // Derniers devoirs (3 plus récents)
      setRecentTasks(tasks.slice(0, 3));

      // Dernières notes (3 plus récentes)
      setRecentGrades(grades.slice(0, 3));
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
        <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="mt-2 text-gray-600">Bienvenue sur votre espace élève</p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Devoirs en cours</p>
              <p className="text-3xl font-bold mt-2">{stats.tasksCount}</p>
            </div>
            <BookOpen className="h-12 w-12 text-blue-200" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Total des notes</p>
              <p className="text-3xl font-bold mt-2">{stats.gradesCount}</p>
            </div>
            <BarChart className="h-12 w-12 text-green-200" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Moyenne générale</p>
              <p className="text-3xl font-bold mt-2">{stats.averageGrade}/20</p>
            </div>
            <User className="h-12 w-12 text-purple-200" />
          </div>
        </div>
      </div>

      {/* Actions rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/student/profile" className="card hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary-100 rounded-lg">
              <User className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Mon profil</h3>
              <p className="text-sm text-gray-600">Voir mes informations</p>
            </div>
          </div>
        </Link>

        <Link to="/student/tasks" className="card hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Mes devoirs</h3>
              <p className="text-sm text-gray-600">Voir tous les devoirs</p>
            </div>
          </div>
        </Link>

        <Link to="/student/grades" className="card hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <BarChart className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Mes notes</h3>
              <p className="text-sm text-gray-600">Consulter mes résultats</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Devoirs récents */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Devoirs récents</h2>
          <Link to="/student/tasks" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            Voir tout →
          </Link>
        </div>

        {recentTasks.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Aucun devoir pour le moment</p>
        ) : (
          <div className="space-y-4">
            {recentTasks.map((task) => (
              <div key={task.id} className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{task.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{task.subject}</p>
                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">{task.description}</p>
                  </div>
                  {task.due_date && (
                    <div className="ml-4 flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(task.due_date).toLocaleDateString('fr-FR')}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Notes récentes */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Notes récentes</h2>
          <Link to="/student/grades" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            Voir tout →
          </Link>
        </div>

        {recentGrades.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Aucune note pour le moment</p>
        ) : (
          <div className="space-y-4">
            {recentGrades.map((grade) => (
              <div key={grade.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{grade.subject}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Prof: {grade.teacher?.user?.name}
                    </p>
                    {grade.comments && (
                      <p className="text-sm text-gray-500 mt-2">{grade.comments}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary-600">
                      {grade.grade}/{grade.max_grade}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {new Date(grade.graded_at).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
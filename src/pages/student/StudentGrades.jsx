import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { BarChart, TrendingUp, Award, BookOpen, User, Calendar } from 'lucide-react';

const StudentGrades = () => {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    average: 0,
    highest: 0,
    lowest: 20,
    total: 0,
  });

  useEffect(() => {
    fetchGrades();
  }, []);

  const fetchGrades = async () => {
    try {
      const response = await api.get('/student/grades');
      const gradesData = response.data;
      setGrades(gradesData);

      // Calculer les statistiques
      if (gradesData.length > 0) {
        const gradeValues = gradesData.map(g => parseFloat(g.grade));
        const avg = gradeValues.reduce((a, b) => a + b, 0) / gradeValues.length;
        const max = Math.max(...gradeValues);
        const min = Math.min(...gradeValues);

        setStats({
          average: avg.toFixed(2),
          highest: max.toFixed(2),
          lowest: min.toFixed(2),
          total: gradesData.length,
        });
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const getGradeColor = (grade, maxGrade) => {
    const percentage = (grade / maxGrade) * 100;
    if (percentage >= 80) return 'text-green-600 bg-green-100';
    if (percentage >= 60) return 'text-blue-600 bg-blue-100';
    if (percentage >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
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
        <h1 className="text-3xl font-bold text-gray-900">Mes notes</h1>
        <p className="mt-2 text-gray-600">Consulter tous mes résultats</p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Moyenne générale</p>
              <p className="text-3xl font-bold mt-2">{stats.average}/20</p>
            </div>
            <TrendingUp className="h-10 w-10 text-blue-200" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Meilleure note</p>
              <p className="text-3xl font-bold mt-2">{stats.highest}/20</p>
            </div>
            <Award className="h-10 w-10 text-green-200" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm">Note la plus basse</p>
              <p className="text-3xl font-bold mt-2">{stats.lowest}/20</p>
            </div>
            <BarChart className="h-10 w-10 text-yellow-200" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Total des notes</p>
              <p className="text-3xl font-bold mt-2">{stats.total}</p>
            </div>
            <BookOpen className="h-10 w-10 text-purple-200" />
          </div>
        </div>
      </div>

      {/* Liste des notes */}
      {grades.length === 0 ? (
        <div className="card text-center py-12">
          <BarChart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Aucune note pour le moment</p>
        </div>
      ) : (
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Toutes mes notes</h2>
          <div className="space-y-4">
            {grades.map((grade) => (
              <div 
                key={grade.id} 
                className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{grade.subject}</h3>
                      {grade.task && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                          {grade.task.title}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        Prof: {grade.teacher?.user?.name}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(grade.graded_at).toLocaleDateString('fr-FR')}
                      </div>
                    </div>

                    {grade.comments && (
                      <div className="bg-gray-50 rounded-lg p-3 mt-3">
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold">Commentaire :</span> {grade.comments}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="ml-6 text-right">
                    <div className={`text-4xl font-bold px-4 py-2 rounded-lg ${getGradeColor(grade.grade, grade.max_grade)}`}>
                      {grade.grade}/{grade.max_grade}
                    </div>
                    <div className="text-sm text-gray-500 mt-2">
                      {((grade.grade / grade.max_grade) * 100).toFixed(0)}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentGrades;

import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { BookOpen, Calendar, User, Clock } from 'lucide-react';

const StudentTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, upcoming, overdue

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/student/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredTasks = () => {
    const now = new Date();
    
    switch (filter) {
      case 'upcoming':
        return tasks.filter(task => 
          task.due_date && new Date(task.due_date) > now
        );
      case 'overdue':
        return tasks.filter(task => 
          task.due_date && new Date(task.due_date) < now
        );
      default:
        return tasks;
    }
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
  };

  const filteredTasks = getFilteredTasks();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mes devoirs</h1>
          <p className="mt-2 text-gray-600">Liste de tous les devoirs de ma classe</p>
        </div>
      </div>

      {/* Filtres */}
      <div className="card">
        <div className="flex space-x-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Tous ({tasks.length})
          </button>
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'upcoming'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            À venir ({tasks.filter(t => t.due_date && new Date(t.due_date) > new Date()).length})
          </button>
          <button
            onClick={() => setFilter('overdue')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'overdue'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            En retard ({tasks.filter(t => t.due_date && new Date(t.due_date) < new Date()).length})
          </button>
        </div>
      </div>

      {/* Liste des devoirs */}
      {filteredTasks.length === 0 ? (
        <div className="card text-center py-12">
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Aucun devoir trouvé</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredTasks.map((task) => (
            <div 
              key={task.id} 
              className={`card hover:shadow-lg transition-shadow ${
                isOverdue(task.due_date) ? 'border-l-4 border-red-500' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{task.title}</h3>
                    {isOverdue(task.due_date) && (
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">
                        En retard
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1" />
                      {task.subject}
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {task.teacher?.user?.name}
                    </div>
                    {task.due_date && (
                      <div className={`flex items-center ${isOverdue(task.due_date) ? 'text-red-600 font-semibold' : ''}`}>
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(task.due_date).toLocaleDateString('fr-FR')}
                      </div>
                    )}
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Description :</h4>
                    <p className="text-gray-700 whitespace-pre-wrap">{task.description}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center text-xs text-gray-500">
                <Clock className="h-3 w-3 mr-1" />
                Créé le {new Date(task.created_at).toLocaleDateString('fr-FR')}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentTasks;


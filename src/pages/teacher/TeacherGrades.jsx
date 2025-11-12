import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { BarChart, Plus, Edit, Trash2, X, Search } from 'lucide-react';

const TeacherGrades = () => {
  const [grades, setGrades] = useState([]);
  const [students, setStudents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingGrade, setEditingGrade] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    student_id: '',
    task_id: '',
    subject: '',
    grade: '',
    max_grade: '20',
    comments: '',
    graded_at: new Date().toISOString().split('T')[0],
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [gradesRes, studentsRes, tasksRes] = await Promise.all([
        api.get('/grades'),
        api.get('/teacher/students'),
        api.get('/tasks'),
      ]);
      setGrades(gradesRes.data);
      setStudents(studentsRes.data);
      setTasks(tasksRes.data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (grade = null) => {
    if (grade) {
      setEditingGrade(grade);
      setFormData({
        student_id: grade.student_id,
        task_id: grade.task_id || '',
        subject: grade.subject,
        grade: grade.grade,
        max_grade: grade.max_grade,
        comments: grade.comments || '',
        graded_at: grade.graded_at,
      });
    } else {
      setEditingGrade(null);
      setFormData({
        student_id: '',
        task_id: '',
        subject: '',
        grade: '',
        max_grade: '20',
        comments: '',
        graded_at: new Date().toISOString().split('T')[0],
      });
    }
    setShowModal(true);
    setError('');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingGrade(null);
    setError('');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (editingGrade) {
        await api.put(`/grades/${editingGrade.id}`, formData);
      } else {
        await api.post('/grades', formData);
      }
      fetchData();
      handleCloseModal();
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la sauvegarde');
    }
  };

  const handleDelete = async (gradeId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette note ?')) {
      return;
    }

    try {
      await api.delete(`/grades/${gradeId}`);
      fetchData();
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la suppression');
    }
  };

  const getFilteredGrades = () => {
    if (!searchTerm) return grades;
    
    return grades.filter(grade =>
      grade.student?.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grade.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredGrades = getFilteredGrades();

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
          <h1 className="text-3xl font-bold text-gray-900">Gestion des notes</h1>
          <p className="mt-2 text-gray-600">Attribuer et gérer les notes des élèves</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="btn btn-primary flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Ajouter une note
        </button>
      </div>

      {/* Barre de recherche */}
      <div className="card">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Rechercher par élève ou matière..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-10"
          />
        </div>
        <div className="mt-2 text-sm text-gray-600">
          {filteredGrades.length} note(s) trouvée(s)
        </div>
      </div>

      {/* Liste des notes */}
      {filteredGrades.length === 0 ? (
        <div className="card text-center py-12">
          <BarChart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Aucune note trouvée</p>
          <button
            onClick={() => handleOpenModal()}
            className="btn btn-primary mt-4"
          >
            Ajouter une première note
          </button>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Élève</th>
                  <th>Matière</th>
                  <th>Devoir</th>
                  <th>Note</th>
                  <th>Date</th>
                  <th>Commentaire</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredGrades.map((grade) => (
                  <tr key={grade.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-primary-600 font-semibold">
                            {grade.student?.user?.name?.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {grade.student?.user?.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {grade.student?.class}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {grade.subject}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {grade.task ? (
                        <span className="text-gray-900">{grade.task.title}</span>
                      ) : (
                        <span className="text-gray-400">Note générale</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-lg font-bold text-primary-600">
                        {grade.grade}/{grade.max_grade}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(grade.graded_at).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {grade.comments || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleOpenModal(grade)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(grade.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Créer/Modifier */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingGrade ? 'Modifier la note' : 'Ajouter une note'}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {error && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Élève *
                  </label>
                  <select
                    name="student_id"
                    required
                    value={formData.student_id}
                    onChange={handleChange}
                    className="input mt-1"
                    disabled={!!editingGrade}
                  >
                    <option value="">Sélectionner un élève</option>
                    {students.map((student) => (
                      <option key={student.id} value={student.id}>
                        {student.user?.name} - {student.class} ({student.roll_number})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Devoir associé (optionnel)
                  </label>
                  <select
                    name="task_id"
                    value={formData.task_id}
                    onChange={handleChange}
                    className="input mt-1"
                  >
                    <option value="">Aucun devoir (note générale)</option>
                    {tasks.map((task) => (
                      <option key={task.id} value={task.id}>
                        {task.title} - {task.class}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Matière *
                  </label>
                  <input
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="input mt-1"
                    placeholder="Ex: Mathématiques"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Note obtenue *
                    </label>
                    <input
                      name="grade"
                      type="number"
                      step="0.01"
                      min="0"
                      required
                      value={formData.grade}
                      onChange={handleChange}
                      className="input mt-1"
                      placeholder="15.50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Note maximale *
                    </label>
                    <input
                      name="max_grade"
                      type="number"
                      step="0.01"
                      min="0"
                      required
                      value={formData.max_grade}
                      onChange={handleChange}
                      className="input mt-1"
                      placeholder="20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Date *
                    </label>
                    <input
                      name="graded_at"
                      type="date"
                      required
                      value={formData.graded_at}
                      onChange={handleChange}
                      className="input mt-1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Commentaires
                  </label>
                  <textarea
                    name="comments"
                    value={formData.comments}
                    onChange={handleChange}
                    rows="3"
                    className="input mt-1"
                    placeholder="Commentaires sur la performance de l'élève..."
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="btn btn-secondary"
                  >
                    Annuler
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingGrade ? 'Mettre à jour' : 'Ajouter la note'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherGrades;
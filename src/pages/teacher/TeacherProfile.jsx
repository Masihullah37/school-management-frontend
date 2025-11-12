import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { User, Mail, Phone, BookOpen, Award } from 'lucide-react';

const TeacherProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/teacher/profile');
      setProfile(response.data);
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

  if (!profile) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Profil non trouvé</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Mon profil</h1>
        <p className="mt-2 text-gray-600">Informations professionnelles</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Carte d'identité */}
        <div className="lg:col-span-1">
          <div className="card text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary-100 text-primary-600 text-3xl font-bold mb-4">
              {profile.user?.name?.charAt(0)}
            </div>
            <h2 className="text-xl font-bold text-gray-900">{profile.user?.name}</h2>
            <p className="text-gray-600 mt-1">{profile.user?.email}</p>
            <div className="mt-4 inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
              Professeur
            </div>
          </div>
        </div>

        {/* Informations détaillées */}
        <div className="lg:col-span-2">
          <div className="card">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Informations personnelles</h3>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                  <User className="h-5 w-5 text-primary-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Nom complet</p>
                  <p className="text-gray-900 font-medium">{profile.user?.name}</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-900 font-medium">{profile.user?.email}</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <BookOpen className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Matière enseignée</p>
                  <p className="text-gray-900 font-medium">{profile.subject}</p>
                </div>
              </div>

              {profile.phone && (
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <Phone className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Téléphone</p>
                    <p className="text-gray-900 font-medium">{profile.phone}</p>
                  </div>
                </div>
              )}

              {profile.qualification && (
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                    <Award className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Qualification</p>
                    <p className="text-gray-900 font-medium">{profile.qualification}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
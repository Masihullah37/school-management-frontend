// import { useEffect, useState } from 'react';
// import api from '../../api/axios';
// import { Users, Mail, BookOpen, Phone, Search } from 'lucide-react';

// const TeacherStudents = () => {
//   const [students, setStudents] = useState([]);
//   const [filteredStudents, setFilteredStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [classFilter, setClassFilter] = useState('all');

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   useEffect(() => {
//     filterStudents();
//   }, [searchTerm, classFilter, students]);

//   const fetchStudents = async () => {
//     try {
//       const response = await api.get('/teacher/students');
//       setStudents(response.data);
//       setFilteredStudents(response.data);
//     } catch (error) {
//       console.error('Erreur:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterStudents = () => {
//     let filtered = students;

//     // Filtre par recherche
//     if (searchTerm) {
//       filtered = filtered.filter(student =>
//         student.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         student.roll_number.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     // Filtre par classe
//     if (classFilter !== 'all') {
//       filtered = filtered.filter(student => student.class === classFilter);
//     }

//     setFilteredStudents(filtered);
  

//   };

//   const getUniqueClasses = () => {
//     return [...new Set(students.map(s => s.class))];
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold text-gray-900">Liste des élèves</h1>
//         <p className="mt-2 text-gray-600">Tous les élèves de l'école</p>
//       </div>

//       {/* Filtres */}
//       <div className="card">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Search className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type="text"
//               placeholder="Rechercher par nom ou matricule..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="input pl-10"
//             />
//           </div>

//           <select
//             value={classFilter}
//             onChange={(e) => setClassFilter(e.target.value)}
//             className="input"
//           >
//             <option value="all">Toutes les classes</option>
//             {getUniqueClasses().map(cls => (
//               <option key={cls} value={cls}>{cls}</option>
//             ))}
//           </select>
//         </div>

//         <div className="mt-4 text-sm text-gray-600">
//           {filteredStudents.length} élève(s) trouvé(s)
//         </div>
//       </div>

//       {/* Liste des élèves */}
//       {filteredStudents.length === 0 ? (
//         <div className="card text-center py-12">
//           <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
//           <p className="text-gray-500">Aucun élève trouvé</p>
//         </div>
//       ) : (
//         <div className="card overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="table">
//               <thead>
//                 <tr>
//                   <th>Matricule</th>
//                   <th>Nom</th>
//                   <th>Email</th>
//                   <th>Classe</th>
//                   <th>Téléphone parents</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {filteredStudents.map((student) => (
//                   <tr key={student.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div className="flex-shrink-0 h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
//                           <span className="text-primary-600 font-semibold">
//                             {student.user?.name?.charAt(0)}
//                           </span>
//                         </div>
//                         <div className="ml-4">
//                           <div className="text-sm font-medium text-gray-900">
//                             {student.roll_number}
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm font-medium text-gray-900">
//                         {student.user?.name}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center text-sm text-gray-500">
//                         <Mail className="h-4 w-4 mr-1" />
//                         {student.user?.email}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
//                         {student.class}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {student.parent_phone ? (
//                         <div className="flex items-center">
//                           <Phone className="h-4 w-4 mr-1" />
//                           {student.parent_phone}
//                         </div>
//                       ) : (
//                         <span className="text-gray-400">Non renseigné</span>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TeacherStudents;

import { useEffect, useState, useCallback } from 'react';
import api from '../../api/axios';
import { Users, Mail, BookOpen, Phone, Search } from 'lucide-react';

const TeacherStudents = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('all');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await api.get('/teacher/students');
      setStudents(response.data);
      setFilteredStudents(response.data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Correctly wrapped with useCallback
  const filterStudents = useCallback(() => {
    let filtered = students;
    
    if (searchTerm) {
      filtered = filtered.filter(student =>
        student.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.roll_number.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (classFilter !== 'all') {
      filtered = filtered.filter(student => student.class === classFilter);
    }
    
    setFilteredStudents(filtered);
  }, [students, searchTerm, classFilter]);

  useEffect(() => {
    filterStudents();
  }, [filterStudents]);

  const getUniqueClasses = () => {
    return [...new Set(students.map(s => s.class))];
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
        <h1 className="text-3xl font-bold text-gray-900">Liste des élèves</h1>
        <p className="mt-2 text-gray-600">Tous les élèves de l'école</p>
      </div>

      {/* Filtres */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher par nom ou matricule..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10"
            />
          </div>

          <select
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className="input"
          >
            <option value="all">Toutes les classes</option>
            {getUniqueClasses().map(cls => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          {filteredStudents.length} élève(s) trouvé(s)
        </div>
      </div>

      {/* Liste des élèves */}
      {filteredStudents.length === 0 ? (
        <div className="card text-center py-12">
          <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Aucun élève trouvé</p>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Matricule</th>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Classe</th>
                  <th>Téléphone parents</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-primary-600 font-semibold">
                            {student.user?.name?.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {student.roll_number}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {student.user?.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <Mail className="h-4 w-4 mr-1" />
                        {student.user?.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {student.class}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.parent_phone ? (
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-1" />
                          {student.parent_phone}
                        </div>
                      ) : (
                        <span className="text-gray-400">Non renseigné</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherStudents;
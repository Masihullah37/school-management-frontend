
// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import { GraduationCap, User, Mail, Lock, AlertCircle } from 'lucide-react';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     password_confirmation: '',
//     role: 'student',
//     // Champs étudiants
//     roll_number: '',
//     class: '',
//     date_of_birth: '',
//     parent_phone: '',
//     address: '',
//     // Champs professeurs
//     subject: '',
//     phone: '',
//     qualification: '',
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { register } = useAuth();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   setLoading(true);
//   setError("");

//   const dataToSend = { ...formData };

//   if (formData.role === "student") {
//     delete dataToSend.subject;
//     delete dataToSend.phone;
//     delete dataToSend.qualification;
//   }

//   if (formData.role === "teacher") {
//     delete dataToSend.roll_number;
//     delete dataToSend.class;
//     delete dataToSend.date_of_birth;
//     delete dataToSend.parent_phone;
//     delete dataToSend.address;
//   }

//   if (formData.role === "admin") {
//   delete dataToSend.roll_number;
//   delete dataToSend.class;
//   delete dataToSend.date_of_birth;
//   delete dataToSend.parent_phone;
//   delete dataToSend.address;
//   delete dataToSend.subject;
//   delete dataToSend.phone;
//   delete dataToSend.qualification;
// }

//   try {
//     await register(dataToSend);
//     // navigate("/dashboard");
//     if (formData.role === 'admin') {
//   navigate("/login"); // admins go to login page
// } else {
//   navigate("/dashboard"); // students/teachers go directly
// }
//   } catch (err) {
//     setError(
//       err.response?.data?.message ||
//         "Erreur lors de la création du compte"
//     );
//   } finally {
//     setLoading(false);
//   }
// };


//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 px-4 py-12">
//       <div className="max-w-2xl w-full space-y-8">
//         {/* En-tête */}
//         <div className="text-center">
//           <div className="flex justify-center">
//             <GraduationCap className="h-16 w-16 text-primary-600" />
//           </div>
//           <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
//             Créer un compte
//           </h2>
//           <p className="mt-2 text-sm text-gray-600">
//             Rejoignez l'École Numérique
//           </p>
//         </div>

//         {/* Formulaire */}
//         <div className="card">
//           {error && (
//             <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
//               <AlertCircle className="h-5 w-5 mr-2" />
//               {error}
//             </div>
//           )}

//           <form className="space-y-6" onSubmit={handleSubmit}>
//             {/* Informations de base */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Nom complet *
//                 </label>
//                 <div className="mt-1 relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <User className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     name="name"
//                     type="text"
//                     required
//                     value={formData.name}
//                     onChange={handleChange}
//                     className="input pl-10"
//                     placeholder="Jean Dupont"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Email *
//                 </label>
//                 <div className="mt-1 relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Mail className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     name="email"
//                     type="email"
//                     required
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="input pl-10"
//                     placeholder="jean.dupont@school.com"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Mot de passe *
//                 </label>
//                 <div className="mt-1 relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Lock className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     name="password"
//                     type="password"
//                     required
//                     value={formData.password}
//                     onChange={handleChange}
//                     className="input pl-10"
//                     placeholder="••••••••"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Confirmer le mot de passe *
//                 </label>
//                 <div className="mt-1 relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Lock className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     name="password_confirmation"
//                     type="password"
//                     required
//                     value={formData.password_confirmation}
//                     onChange={handleChange}
//                     className="input pl-10"
//                     placeholder="••••••••"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Rôle */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Rôle *
//               </label>
//               <select
//                 name="role"
//                 value={formData.role}
//                 onChange={handleChange}
//                 className="input mt-1"
//               >
//                 <option value="student">Élève</option>
//                 <option value="teacher">Professeur</option>
//                 <option value="admin">Administrateur</option>
//               </select>
//             </div>

//             {/* Champs spécifiques aux étudiants */}
//             {formData.role === 'student' && (
//               <div className="space-y-4 border-t pt-4">
//                 <h3 className="text-lg font-medium text-gray-900">
//                   Informations étudiant
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Numéro de matricule *
//                     </label>
//                     <input
//                       name="roll_number"
//                       type="text"
//                       required
//                       value={formData.roll_number}
//                       onChange={handleChange}
//                       className="input mt-1"
//                       placeholder="STU001"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Classe *
//                     </label>
//                     <input
//                       name="class"
//                       type="text"
//                       required
//                       value={formData.class}
//                       onChange={handleChange}
//                       className="input mt-1"
//                       placeholder="5ème B"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Date de naissance
//                     </label>
//                     <input
//                       name="date_of_birth"
//                       type="date"
//                       value={formData.date_of_birth}
//                       onChange={handleChange}
//                       className="input mt-1"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Téléphone des parents
//                     </label>
//                     <input
//                       name="parent_phone"
//                       type="tel"
//                       value={formData.parent_phone}
//                       onChange={handleChange}
//                       className="input mt-1"
//                       placeholder="+33612345678"
//                     />
//                   </div>

//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700">
//                       Adresse
//                     </label>
//                     <textarea
//                       name="address"
//                       value={formData.address}
//                       onChange={handleChange}
//                       rows="3"
//                       className="input mt-1"
//                       placeholder="123 Rue de la Paix, Paris"
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Champs spécifiques aux professeurs */}
//             {formData.role === 'teacher' && (
//               <div className="space-y-4 border-t pt-4">
//                 <h3 className="text-lg font-medium text-gray-900">
//                   Informations professeur
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Matière enseignée *
//                     </label>
//                     <input
//                       name="subject"
//                       type="text"
//                       required
//                       value={formData.subject}
//                       onChange={handleChange}
//                       className="input mt-1"
//                       placeholder="Mathématiques"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Téléphone
//                     </label>
//                     <input
//                       name="phone"
//                       type="tel"
//                       value={formData.phone}
//                       onChange={handleChange}
//                       className="input mt-1"
//                       placeholder="+33612345678"
//                     />
//                   </div>

//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700">
//                       Qualification
//                     </label>
//                     <input
//                       name="qualification"
//                       type="text"
//                       value={formData.qualification}
//                       onChange={handleChange}
//                       className="input mt-1"
//                       placeholder="Master en Mathématiques"
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}

//             <div>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading ? 'Création...' : 'Créer mon compte'}
//               </button>
//             </div>
//           </form>

//           <div className="mt-6">
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-300" />
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 bg-white text-gray-500">
//                   Déjà inscrit ?
//                 </span>
//               </div>
//             </div>

//             <div className="mt-6">
//               <Link
//                 to="/login"
//                 className="w-full btn btn-secondary text-center block"
//               >
//                 Se connecter
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import { GraduationCap, User, Mail, Lock, AlertCircle, ArrowLeft } from 'lucide-react';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     password_confirmation: '',
//     role: 'student',
//     // Champs étudiants
//     roll_number: '',
//     class: '',
//     date_of_birth: '',
//     parent_phone: '',
//     address: '',
//     // Champs professeurs
//     subject: '',
//     phone: '',
//     qualification: '',
//   });

//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { register } = useAuth();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     const dataToSend = { ...formData };

//     if (formData.role === "student") {
//       delete dataToSend.subject;
//       delete dataToSend.phone;
//       delete dataToSend.qualification;
//     }

//     if (formData.role === "teacher") {
//       delete dataToSend.roll_number;
//       delete dataToSend.class;
//       delete dataToSend.date_of_birth;
//       delete dataToSend.parent_phone;
//       delete dataToSend.address;
//     }

//     if (formData.role === "admin") {
//       delete dataToSend.roll_number;
//       delete dataToSend.class;
//       delete dataToSend.date_of_birth;
//       delete dataToSend.parent_phone;
//       delete dataToSend.address;
//       delete dataToSend.subject;
//       delete dataToSend.phone;
//       delete dataToSend.qualification;
//     }

//     try {
//       await register(dataToSend);
      
//       if (formData.role === 'admin') {
//         navigate("/admin/users"); // Redirect back to users management
//       } else {
//         navigate("/admin/users"); // Always redirect back to admin users page
//       }
//     } catch (err) {
//       setError(
//         err.response?.data?.message || "Erreur lors de la création du compte"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 px-4 py-12">
//       <div className="max-w-2xl mx-auto space-y-8">
//         {/* En-tête avec bouton retour */}
//         <div className="text-center relative">
//           <button
//             onClick={() => navigate('/admin/users')}
//             className="absolute left-0 top-1/2 transform -translate-y-1/2 btn btn-secondary flex items-center"
//           >
//             <ArrowLeft className="h-4 w-4 mr-2" />
//             Retour
//           </button>
//           <div className="flex justify-center">
//             <GraduationCap className="h-16 w-16 text-primary-600" />
//           </div>
//           <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
//             Créer un nouvel utilisateur
//           </h2>
//           <p className="mt-2 text-sm text-gray-600">
//             Administration - Création de compte
//           </p>
//         </div>

//         {/* Formulaire */}
//         <div className="card">
//           {error && (
//             <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
//               <AlertCircle className="h-5 w-5 mr-2" />
//               {error}
//             </div>
//           )}

//           <form className="space-y-6" onSubmit={handleSubmit}>
//             {/* Informations de base */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Nom complet *
//                 </label>
//                 <div className="mt-1 relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <User className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     name="name"
//                     type="text"
//                     required
//                     value={formData.name}
//                     onChange={handleChange}
//                     className="input pl-10"
//                     placeholder="Jean Dupont"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Email *
//                 </label>
//                 <div className="mt-1 relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Mail className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     name="email"
//                     type="email"
//                     required
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="input pl-10"
//                     placeholder="jean.dupont@school.com"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Mot de passe *
//                 </label>
//                 <div className="mt-1 relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Lock className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     name="password"
//                     type="password"
//                     required
//                     value={formData.password}
//                     onChange={handleChange}
//                     className="input pl-10"
//                     placeholder="••••••••"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Confirmer le mot de passe *
//                 </label>
//                 <div className="mt-1 relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Lock className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     name="password_confirmation"
//                     type="password"
//                     required
//                     value={formData.password_confirmation}
//                     onChange={handleChange}
//                     className="input pl-10"
//                     placeholder="••••••••"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Rôle */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Rôle *
//               </label>
//               <select
//                 name="role"
//                 value={formData.role}
//                 onChange={handleChange}
//                 className="input mt-1"
//               >
//                 <option value="student">Élève</option>
//                 <option value="teacher">Professeur</option>
//                 <option value="admin">Administrateur</option>
//               </select>
//             </div>

//             {/* Champs spécifiques aux étudiants */}
//             {formData.role === 'student' && (
//               <div className="space-y-4 border-t pt-4">
//                 <h3 className="text-lg font-medium text-gray-900">
//                   Informations étudiant
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Numéro de matricule *
//                     </label>
//                     <input
//                       name="roll_number"
//                       type="text"
//                       required
//                       value={formData.roll_number}
//                       onChange={handleChange}
//                       className="input mt-1"
//                       placeholder="STU001"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Classe *
//                     </label>
//                     <input
//                       name="class"
//                       type="text"
//                       required
//                       value={formData.class}
//                       onChange={handleChange}
//                       className="input mt-1"
//                       placeholder="5ème B"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Date de naissance
//                     </label>
//                     <input
//                       name="date_of_birth"
//                       type="date"
//                       value={formData.date_of_birth}
//                       onChange={handleChange}
//                       className="input mt-1"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Téléphone des parents
//                     </label>
//                     <input
//                       name="parent_phone"
//                       type="tel"
//                       value={formData.parent_phone}
//                       onChange={handleChange}
//                       className="input mt-1"
//                       placeholder="+33612345678"
//                     />
//                   </div>
//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700">
//                       Adresse
//                     </label>
//                     <textarea
//                       name="address"
//                       value={formData.address}
//                       onChange={handleChange}
//                       rows="3"
//                       className="input mt-1"
//                       placeholder="123 Rue de la Paix, Paris"
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Champs spécifiques aux professeurs */}
//             {formData.role === 'teacher' && (
//               <div className="space-y-4 border-t pt-4">
//                 <h3 className="text-lg font-medium text-gray-900">
//                   Informations professeur
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Matière enseignée *
//                     </label>
//                     <input
//                       name="subject"
//                       type="text"
//                       required
//                       value={formData.subject}
//                       onChange={handleChange}
//                       className="input mt-1"
//                       placeholder="Mathématiques"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Téléphone
//                     </label>
//                     <input
//                       name="phone"
//                       type="tel"
//                       value={formData.phone}
//                       onChange={handleChange}
//                       className="input mt-1"
//                       placeholder="+33612345678"
//                     />
//                   </div>
//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700">
//                       Qualification
//                     </label>
//                     <input
//                       name="qualification"
//                       type="text"
//                       value={formData.qualification}
//                       onChange={handleChange}
//                       className="input mt-1"
//                       placeholder="Master en Mathématiques"
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}

//             <div>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading ? 'Création...' : 'Créer le compte'}
//               </button>
//             </div>
//           </form>

//           {/* REMOVED: Login link section */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { GraduationCap, User, Mail, Lock, AlertCircle, ArrowLeft, CheckCircle } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'student',
    // Champs étudiants
    roll_number: '',
    class: '',
    date_of_birth: '',
    parent_phone: '',
    address: '',
    // Champs professeurs
    subject: '',
    phone: '',
    qualification: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [createdUser, setCreatedUser] = useState(null);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const dataToSend = { ...formData };

    if (formData.role === "student") {
      delete dataToSend.subject;
      delete dataToSend.phone;
      delete dataToSend.qualification;
    }

    if (formData.role === "teacher") {
      delete dataToSend.roll_number;
      delete dataToSend.class;
      delete dataToSend.date_of_birth;
      delete dataToSend.parent_phone;
      delete dataToSend.address;
    }

    if (formData.role === "admin") {
      delete dataToSend.roll_number;
      delete dataToSend.class;
      delete dataToSend.date_of_birth;
      delete dataToSend.parent_phone;
      delete dataToSend.address;
      delete dataToSend.subject;
      delete dataToSend.phone;
      delete dataToSend.qualification;
    }

    try {
      // Remove the unused 'result' variable
      await register(dataToSend);
      
      // Show success message instead of redirecting
      setSuccess(true);
      setCreatedUser({
        email: formData.email,
        password: formData.password,
        role: formData.role
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'student',
        roll_number: '',
        class: '',
        date_of_birth: '',
        parent_phone: '',
        address: '',
        subject: '',
        phone: '',
        qualification: '',
      });

    } catch (err) {
      setError(
        err.response?.data?.message || "Erreur lors de la création du compte"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAnother = () => {
    setSuccess(false);
    setCreatedUser(null);
  };

  const handleBackToUsers = () => {
    navigate('/admin/users');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 px-4 py-12">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* En-tête avec bouton retour */}
        <div className="text-center relative">
          <button
            onClick={() => navigate('/admin/users')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 btn btn-secondary flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </button>
          <div className="flex justify-center">
            <GraduationCap className="h-16 w-16 text-primary-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Créer un nouvel utilisateur
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Administration - Création de compte
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="card bg-green-50 border border-green-200">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600 mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-green-800">
                  Compte créé avec succès !
                </h3>
                <p className="text-green-700 mt-1">
                  L'utilisateur <strong>{createdUser.email}</strong> a été créé avec le rôle <strong>{createdUser.role}</strong>.
                </p>
                <p className="text-green-600 text-sm mt-2">
                  L'utilisateur pourra se connecter avec ces identifiants.
                </p>
                <div className="mt-4 flex space-x-3">
                  <button
                    onClick={handleCreateAnother}
                    className="btn btn-primary"
                  >
                    Créer un autre utilisateur
                  </button>
                  <button
                    onClick={handleBackToUsers}
                    className="btn btn-secondary"
                  >
                    Retour à la gestion des utilisateurs
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Formulaire */}
        {!success && (
          <div className="card">
            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                {error}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Informations de base */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nom complet *
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="input pl-10"
                      placeholder="Jean Dupont"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email *
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="input pl-10"
                      placeholder="jean.dupont@school.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Mot de passe *
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      name="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="input pl-10"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Confirmer le mot de passe *
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      name="password_confirmation"
                      type="password"
                      required
                      value={formData.password_confirmation}
                      onChange={handleChange}
                      className="input pl-10"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>

              {/* Rôle */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Rôle *
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="input mt-1"
                >
                  <option value="student">Élève</option>
                  <option value="teacher">Professeur</option>
                  <option value="admin">Administrateur</option>
                </select>
              </div>

              {/* Champs spécifiques aux étudiants */}
              {formData.role === 'student' && (
                <div className="space-y-4 border-t pt-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Informations étudiant
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Numéro de matricule *
                      </label>
                      <input
                        name="roll_number"
                        type="text"
                        required
                        value={formData.roll_number}
                        onChange={handleChange}
                        className="input mt-1"
                        placeholder="STU001"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Classe *
                      </label>
                      <input
                        name="class"
                        type="text"
                        required
                        value={formData.class}
                        onChange={handleChange}
                        className="input mt-1"
                        placeholder="5ème B"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Date de naissance
                      </label>
                      <input
                        name="date_of_birth"
                        type="date"
                        value={formData.date_of_birth}
                        onChange={handleChange}
                        className="input mt-1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Téléphone des parents
                      </label>
                      <input
                        name="parent_phone"
                        type="tel"
                        value={formData.parent_phone}
                        onChange={handleChange}
                        className="input mt-1"
                        placeholder="+33612345678"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Adresse
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows="3"
                        className="input mt-1"
                        placeholder="123 Rue de la Paix, Paris"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Champs spécifiques aux professeurs */}
              {formData.role === 'teacher' && (
                <div className="space-y-4 border-t pt-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Informations professeur
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Matière enseignée *
                      </label>
                      <input
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="input mt-1"
                        placeholder="Mathématiques"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Téléphone
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="input mt-1"
                        placeholder="+33612345678"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Qualification
                      </label>
                      <input
                        name="qualification"
                        type="text"
                        value={formData.qualification}
                        onChange={handleChange}
                        className="input mt-1"
                        placeholder="Master en Mathématiques"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Création...' : 'Créer le compte'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
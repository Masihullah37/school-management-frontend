

// // src/pages/Login.jsx
// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import { GraduationCap, Mail, Lock, AlertCircle } from 'lucide-react';
// import { getCsrfToken } from '../api/axios';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   // Get CSRF token when component mounts
//   useEffect(() => {
//     getCsrfToken();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       // Ensure we have CSRF token before login
//       await getCsrfToken();
//       await login(email, password);
//       navigate('/dashboard');
//     } catch (err) {
//       console.error('Login error:', err);
//       setError(
//         err.response?.data?.message || 
//         err.response?.data?.errors?.email?.[0] ||
//         'Email ou mot de passe incorrect'
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 px-4">
//       <div className="max-w-md w-full space-y-8">
//         {/* En-tête */}
//         <div className="text-center">
//           <div className="flex justify-center">
//             <GraduationCap className="h-16 w-16 text-primary-600" />
//           </div>
//           <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
//             École Numérique
//           </h2>
//           <p className="mt-2 text-sm text-gray-600">
//             Connectez-vous à votre compte
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
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                 Adresse email
//               </label>
//               <div className="mt-1 relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Mail className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="input pl-10"
//                   placeholder="votre.email@school.com"
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                 Mot de passe
//               </label>
//               <div className="mt-1 relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Lock className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   autoComplete="current-password"
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="input pl-10"
//                   placeholder="••••••••"
//                 />
//               </div>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading ? 'Connexion...' : 'Se connecter'}
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
//                   Ou
//                 </span>
//               </div>
//             </div>

//             <div className="mt-6">
//               <Link
//                 to="/register"
//                 className="w-full btn btn-secondary text-center block"
//               >
//                 Créer un compte
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Comptes de test */}
//         <div className="card bg-blue-50 border border-blue-200">
//           <h3 className="text-sm font-semibold text-blue-900 mb-2">
//             Comptes de test disponibles:
//           </h3>
//           <div className="space-y-1 text-xs text-blue-800">
//             <p>👨‍💼 Admin: admin@school.com / password123</p>
//             <p>👨‍🏫 Professeur: dupont@school.com / password123</p>
//             <p>👨‍🎓 Élève: marie.dubois@school.com / password123</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

// // src/pages/Login.jsx
// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import { GraduationCap, Mail, Lock, AlertCircle } from 'lucide-react';
// import { getCsrfToken } from '../api/axios';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   // Get CSRF token when component mounts
//   useEffect(() => {
//     getCsrfToken();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       // Ensure we have CSRF token before login
//       await getCsrfToken();
//       await login(email, password);
//       navigate('/dashboard');
//     } catch (err) {
//       console.error('Login error:', err);
//       setError(
//         err.response?.data?.message || err.response?.data?.errors?.email?.[0] || 'Email ou mot de passe incorrect'
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 px-4">
//       <div className="max-w-md w-full space-y-8">
//         {/* En-tête */}
//         <div className="text-center">
//           <div className="flex justify-center">
//             <GraduationCap className="h-16 w-16 text-primary-600" />
//           </div>
//           <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
//             École Numérique
//           </h2>
//           <p className="mt-2 text-sm text-gray-600">
//             Connectez-vous à votre compte
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
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                 Adresse email
//               </label>
//               <div className="mt-1 relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Mail className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="input pl-10"
//                   placeholder="votre.email@school.com"
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                 Mot de passe
//               </label>
//               <div className="mt-1 relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Lock className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   autoComplete="current-password"
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="input pl-10"
//                   placeholder="••••••••"
//                 />
//               </div>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading ? 'Connexion...' : 'Se connecter'}
//               </button>
//             </div>
//           </form>

//         </div>

//         {/* Comptes de test */}
//         <div className="card bg-blue-50 border border-blue-200">
//           <h3 className="text-sm font-semibold text-blue-900 mb-2">
//             Comptes de test disponibles:
//           </h3>
//           <div className="space-y-1 text-xs text-blue-800">
//             <p>👨‍💼 Admin: admin@school.com / password123</p>
//             <p>👨‍🏫 Professeur: dupont@school.com / password123</p>
//             <p>👨‍🎓 Élève: marie.dubois@school.com / password123</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

// src/pages/Login.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { GraduationCap, Mail, Lock, AlertCircle } from 'lucide-react';
import { getCsrfToken } from '../api/axios';
import Swal from 'sweetalert2';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Show success message if redirected from logout
  useEffect(() => {
    if (location.state?.fromLogout) {
      Swal.fire({
        title: 'Déconnexion réussie!',
        text: 'Vous avez été déconnecté avec succès.',
        icon: 'success',
        timer: 3000,
        showConfirmButton: false
      });
    }
  }, [location]);

  // Get CSRF token when component mounts
  useEffect(() => {
    getCsrfToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Ensure we have CSRF token before login
      await getCsrfToken();
      await login(email, password);
      
      // Success message
      await Swal.fire({
        title: 'Connexion réussie!',
        text: 'Bienvenue dans votre espace.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
      
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      
      // Extract error message
      let errorMessage = 'Email ou mot de passe incorrect';
      
      if (err.response?.data) {
        const { data } = err.response;
        
        if (data.message) {
          errorMessage = data.message;
        } else if (data.errors) {
          const firstError = Object.values(data.errors).flat()[0];
          errorMessage = firstError || errorMessage;
        } else if (data.error) {
          errorMessage = data.error;
        }
      }
      
      setError(errorMessage);
      
      // Show SweetAlert for error
      Swal.fire({
        title: 'Erreur de connexion',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#d33'
      });
      
      // Clear password on error
      setPassword('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 px-4">
      <div className="max-w-md w-full space-y-8">
        {/* En-tête */}
        <div className="text-center">
          <div className="flex justify-center">
            <GraduationCap className="h-16 w-16 text-primary-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            École Numérique
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Connectez-vous à votre compte
          </p>
        </div>

        {/* Formulaire */}
        <div className="card">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Adresse email
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input pl-10"
                  placeholder="votre.email@school.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pl-10"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Connexion...' : 'Se connecter'}
              </button>
            </div>
          </form>
        </div>

        {/* Comptes de test */}
        <div className="card bg-blue-50 border border-blue-200">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">
            Comptes de test disponibles:
          </h3>
          <div className="space-y-1 text-xs text-blue-800">
            <p>👨‍💼 Admin: admin@school.com / password123</p>
            <p>👨‍🏫 Professeur: dupont@school.com / password123</p>
            <p>👨‍🎓 Élève: marie.dubois@school.com / password123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
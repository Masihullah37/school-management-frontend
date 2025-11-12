// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider, useAuth } from './contexts/AuthContext';
// import Layout from './components/Layout';
// import ProtectedRoute from './components/ProtectedRoute';
// import LoadingSpinner from './components/LoadingSpinner';

// // Pages publiques
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Dashboard from './pages/Dashboard';

// // Pages étudiants
// import StudentDashboard from './pages/student/StudentDashboard';
// import StudentProfile from './pages/student/StudentProfile';
// import StudentTasks from './pages/student/StudentTasks';
// import StudentGrades from './pages/student/StudentGrades';

// // Pages professeurs
// import TeacherDashboard from './pages/teacher/TeacherDashboard';
// import TeacherProfile from './pages/teacher/TeacherProfile';
// import TeacherStudents from './pages/teacher/TeacherStudents';
// import TeacherTasks from './pages/teacher/TeacherTasks';
// import TeacherGrades from './pages/teacher/TeacherGrades';

// // Pages admin
// import AdminDashboard from './pages/admin/AdminDashboard';
// import AdminUsers from './pages/admin/AdminUsers';
// import AdminStatistics from './pages/admin/AdminStatistics';

// function AppRoutes() {
//   const { loading } = useAuth();

//   if (loading) {
//     return <LoadingSpinner />;
//   }

//   return (
//     <Routes>
//       {/* Routes publiques */}
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />

//       {/* Routes protégées */}
//       <Route
//         path="/dashboard"
//         element={
//           <ProtectedRoute>
//             <Layout>
//               <Dashboard />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />

//       {/* Routes étudiants */}
//       <Route
//         path="/student/dashboard"
//         element={
//           <ProtectedRoute roles={['student']}>
//             <Layout>
//               <StudentDashboard />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/student/profile"
//         element={
//           <ProtectedRoute roles={['student']}>
//             <Layout>
//               <StudentProfile />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/student/tasks"
//         element={
//           <ProtectedRoute roles={['student']}>
//             <Layout>
//               <StudentTasks />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/student/grades"
//         element={
//           <ProtectedRoute roles={['student']}>
//             <Layout>
//               <StudentGrades />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />

//       {/* Routes professeurs */}
//       <Route
//         path="/teacher/dashboard"
//         element={
//           <ProtectedRoute roles={['teacher']}>
//             <Layout>
//               <TeacherDashboard />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/teacher/profile"
//         element={
//           <ProtectedRoute roles={['teacher']}>
//             <Layout>
//               <TeacherProfile />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/teacher/students"
//         element={
//           <ProtectedRoute roles={['teacher']}>
//             <Layout>
//               <TeacherStudents />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/teacher/tasks"
//         element={
//           <ProtectedRoute roles={['teacher']}>
//             <Layout>
//               <TeacherTasks />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/teacher/grades"
//         element={
//           <ProtectedRoute roles={['teacher']}>
//             <Layout>
//               <TeacherGrades />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />

//       {/* Routes admin */}
//       <Route
//         path="/admin/dashboard"
//         element={
//           <ProtectedRoute roles={['admin']}>
//             <Layout>
//               <AdminDashboard />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/admin/users"
//         element={
//           <ProtectedRoute roles={['admin']}>
//             <Layout>
//               <AdminUsers />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/admin/statistics"
//         element={
//           <ProtectedRoute roles={['admin']}>
//             <Layout>
//               <AdminStatistics />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />

//       {/* Redirection par défaut */}
//       <Route path="/" element={<Navigate to="/dashboard" replace />} />
//       <Route path="*" element={<Navigate to="/dashboard" replace />} />
//     </Routes>
//   );
// }

// function App() {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <AppRoutes />
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingSpinner from './components/LoadingSpinner';

// Pages publiques
import Login from './pages/Login';
// Remove Register from public imports
import Dashboard from './pages/Dashboard';

// Pages étudiants
import StudentDashboard from './pages/student/StudentDashboard';
import StudentProfile from './pages/student/StudentProfile';
import StudentTasks from './pages/student/StudentTasks';
import StudentGrades from './pages/student/StudentGrades';

// Pages professeurs
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import TeacherProfile from './pages/teacher/TeacherProfile';
import TeacherStudents from './pages/teacher/TeacherStudents';
import TeacherTasks from './pages/teacher/TeacherTasks';
import TeacherGrades from './pages/teacher/TeacherGrades';

// Pages admin
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminStatistics from './pages/admin/AdminStatistics';

// Import Register for admin-only access
import Register from './pages/Register';

function AppRoutes() {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      {/* Routes publiques */}
      <Route path="/login" element={<Login />} />
      
      {/* REMOVED: Public register route */}
      {/* <Route path="/register" element={<Register />} /> */}

      {/* Routes protégées */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Layout>
            <Dashboard />
          </Layout>
        </ProtectedRoute>
      } />

      {/* Routes étudiants */}
      <Route path="/student/dashboard" element={
        <ProtectedRoute roles={['student']}>
          <Layout>
            <StudentDashboard />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/student/profile" element={
        <ProtectedRoute roles={['student']}>
          <Layout>
            <StudentProfile />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/student/tasks" element={
        <ProtectedRoute roles={['student']}>
          <Layout>
            <StudentTasks />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/student/grades" element={
        <ProtectedRoute roles={['student']}>
          <Layout>
            <StudentGrades />
          </Layout>
        </ProtectedRoute>
      } />

      {/* Routes professeurs */}
      <Route path="/teacher/dashboard" element={
        <ProtectedRoute roles={['teacher']}>
          <Layout>
            <TeacherDashboard />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/teacher/profile" element={
        <ProtectedRoute roles={['teacher']}>
          <Layout>
            <TeacherProfile />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/teacher/students" element={
        <ProtectedRoute roles={['teacher']}>
          <Layout>
            <TeacherStudents />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/teacher/tasks" element={
        <ProtectedRoute roles={['teacher']}>
          <Layout>
            <TeacherTasks />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/teacher/grades" element={
        <ProtectedRoute roles={['teacher']}>
          <Layout>
            <TeacherGrades />
          </Layout>
        </ProtectedRoute>
      } />

      {/* Routes admin */}
      <Route path="/admin/dashboard" element={
        <ProtectedRoute roles={['admin']}>
          <Layout>
            <AdminDashboard />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/admin/users" element={
        <ProtectedRoute roles={['admin']}>
          <Layout>
            <AdminUsers />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/admin/statistics" element={
        <ProtectedRoute roles={['admin']}>
          <Layout>
            <AdminStatistics />
          </Layout>
        </ProtectedRoute>
      } />
      
      {/* ADD: Admin-only register route */}
      <Route path="/admin/register" element={
        <ProtectedRoute roles={['admin']}>
          <Layout>
            <Register />
          </Layout>
        </ProtectedRoute>
      } />

      {/* Redirection par défaut */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

function App() {
  return (
    // <AuthProvider>
    //   <BrowserRouter>
    //     <AppRoutes />
    //   </BrowserRouter>
    // </AuthProvider>
     <BrowserRouter>          
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
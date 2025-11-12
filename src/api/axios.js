

// import axios from 'axios';

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
//   withCredentials: true,
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json',
//     'X-Requested-With': 'XMLHttpRequest',
//   }
// });

// api.defaults.xsrfCookieName = 'XSRF-TOKEN';
// api.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';

// // In your axios.js file, update getCsrfToken
// export const getCsrfToken = async () => {
//   try {
//     await api.get('/sanctum/csrf-cookie');
//     console.log('CSRF token set successfully');
    
//     // Debug: Check if cookies are actually set
//     const cookies = document.cookie.split(';');
//     const xsrfCookie = cookies.find(cookie => cookie.trim().startsWith('XSRF-TOKEN='));
//     const laravelCookie = cookies.find(cookie => cookie.trim().startsWith('laravel_session='));
    
//     console.log('XSRF-TOKEN present:', !!xsrfCookie);
//     console.log('laravel_session present:', !!laravelCookie);
//     console.log('All cookies:', document.cookie);
    
//   } catch (error) {
//     console.error('CSRF token setup failed:', error);
//   }
// };

// // Auto CSRF token handling for mutations
// api.interceptors.request.use(async (config) => {
//   if (['post', 'put', 'patch', 'delete'].includes(config.method?.toLowerCase())) {
//     const hasToken = document.cookie.split(';').some(cookie => 
//       cookie.trim().startsWith('XSRF-TOKEN=')
//     );
    
//     if (!hasToken) {
//       console.log('No CSRF token found, fetching one...');
//       await getCsrfToken();
//     }
//   }
//   return config;
// });

// export default api;

import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  }
});

// CRITICAL: These must match Laravel's cookie names
api.defaults.xsrfCookieName = 'XSRF-TOKEN';
api.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';

let csrfPromise = null;
let csrfTokenFetched = false;

export const getCsrfToken = async () => {
  // Only fetch CSRF token once per session
  if (csrfTokenFetched && getCookieValue('XSRF-TOKEN')) {
    return;
  }

  if (csrfPromise) return csrfPromise;
  
  // csrfPromise = (async () => {
  //   try {
  //     const response = await api.get('/sanctum/csrf-cookie');
  //     console.log('✅ CSRF token set successfully');
      
  //     // Wait a bit for cookie to be set
  //     await new Promise(resolve => setTimeout(resolve, 100));
      
  //     return response;
  //   } catch (error) {
  //     console.error('❌ CSRF token setup failed:', error.response?.status);
  //     throw error;
  //   } finally {
  //     csrfPromise = null;
  //   }
  // })();
  csrfPromise = (async () => {
    try {
      await api.get('/sanctum/csrf-cookie');
      csrfTokenFetched = true;
      console.log('✅ CSRF token set successfully');
      
      // Small delay to ensure cookie is set
      await new Promise(resolve => setTimeout(resolve, 50));
      
    } catch (error) {
      console.error('❌ CSRF token setup failed:', error.response?.status);
      csrfTokenFetched = false;
      throw error;
    } finally {
      csrfPromise = null;
    }
  })();
  
  return csrfPromise;
};

// Request interceptor - ensure CSRF token is present
api.interceptors.request.use(async (config) => {
  // For state-changing operations
  if (['post', 'put', 'patch', 'delete'].includes(config.method?.toLowerCase())) {
    
    // // Check if XSRF-TOKEN cookie exists
    // const cookies = document.cookie.split(';');
    // const xsrfCookie = cookies.find(cookie => cookie.trim().startsWith('XSRF-TOKEN='));

    const xsrfToken = getCookieValue('XSRF-TOKEN');
    
    // if (!xsrfCookie) {
    //   console.log('🔄 No CSRF token, fetching...');
    //   await getCsrfToken();
    // }
      // Only fetch if token doesn't exist
    if (!xsrfToken) {
      console.log('🔄 No CSRF token, fetching...');
      await getCsrfToken();
    }
    
    // CRITICAL: Manually extract and set the token
    // This ensures the header is always sent
    const token = getCookieValue('XSRF-TOKEN');
    if (token) {
      config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token);
      console.log('🔑 CSRF token attached to request');
    } else {
      console.warn('⚠️ No XSRF-TOKEN found in cookies');
    }
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 419) {
      console.error('🚫 CSRF token mismatch! Refreshing token...');
      
      // Try to refresh CSRF token once
      if (!error.config._retry) {
        error.config._retry = true;
        csrfTokenFetched = false;
        await getCsrfToken();
        return api.request(error.config);
      }
    }
    
    if (error.response?.status === 401) {
      console.log('🔒 Unauthorized');
      // Clear local flags
      csrfTokenFetched = false;
    }
    
    return Promise.reject(error);
  }
);

// Helper function to get cookie value
function getCookieValue(name) {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=').map(c => c.trim());
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null;
}

// Export function to clear CSRF flag (call on logout)
export const clearCsrfFlag = () => {
  csrfTokenFetched = false;
};

export default api;
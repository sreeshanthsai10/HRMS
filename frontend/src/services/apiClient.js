// import axios from "axios";

// const API_BASE_URL =
//   import.meta.env.VITE_API_URL || "http://localhost:5001/api";

// const apiClient = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 10000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Add auth token automatically
// apiClient.interceptors.request.use(
//   (config) => {
//     const token =
//       localStorage.getItem("token") ||
//       localStorage.getItem("idToken");

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Handle auth errors globally
// apiClient.interceptors.response.use(
//   (response) => response.data,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("token");
//       localStorage.removeItem("idToken");
//       window.location.href = "/login";
//     }
//     return Promise.reject(
//       error.response?.data || { message: error.message }
//     );
//   }
// );

// export default apiClient;

// import axios from "axios";

// const API_BASE_URL =
//   import.meta.env.VITE_API_URL || "http://localhost:5001/api";

// const apiClient = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 10000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// /* ================================
//    REQUEST INTERCEPTOR
// ================================ */

// apiClient.interceptors.request.use(
//   (config) => {
//     const token =
//       localStorage.getItem("token") ||
//       localStorage.getItem("idToken");

//     if (token) {
//       if (!config.headers) {
//         config.headers = {};
//       }

//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// /* ================================
//    RESPONSE INTERCEPTOR
// ================================ */

// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {

//     if (error.response?.status === 401) {

//       localStorage.removeItem("token");
//       localStorage.removeItem("idToken");

//       window.location.href = "/login";
//     }

//     return Promise.reject({
//       status: error.response?.status,
//       message:
//         error.response?.data?.message ||
//         error.message ||
//         "Network error",
//     });
//   }
// );

// export default apiClient;

//final
import axios from "axios";

/* =========================================================
   API BASE URL
========================================================= */

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5001/api";

/* =========================================================
   AXIOS INSTANCE
========================================================= */

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000, // increased timeout for analytics endpoints
  headers: {
    "Content-Type": "application/json",
  },
});

/* =========================================================
   REQUEST INTERCEPTOR
   - Attaches auth token
========================================================= */

apiClient.interceptors.request.use(
  (config) => {
    try {
      const token =
        localStorage.getItem("token") ||
        localStorage.getItem("idToken");

      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      console.warn("Token read error:", err);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* =========================================================
   RESPONSE INTERCEPTOR
   - Normalize responses
   - Handle auth errors
========================================================= */

apiClient.interceptors.response.use(
  (response) => {
    /*
      Important:
      Returning response.data keeps services clean.
      Your hooks expect direct data.
    */

    return response.data;
  },

  (error) => {
    const status = error.response?.status;

    /* ==========================
       AUTH ERROR
    ========================== */

    if (status === 401) {
      try {
        localStorage.removeItem("token");
        localStorage.removeItem("idToken");

        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      } catch (err) {
        console.warn("Auth redirect error:", err);
      }
    }

    /* ==========================
       NORMALIZED ERROR OBJECT
    ========================== */

    return Promise.reject({
      status,
      message:
        error.response?.data?.message ||
        error.message ||
        "Network error",
      data: error.response?.data || null,
    });
  }
);

/* =========================================================
   EXPORT
========================================================= */

export default apiClient;
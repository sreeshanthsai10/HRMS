// import api from "@/services/apiClient";

// /* ===============================
//    SUMMARY
// ================================ */
// export const getSummary = (filters) =>
//   api.get("/reports/summary", { params: filters });

// /* ===============================
//    WORKFORCE
// ================================ */
// export const getWorkforce = (filters) =>
//   api.get("/reports/workforce", { params: filters });

// /* ===============================
//    ATTENDANCE
// ================================ */
// export const getAttendance = (filters) =>
//   api.get("/reports/attendance", { params: filters });

// /* ===============================
//    DEPARTMENTS
// ================================ */
// export const getDepartments = (filters) =>
//   api.get("/reports/departments", { params: filters });

// /* ===============================
//    LEAVES
// ================================ */
// export const getLeaves = (filters) =>
//   api.get("/reports/leaves", { params: filters });

// /* ===============================
//    EMPLOYEE PERFORMANCE
// ================================ */
// export const getEmployeePerformance = (filters) =>
//   api.get("/reports/performance", {
//     params: filters,
//   });

// import api from "@/services/apiClient";

// /* ===============================
//    SUMMARY
// ================================ */

// export const getSummary = (filters) =>
//   api.get("/reports/summary", { params: filters });

// /* ===============================
//    WORKFORCE
// ================================ */

// export const getWorkforce = (filters) =>
//   api.get("/reports/workforce", { params: filters });

// /* ===============================
//    ATTENDANCE
// ================================ */

// export const getAttendance = (filters) =>
//   api.get("/reports/attendance", { params: filters });

// /* ===============================
//    DEPARTMENTS
// ================================ */

// export const getDepartments = (filters) =>
//   api.get("/reports/departments", { params: filters });

// /* ===============================
//    LEAVES
// ================================ */

// export const getLeaves = (filters) =>
//   api.get("/reports/leaves", { params: filters });

// /* ===============================
//    EMPLOYEE PERFORMANCE
// ================================ */

// export const getEmployeePerformance = (filters) =>
//   api.get("/reports/performance", { params: filters });

// /* ===============================
//    DEPARTMENT WORKING HOURS
// ================================ */

// export const getDepartmentHours = (filters) =>
//   api.get("/reports/department-hours", { params: filters });

// /* ===============================
//    PERFORMANCE INSIGHTS
// ================================ */

// export const getPerformanceInsights = (filters) =>
//   api.get("/reports/performance-insights", { params: filters });

// /* ===============================
//    DEPARTMENT BUDGETS
// ================================ */

// export const getDepartmentBudgets = (filters) =>
//   api.get("/reports/department-budgets", { params: filters });

// /* ===============================
//    EXPORT REPORTS
// ================================ */

// export const exportReports = (filters, type) =>
//   api.get("/reports/export", {
//     params: { ...filters, type },
//     responseType: "blob",
//   });


//final

import api from "@/services/apiClient";

/* =========================================================
   REPORTS ENDPOINTS
========================================================= */

const REPORTS_BASE = "/reports";

/* =========================================================
   SUMMARY (KPI)
========================================================= */

export const getSummary = async (filters = {}) => {
  return api.get(`${REPORTS_BASE}/summary`, {
    params: filters,
  });
};

/* =========================================================
   WORKFORCE TREND
========================================================= */

export const getWorkforce = async (filters = {}) => {
  return api.get(`${REPORTS_BASE}/workforce`, {
    params: filters,
  });
};

/* =========================================================
   ATTENDANCE TREND
========================================================= */

export const getAttendance = async (filters = {}) => {
  return api.get(`${REPORTS_BASE}/attendance`, {
    params: filters,
  });
};

/* =========================================================
   DEPARTMENT DISTRIBUTION
========================================================= */

export const getDepartments = async (filters = {}) => {
  return api.get(`${REPORTS_BASE}/departments`, {
    params: filters,
  });
};

/* =========================================================
   LEAVE BREAKDOWN
========================================================= */

export const getLeaves = async (filters = {}) => {
  return api.get(`${REPORTS_BASE}/leaves`, {
    params: filters,
  });
};

/* =========================================================
   EMPLOYEE PERFORMANCE TABLE
========================================================= */

export const getEmployeePerformance = async (filters = {}) => {
  return api.get(`${REPORTS_BASE}/performance`, {
    params: filters,
  });
};

/* =========================================================
   DEPARTMENT WORKING HOURS
========================================================= */

export const getDepartmentHours = async (filters = {}) => {
  return api.get(`${REPORTS_BASE}/department-hours`, {
    params: filters,
  });
};

/* =========================================================
   PERFORMANCE INSIGHTS
========================================================= */

export const getPerformanceInsights = async (filters = {}) => {
  return api.get(`${REPORTS_BASE}/performance-insights`, {
    params: filters,
  });
};

/* =========================================================
   DEPARTMENT BUDGET ANALYTICS
========================================================= */

export const getDepartmentBudgets = async (filters = {}) => {
  return api.get(`${REPORTS_BASE}/department-budgets`, {
    params: filters,
  });
};

/* =========================================================
   EXPORT REPORTS (CSV / PDF)
========================================================= */

export const exportReports = async (filters = {}, type = "csv") => {
  return api.get(`${REPORTS_BASE}/export`, {
    params: { ...filters, type },
    responseType: "blob",
  });
};
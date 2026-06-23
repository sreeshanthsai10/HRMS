// import express from "express";
// import {
//   getSummary,
//   getWorkforceData,
//   getAttendanceData,
//   getDepartmentData,
//   getLeaveData,
//   getEmployeePerformance,
//   getDepartmentWorkingHours,
//   getExportData,
//   getPerformanceInsights,
//   getDepartmentBudgets
// } from "../controllers/reports.controller";

// const router = express.Router();

// // KPI summary
// router.get("/summary", getSummary);

// // Workforce analytics
// router.get("/workforce", getWorkforceData);

// // Attendance analytics
// router.get("/attendance", getAttendanceData);

// // Department distribution
// router.get("/departments", getDepartmentData);

// // Leave breakdown
// router.get("/leaves", getLeaveData);

// // Performance table
// router.get("/performance", getEmployeePerformance);

// router.get("/department-hours", getDepartmentWorkingHours);

// router.get("/export", getExportData);
// router.get("/performance-insights", getPerformanceInsights);
// router.get("/department-budgets", getDepartmentBudgets);
// export default router;



// import express from "express";

// import {
//   getSummary,
//   getWorkforceData,
//   getAttendanceData,
//   getDepartmentData,
//   getLeaveData,
//   getEmployeePerformance,
//   getDepartmentWorkingHours,
//   getExportData,
//   getPerformanceInsights,
//   getDepartmentBudgets
// } from "../controllers/reports.controller";

// import { authenticate } from "../middleware/auth.middleware";
// import { authorize } from "../middleware/role.middleware";

// const router = express.Router();

// /* ===========================
//    PROTECT ALL ROUTES
// =========================== */

// router.use(authenticate);

// /* ===========================
//    KPI SUMMARY
// =========================== */

// router.get(
//   "/summary",
//   authorize(["CEO","HR_MANAGER","ADMIN"]),
//   getSummary
// );

// /* ===========================
//    WORKFORCE ANALYTICS
// =========================== */

// router.get(
//   "/workforce",
//   authorize(["CEO","HR_MANAGER","ADMIN","DEPARTMENT_MANAGER"]),
//   getWorkforceData
// );

// /* ===========================
//    ATTENDANCE ANALYTICS
// =========================== */

// router.get(
//   "/attendance",
//   authorize(["CEO","HR_MANAGER","ADMIN","DEPARTMENT_MANAGER"]),
//   getAttendanceData
// );

// /* ===========================
//    DEPARTMENT DISTRIBUTION
// =========================== */

// router.get(
//   "/departments",
//   authorize(["CEO","HR_MANAGER","ADMIN"]),
//   getDepartmentData
// );

// /* ===========================
//    LEAVE BREAKDOWN
// =========================== */

// router.get(
//   "/leaves",
//   authorize(["CEO","HR_MANAGER","ADMIN"]),
//   getLeaveData
// );

// /* ===========================
//    PERFORMANCE TABLE
// =========================== */

// router.get(
//   "/performance",
//   authorize(["CEO","HR_MANAGER","ADMIN","DEPARTMENT_MANAGER"]),
//   getEmployeePerformance
// );

// /* ===========================
//    DEPARTMENT WORKING HOURS
// =========================== */

// router.get(
//   "/department-hours",
//   authorize(["CEO","HR_MANAGER","ADMIN"]),
//   getDepartmentWorkingHours
// );

// /* ===========================
//    PERFORMANCE INSIGHTS
// =========================== */

// router.get(
//   "/performance-insights",
//   authorize(["CEO","HR_MANAGER","ADMIN"]),
//   getPerformanceInsights
// );

// /* ===========================
//    DEPARTMENT BUDGETS
// =========================== */

// router.get(
//   "/department-budgets",
//   authorize(["CEO","HR_MANAGER","ADMIN"]),
//   getDepartmentBudgets
// );

// /* ===========================
//    EXPORT REPORTS
// =========================== */

// router.get(
//   "/export/:format",
//   authorize(["CEO","HR_MANAGER","ADMIN"]),
//   getExportData
// );

// export default router;

// import express from "express";
// import {
//   getSummary,
//   getWorkforceData,
//   getAttendanceData,
//   getDepartmentData,
//   getLeaveData,
//   getEmployeePerformance,
//   getDepartmentWorkingHours,
//   getExportData,
//   getPerformanceInsights,
//   getDepartmentBudgets
// } from "../controllers/reports.controller";

// const router = express.Router();

// router.get("/summary", getSummary);
// router.get("/workforce", getWorkforceData);
// router.get("/attendance", getAttendanceData);
// router.get("/departments", getDepartmentData);
// router.get("/leaves", getLeaveData);
// router.get("/performance", getEmployeePerformance);
// router.get("/department-hours", getDepartmentWorkingHours);
// router.get("/performance-insights", getPerformanceInsights);
// router.get("/department-budgets", getDepartmentBudgets);
// router.get("/export", getExportData);

// export default router;

//final
import express from "express";

import {
  getSummary,
  getWorkforceData,
  getAttendanceData,
  getDepartmentData,
  getLeaveData,
  getEmployeePerformance,
  getDepartmentWorkingHours,
  getPerformanceInsights,
  getDepartmentBudgets
} from "../controllers/reports.controller";

const router = express.Router();

/* =========================================================
   REPORTS DASHBOARD APIs
========================================================= */

/*
   Executive KPI summary
*/
router.get("/summary", getSummary);

/*
   Workforce growth / headcount trend
*/
router.get("/workforce", getWorkforceData);

/*
   Attendance analytics
*/
router.get("/attendance", getAttendanceData);

/*
   Department distribution chart
*/
router.get("/departments", getDepartmentData);

/*
   Leave breakdown pie chart
*/
router.get("/leaves", getLeaveData);

/*
   Department working hours analytics
*/
router.get("/department-hours", getDepartmentWorkingHours);

/*
   Employee performance table
*/
router.get("/performance", getEmployeePerformance);

/*
   Top performers + at-risk employees
*/
router.get("/performance-insights", getPerformanceInsights);

/*
   Department payroll / budget analytics
*/
router.get("/department-budgets", getDepartmentBudgets);

/* =========================================================
   EXPORT ROUTE (future: CSV / PDF export)
========================================================= */

/*
   This route can later support:
   /reports/export?type=csv
   /reports/export?type=pdf
*/

router.get("/export", (req, res) => {

  res.status(501).json({
    success: false,
    message: "Export feature not implemented yet"
  });

});

/* ========================================================= */

export default router;
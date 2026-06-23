// // // // import { useEffect, useState } from "react";
// // // // import api from "@/services/apiClient";

// // // // export default function useReports(filters) {
// // // //   const [data, setData] = useState(null);
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [error, setError] = useState(null);

// // // //   useEffect(() => {
// // // //     const fetchAll = async () => {
// // // //       try {
// // // //         setLoading(true);
// // // //         setError(null);

// // // //         const [
// // // //           summaryRes,
// // // //           workforceRes,
// // // //           attendanceRes,
// // // //           departmentsRes,
// // // //           leavesRes,
// // // //           departmentHoursRes,
// // // //         ] = await Promise.all([
// // // //           api.get("/reports/summary", { params: filters }),
// // // //           api.get("/reports/workforce", { params: filters }),
// // // //           api.get("/reports/attendance", { params: filters }),
// // // //           api.get("/reports/departments", { params: filters }),
// // // //           api.get("/reports/leaves", { params: filters }),
// // // //           api.get("/reports/department-hours", { params: filters }),
// // // //         ]);

// // // //         setData({
// // // //           summary: summaryRes.data,
// // // //           workforceTrend: workforceRes.data,
// // // //           attendanceTrend: attendanceRes.data,
// // // //           departmentDistribution: departmentsRes.data,
// // // //           leaveBreakdown: leavesRes.data,
// // // //           departmentWorkingHours: departmentHoursRes.data,
// // // //         });

// // // //       } catch (err) {
// // // //         console.error("Reports fetch failed:", err);
// // // //         setError("Failed to load dashboard data");
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };

// // // //     fetchAll();
// // // //   }, [filters]);

// // // //   return { data, loading, error };
// // // // }

// // // import { useEffect, useState } from "react";
// // // import api from "@/services/apiClient";

// // // export default function useReports(filters) {

// // //   const [data,setData] = useState(null);
// // //   const [loading,setLoading] = useState(false);
// // //   const [error,setError] = useState(null);

// // //   useEffect(()=>{

// // //     const fetchReports = async ()=>{

// // //       try{

// // //         setLoading(true);

// // //         const res = await api.get("/reports",{
// // //           params:filters
// // //         });

// // //         setData(res.data);

// // //       }catch(err){

// // //         setError(err);

// // //       }finally{

// // //         setLoading(false);

// // //       }

// // //     };

// // //     fetchReports();

// // //   },[filters]);

// // //   return {data,loading,error};

// // // }

// // import { useEffect, useState } from "react";
// // import api from "@/services/apiClient";

// // export default function useReports(filters) {

// //   const [data, setData] = useState({
// //     summary: null,
// //     workforceTrend: [],
// //     attendanceTrend: [],
// //     departmentDistribution: [],
// //     leaveBreakdown: [],
// //     departmentWorkingHours: []
// //   });

// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {

// //     const fetchReports = async () => {

// //       try {

// //         setLoading(true);
// //         setError(null);

// //         const [
// //           summaryRes,
// //           workforceRes,
// //           attendanceRes,
// //           performanceRes
// //         ] = await Promise.all([

// //           api.get("/reports/dashboard", { params: filters }),

// //           api.get("/reports/workforce", { params: filters }),

// //           api.get("/reports/attendance", { params: filters }),

// //           api.get("/reports/performance", { params: filters })

// //         ]);

// //         setData({
// //           summary: summaryRes?.data?.data || summaryRes?.data || {},
// //           workforceTrend: workforceRes?.data?.data || [],
// //           attendanceTrend: attendanceRes?.data?.data || [],
// //           departmentDistribution: workforceRes?.data?.departmentDistribution || [],
// //           leaveBreakdown: attendanceRes?.data?.leaveBreakdown || [],
// //           departmentWorkingHours: workforceRes?.data?.departmentWorkingHours || [],
// //           performance: performanceRes?.data?.data || []
// //         });

// //       } catch (err) {

// //         console.error("Reports API Error:", err);
// //         setError(err);

// //       } finally {

// //         setLoading(false);

// //       }

// //     };

// //     fetchReports();

// //   }, [filters]);

// //   return { data, loading, error };

// // }

// // import { useEffect, useState } from "react";
// // import api from "@/services/apiClient";

// // export default function useReports(filters) {

// //   const [data, setData] = useState({
// //     summary: null,
// //     workforceTrend: [],
// //     attendanceTrend: [],
// //     departmentDistribution: [],
// //     leaveBreakdown: [],
// //     departmentWorkingHours: []
// //   });

// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {

// //     const fetchReports = async () => {

// //       try {

// //         setLoading(true);
// //         setError(null);

// //         const [
// //           summaryRes,
// //           workforceRes,
// //           attendanceRes,
// //           departmentsRes,
// //           leavesRes,
// //           hoursRes
// //         ] = await Promise.all([

// //           api.get("/reports/summary", { params: filters }),
// //           api.get("/reports/workforce", { params: filters }),
// //           api.get("/reports/attendance", { params: filters }),
// //           api.get("/reports/departments", { params: filters }),
// //           api.get("/reports/leaves", { params: filters }),
// //           api.get("/reports/department-hours", { params: filters })

// //         ]);

// //         setData({
// //           summary: summaryRes?.data?.data || {},
// //           workforceTrend: workforceRes?.data?.data || [],
// //           attendanceTrend: attendanceRes?.data?.data || [],
// //           departmentDistribution: departmentsRes?.data?.data || [],
// //           leaveBreakdown: leavesRes?.data?.data || [],
// //           departmentWorkingHours: hoursRes?.data?.data || []
// //         });

// //       } catch (err) {

// //         console.error("Reports API Error:", err);
// //         setError(err);

// //       } finally {

// //         setLoading(false);

// //       }

// //     };

// //     fetchReports();

// //   }, [filters]);

// //   return { data, loading, error };
// // }

// import { useEffect, useState } from "react";
// import api from "@/services/apiClient";

// export default function useReports(filters) {

//   const [data, setData] = useState({
//     summary: null,
//     workforceTrend: [],
//     attendanceTrend: [],
//     departmentDistribution: [],
//     leaveBreakdown: [],
//     departmentWorkingHours: [],
//     departmentBudgets: []
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {

//     const controller = new AbortController();

//     const fetchReports = async () => {

//       try {

//         setLoading(true);
//         setError(null);

//         const [
//           summaryRes,
//           workforceRes,
//           attendanceRes,
//           departmentsRes,
//           leavesRes,
//           hoursRes,
//           budgetsRes
//         ] = await Promise.all([
//           api.get("/reports/summary", { params: filters, signal: controller.signal }),
//           api.get("/reports/workforce", { params: filters, signal: controller.signal }),
//           api.get("/reports/attendance", { params: filters, signal: controller.signal }),
//           api.get("/reports/departments", { params: filters, signal: controller.signal }),
//           api.get("/reports/leaves", { params: filters, signal: controller.signal }),
//           api.get("/reports/department-hours", { params: filters, signal: controller.signal }),
//           api.get("/reports/department-budgets", { params: filters, signal: controller.signal })
//         ]);

//         setData({
//           summary: summaryRes?.data?.data || {},
//           workforceTrend: workforceRes?.data?.data || [],
//           attendanceTrend: attendanceRes?.data?.data || [],
//           departmentDistribution: departmentsRes?.data?.data || [],
//           leaveBreakdown: leavesRes?.data?.data || [],
//           departmentWorkingHours: hoursRes?.data?.data || [],
//           departmentBudgets: budgetsRes?.data?.data || []
//         });

//       } catch (err) {

//         if (err.name !== "CanceledError") {
//           console.error("Reports API Error:", err);
//           setError(err?.response?.data?.message || "Failed to load reports");
//         }

//       } finally {

//         setLoading(false);

//       }

//     };

//     fetchReports();

//     return () => controller.abort();

//   }, [
//     filters.period,
//     filters.startDate,
//     filters.endDate,
//     filters.department,
//     filters.role,
//     filters.page
//   ]);

//   return { data, loading, error };
// }

// import {useEffect,useState} from "react";
// import {
//   getSummary,
//   getWorkforce,
//   getAttendance,
//   getDepartments,
//   getLeaves,
//   getDepartmentHours
// } from "@/services/reports.service";

// export default function useReports(filters){

//   const [data,setData]=useState({});
//   const [loading,setLoading]=useState(false);
//   const [error,setError]=useState(null);

//   useEffect(()=>{

//     const fetchReports=async()=>{

//       try{

//         setLoading(true);

//         const [
//           summary,
//           workforce,
//           attendance,
//           departments,
//           leaves,
//           hours
//         ]=await Promise.all([

//           getSummary(filters),
//           getWorkforce(filters),
//           getAttendance(filters),
//           getDepartments(filters),
//           getLeaves(filters),
//           getDepartmentHours(filters)

//         ]);

//         setData({

//           summary,
//           workforceTrend:workforce,
//           attendanceTrend:attendance,
//           departmentDistribution:departments,
//           leaveBreakdown:leaves,
//           departmentWorkingHours:hours

//         });

//       }catch(err){

//         setError(err);

//       }finally{

//         setLoading(false);

//       }

//     };

//     fetchReports();

//   },[
//     filters.period,
//     filters.department,
//     filters.role,
//     filters.startDate,
//     filters.endDate
//   ]);

//   return {data,loading,error};

// }


//final

// import { useEffect, useState, useRef } from "react";

// import {
//   getSummary,
//   getWorkforce,
//   getAttendance,
//   getDepartments,
//   getLeaves,
//   getDepartmentHours
// } from "@/services/reports.service";

// /* =========================================================
//    INITIAL STATE
// ========================================================= */

// const initialState = {
//   summary: null,
//   workforceTrend: [],
//   attendanceTrend: [],
//   departmentDistribution: [],
//   leaveBreakdown: [],
//   departmentWorkingHours: []
// };

// /* =========================================================
//    REPORTS HOOK
// ========================================================= */

// export default function useReports(filters) {

//   const [data, setData] = useState(initialState);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   /* Prevent race conditions */
//   const abortRef = useRef(false);

//   useEffect(() => {

//     abortRef.current = false;

//     const fetchReports = async () => {

//       try {

//         setLoading(true);
//         setError(null);

//         const [
//           summaryRes,
//           workforceRes,
//           attendanceRes,
//           departmentsRes,
//           leavesRes,
//           hoursRes
//         ] = await Promise.all([

//           getSummary(filters),
//           getWorkforce(filters),
//           getAttendance(filters),
//           getDepartments(filters),
//           getLeaves(filters),
//           getDepartmentHours(filters)

//         ]);

//         if (abortRef.current) return;

//         setData({
//           summary: summaryRes?.data || null,
//           workforceTrend: workforceRes?.data || [],
//           attendanceTrend: attendanceRes?.data || [],
//           departmentDistribution: departmentsRes?.data || [],
//           leaveBreakdown: leavesRes?.data || [],
//           departmentWorkingHours: hoursRes?.data || []
//         });

//       } catch (err) {

//         if (!abortRef.current) {
//           console.error("Reports API Error:", err);
//           setError(err?.message || "Failed to load reports");
//         }

//       } finally {

//         if (!abortRef.current) {
//           setLoading(false);
//         }

//       }

//     };

//     fetchReports();

//     return () => {
//       abortRef.current = true;
//     };

//   }, [
//     filters.period,
//     filters.department,
//     filters.role,
//     filters.startDate,
//     filters.endDate
//   ]);

//   return {
//     data,
//     loading,
//     error
//   };
// }

import {useEffect,useState} from "react";
import {
  getSummary,
  getWorkforce,
  getAttendance,
  getDepartments,
  getLeaves,
  getDepartmentHours
} from "@/services/reports.service";

export default function useReports(filters){

  const [data,setData]=useState({});
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(null);

  useEffect(()=>{

    if(!filters) return;

    const fetchReports=async()=>{

      try{

        setLoading(true);

        const [
          summary,
          workforce,
          attendance,
          departments,
          leaves,
          hours
        ]=await Promise.all([

          getSummary(filters),
          getWorkforce(filters),
          getAttendance(filters),
          getDepartments(filters),
          getLeaves(filters),
          getDepartmentHours(filters)

        ]);

        setData({

          summary: summary?.data?.data || summary?.data,
          workforceTrend: workforce?.data?.data || workforce?.data,
          attendanceTrend: attendance?.data?.data || attendance?.data,
          departmentDistribution: departments?.data?.data || departments?.data,
          leaveBreakdown: leaves?.data?.data || leaves?.data,
          departmentWorkingHours: hours?.data?.data || hours?.data

        });

      }catch(err){

        setError(err);

      }finally{

        setLoading(false);

      }

    };

    fetchReports();

  },[
    filters?.period,
    filters?.department,
    filters?.role,
    filters?.startDate,
    filters?.endDate
  ]);

  return {data,loading,error};

}
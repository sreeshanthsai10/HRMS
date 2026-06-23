// import { useEffect, useState } from "react";
// import { getEmployeePerformance } from "@/services/reports.service";

// export default function useEmployeePerformance(filters) {
//   const [data, setData] = useState([]);
//   const [pagination, setPagination] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPerformance = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const res = await getEmployeePerformance(filters);

//         setData(res.data || []);
//         setPagination(null);

//       } catch (err) {
//         console.error("Employee Performance Error:", err);
//         setError("Failed to load employee performance");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPerformance();
//   }, [filters]);

//   return { data, pagination, loading, error };
// }

// import { useEffect, useState } from "react";
// import { getEmployeePerformance } from "@/services/reports.service";

// export default function useEmployeePerformance(filters) {

//   const [data, setData] = useState([]);
//   const [pagination, setPagination] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {

//     const controller = new AbortController();

//     const fetchPerformance = async () => {

//       try {

//         setLoading(true);
//         setError(null);

//         const res = await getEmployeePerformance({
//           ...filters,
//           signal: controller.signal
//         });

//         setData(res?.data || []);
//         setPagination(res?.pagination || null);

//       } catch (err) {

//         if (err.name !== "CanceledError") {

//           console.error("Employee Performance Error:", err);

//           setError(
//             err?.response?.data?.message ||
//             "Failed to load employee performance"
//           );

//         }

//       } finally {

//         setLoading(false);

//       }

//     };

//     fetchPerformance();

//     return () => controller.abort();

//   }, [
//     filters.role,
//     filters.department,
//     filters.search,
//     filters.page,
//     filters.limit
//   ]);

//   return { data, pagination, loading, error };
// }

//final

// import { useEffect, useState, useRef } from "react";
// import { getEmployeePerformance } from "@/services/reports.service";

// /* =========================================================
//    DEFAULT PAGINATION
// ========================================================= */

// const defaultPagination = {
//   total: 0,
//   page: 1,
//   pages: 1
// };

// /* =========================================================
//    EMPLOYEE PERFORMANCE HOOK
// ========================================================= */

// export default function useEmployeePerformance(filters) {

//   const [data, setData] = useState([]);
//   const [pagination, setPagination] = useState(defaultPagination);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   /* Prevent stale updates */
//   const abortRef = useRef(false);

//   useEffect(() => {

//     abortRef.current = false;

//     const fetchPerformance = async () => {

//       try {

//         setLoading(true);
//         setError(null);

//         const res = await getEmployeePerformance(filters);

//         if (abortRef.current) return;

//         setData(res?.data || []);
//         setPagination(res?.pagination || defaultPagination);

//       } catch (err) {

//         if (!abortRef.current) {

//           console.error("Employee Performance Error:", err);

//           setError(
//             err?.message ||
//             "Failed to load employee performance"
//           );

//         }

//       } finally {

//         if (!abortRef.current) {
//           setLoading(false);
//         }

//       }

//     };

//     fetchPerformance();

//     return () => {
//       abortRef.current = true;
//     };

//   }, [
//     filters.role,
//     filters.department,
//     filters.search,
//     filters.page,
//     filters.limit
//   ]);

//   return {
//     data,
//     pagination,
//     loading,
//     error
//   };
// }

import { useEffect, useState } from "react";
import { getEmployeePerformance } from "@/services/reports.service";

export default function useEmployeePerformance(filters) {

  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {

    /* =================================
       PREVENT RUN IF NO FILTERS
    ================================= */

    if (!filters) return;

    const controller = new AbortController();

    const fetchPerformance = async () => {

      try {

        setLoading(true);
        setError(null);

        const res = await getEmployeePerformance({
          ...filters,
          signal: controller.signal,
        });

        setData(res?.data?.data || res?.data || []);
        setPagination(res?.data?.pagination || res?.pagination || null);

      } catch (err) {

        const isCanceled =
          err?.name === "CanceledError" ||
          err?.message === "canceled" ||
          err?.code === "ERR_CANCELED";

        if (isCanceled) return;

        console.error("Employee Performance Error:", err);

        setError(
          err?.response?.data?.message ||
          "Failed to load employee performance"
        );

      } finally {

        setLoading(false);

      }

    };

    fetchPerformance();

    return () => controller.abort();

  }, [
    filters?.role,
    filters?.department,
    filters?.search,
    filters?.page,
    filters?.limit
  ]);

  return { data, pagination, loading, error };

}
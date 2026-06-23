// import { useEffect, useState } from "react";
// import api from "@/services/apiClient";

// export default function usePerformanceInsights(filters) {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchInsights = async () => {
//       try {
//         setLoading(true);
//         const res = await api.get("/reports/performance-insights", {
//           params: filters,
//         });
//         setData(res.data.data);
//       } catch (err) {
//         console.error("Performance insights error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInsights();
//   }, [filters]);

//   return { data, loading };
// }

// import { useEffect, useState } from "react";
// import api from "@/services/apiClient";

// export default function usePerformanceInsights(filters) {

//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {

//     const controller = new AbortController();

//     const fetchInsights = async () => {

//       try {

//         setLoading(true);
//         setError(null);

//         const res = await api.get(
//           "/reports/performance-insights",
//           {
//             params: filters,
//             signal: controller.signal
//           }
//         );

//         setData(res?.data?.data || null);

//       } catch (err) {

//         if (err.name !== "CanceledError") {

//           console.error("Performance insights error:", err);

//           setError(
//             err?.response?.data?.message ||
//             "Failed to load performance insights"
//           );

//         }

//       } finally {

//         setLoading(false);

//       }

//     };

//     fetchInsights();

//     return () => controller.abort();

//   }, [
//     filters.period,
//     filters.startDate,
//     filters.endDate,
//     filters.department,
//     filters.role
//   ]);

//   return { data, loading, error };
// }

//final

// import { useEffect, useState, useRef } from "react";
// import { getPerformanceInsights } from "@/services/reports.service";

// /* =========================================================
//    INITIAL STATE
// ========================================================= */

// const initialState = {
//   topPerformers: [],
//   atRiskEmployees: []
// };

// /* =========================================================
//    PERFORMANCE INSIGHTS HOOK
// ========================================================= */

// export default function usePerformanceInsights(filters) {

//   const [data, setData] = useState(initialState);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   /* Prevent race conditions */
//   const abortRef = useRef(false);

//   useEffect(() => {

//     abortRef.current = false;

//     const fetchInsights = async () => {

//       try {

//         setLoading(true);
//         setError(null);

//         const res = await getPerformanceInsights(filters);

//         if (abortRef.current) return;

//         setData(res?.data || initialState);

//       } catch (err) {

//         if (!abortRef.current) {

//           console.error("Performance insights error:", err);

//           setError(
//             err?.message ||
//             "Failed to load performance insights"
//           );

//         }

//       } finally {

//         if (!abortRef.current) {
//           setLoading(false);
//         }

//       }

//     };

//     fetchInsights();

//     return () => {
//       abortRef.current = true;
//     };

//   }, [
//     filters.period,
//     filters.startDate,
//     filters.endDate,
//     filters.department,
//     filters.role
//   ]);

//   return {
//     data,
//     loading,
//     error
//   };

// }

import { useEffect, useState } from "react";
import api from "@/services/apiClient";

export default function usePerformanceInsights(filters) {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {

    /* ============================
       GUARD: PREVENT NULL FILTERS
    ============================ */

    if (!filters) return;

    const controller = new AbortController();

    const fetchInsights = async () => {

      try {

        setLoading(true);
        setError(null);

        const res = await api.get(
          "/reports/performance-insights",
          {
            params: filters,
            signal: controller.signal
          }
        );

        setData(res?.data?.data || res?.data || null);

      } catch (err) {

        const isCanceled =
          err?.name === "CanceledError" ||
          err?.message === "canceled" ||
          err?.code === "ERR_CANCELED";

        if (isCanceled) return;

        console.error("Performance insights error:", err);

        setError(
          err?.response?.data?.message ||
          "Failed to load performance insights"
        );

      } finally {

        setLoading(false);

      }

    };

    fetchInsights();

    return () => controller.abort();

  }, [
    filters?.period,
    filters?.startDate,
    filters?.endDate,
    filters?.department,
    filters?.role
  ]);

  return { data, loading, error };

}
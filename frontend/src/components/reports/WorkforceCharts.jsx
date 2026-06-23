// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
//   Legend,
// } from "recharts";
// import { motion } from "framer-motion";
// import { getLast12Months, getMonthsBetween } from "@/utils/dateUtils";
// import { useState, useMemo } from "react";

// import { Card, CardContent } from "@/components/ui/card";
// import { Skeleton } from "@/components/ui/skeleton";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";

// export default function WorkforceCharts({
//   data = [],
//   loading,
//   error,
//   filters,
// }) {
//   const [selectedMonth, setSelectedMonth] = useState(null);

//   const handleMonthClick = (state) => {
//     if (state?.activeLabel) {
//       setSelectedMonth(state.activeLabel);
//     }
//   };

//   /* ===============================
//      LOADING / ERROR
//   =============================== */

//   if (loading) {
//     return (
//       <Card className="rounded-2xl">
//         <CardContent className="p-6 space-y-4">
//           <Skeleton className="h-5 w-40" />
//           <Skeleton className="h-[280px] w-full rounded-xl" />
//         </CardContent>
//       </Card>
//     );
//   }

//   if (error) {
//     return (
//       <Card>
//         <CardContent className="p-6 text-red-500">
//           Failed to load workforce data
//         </CardContent>
//       </Card>
//     );
//   }

//   /* ===============================
//      MONTH GENERATION
//   =============================== */

//   const months =
//     filters?.startDate && filters?.endDate
//       ? getMonthsBetween(filters.startDate, filters.endDate)
//       : getLast12Months();

//   /* ===============================
//      SAFE DATA NORMALIZATION
//   =============================== */

//   const normalizedData = useMemo(() => {
//     let lastValue = 0;

//     return months.map((m) => {
//       const found = data.find(
//         (d) => String(d.month).trim() === String(m.label).trim()
//       );

//       if (found && typeof found.headcount === "number") {
//         lastValue = found.headcount;
//         return found;
//       }

//       return {
//         month: m.label,
//         headcount: lastValue,
//       };
//     });
//   }, [data, months]);

//   /* ===============================
//      FORECAST LOGIC
//   =============================== */

//   const headcounts = normalizedData.map((d) => d.headcount || 0);

//   const first = headcounts[0] || 0;
//   const last = headcounts[headcounts.length - 1] || 0;
//   const monthsCount = headcounts.length;

//   const avgGrowth =
//     monthsCount > 1 ? (last - first) / (monthsCount - 1) : 0;

//   const forecastData = normalizedData.map((item, index) => {
//     if (index >= normalizedData.length - 3) {
//       const projected = Math.max(
//         0,
//         Math.round(last + avgGrowth * (index - (normalizedData.length - 4)))
//       );

//       return {
//         ...item,
//         forecast: projected,
//       };
//     }

//     return { ...item, forecast: null };
//   });

//   /* ===============================
//      MODAL CALCULATIONS
//   =============================== */

//   const selectedIndex = normalizedData.findIndex(
//     (d) => d.month === selectedMonth
//   );

//   const previousValue =
//     selectedIndex > 0
//       ? normalizedData[selectedIndex - 1]?.headcount || 0
//       : 0;

//   const currentValue =
//     selectedIndex >= 0
//       ? normalizedData[selectedIndex]?.headcount || 0
//       : 0;

//   const netGrowth = currentValue - previousValue;

//   /* ===============================
//      UI
//   =============================== */

//   return (
//     <>
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <Card className="rounded-2xl shadow-sm">
//           <CardContent className="p-6">
//             <h2 className="text-xl font-semibold mb-6">
//               Workforce Analytics
//             </h2>

//             <div className="w-full h-[320px]">
//               <ResponsiveContainer width="100%" height="100%">
//                 <AreaChart
//                   data={forecastData}
//                   onClick={handleMonthClick}
//                 >
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="month" />
//                   <YAxis allowDecimals={false} />
//                   <Tooltip />
//                   <Legend />

//                   <Area
//                     type="monotone"
//                     dataKey="headcount"
//                     stroke="#6366f1"
//                     fill="#6366f120"
//                     strokeWidth={3}
//                   />

//                   <Area
//                     type="monotone"
//                     dataKey="forecast"
//                     stroke="#f59e0b"
//                     strokeDasharray="5 5"
//                     strokeWidth={2}
//                     fill="#f59e0b10"
//                   />
//                 </AreaChart>
//               </ResponsiveContainer>
//             </div>
//           </CardContent>
//         </Card>
//       </motion.div>

//       <Dialog
//         open={!!selectedMonth}
//         onOpenChange={() => setSelectedMonth(null)}
//       >
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>
//               Workforce Details — {selectedMonth}
//             </DialogTitle>
//           </DialogHeader>

//           <div className="space-y-3 text-sm">
//             <p>• Total Employees: {currentValue}</p>
//             <p>
//               • Net Growth:{" "}
//               {netGrowth >= 0 ? `+${netGrowth}` : netGrowth}
//             </p>
//           </div>

//           <div className="pt-4">
//             <Button onClick={() => setSelectedMonth(null)}>
//               Close
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }

// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
//   Legend,
// } from "recharts";

// import { motion } from "framer-motion";
// import { getLast12Months, getMonthsBetween } from "@/utils/dateUtils";
// import { useState, useMemo } from "react";

// import { Card, CardContent } from "@/components/ui/card";
// import { Skeleton } from "@/components/ui/skeleton";

// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";

// import { Button } from "@/components/ui/button";

// /* ===============================
//    CUSTOM TOOLTIP
// ================================ */

// function CustomTooltip({ active, payload, label }) {
//   if (!active || !payload?.length) return null;

//   return (
//     <div className="bg-white shadow-md border rounded-md p-3 text-xs">
//       <p className="font-medium">{label}</p>

//       <p>Headcount: {payload[0]?.value ?? "-"}</p>

//       {payload[1]?.value && (
//         <p className="text-amber-500">
//           Forecast: {payload[1].value}
//         </p>
//       )}
//     </div>
//   );
// }

// export default function WorkforceCharts({
//   data = [],
//   loading,
//   error,
//   filters,
// }) {

//   const [selectedMonth, setSelectedMonth] = useState(null);

//   /* ===============================
//      LOADING / ERROR
//   =============================== */

//   if (loading) {
//     return (
//       <Card className="rounded-2xl">
//         <CardContent className="p-6 space-y-4">
//           <Skeleton className="h-5 w-40" />
//           <Skeleton className="h-[280px] w-full rounded-xl" />
//         </CardContent>
//       </Card>
//     );
//   }

//   if (error) {
//     return (
//       <Card>
//         <CardContent className="p-6 text-red-500">
//           Failed to load workforce data
//         </CardContent>
//       </Card>
//     );
//   }

//   /* ===============================
//      MONTH RANGE
//   =============================== */

//   const months = useMemo(() => {

//     return filters?.startDate && filters?.endDate
//       ? getMonthsBetween(filters.startDate, filters.endDate)
//       : getLast12Months();

//   }, [filters]);

//   /* ===============================
//      NORMALIZED DATA
//   =============================== */

//   const normalizedData = useMemo(() => {

//     const dataMap = new Map(
//       data.map((d) => [String(d.month).trim(), d.headcount])
//     );

//     let lastValue = 0;

//     return months.map((m) => {

//       const value = dataMap.get(String(m.label).trim());

//       if (typeof value === "number") {
//         lastValue = value;
//       }

//       return {
//         month: m.label,
//         headcount: lastValue,
//       };

//     });

//   }, [data, months]);

//   /* ===============================
//      FORECAST LOGIC
//   =============================== */

//   const chartData = useMemo(() => {

//     const values = normalizedData.map((d) => d.headcount);

//     const first = values[0] || 0;
//     const last = values[values.length - 1] || 0;

//     const growth =
//       values.length > 1
//         ? (last - first) / (values.length - 1)
//         : 0;

//     return normalizedData.map((item, index) => {

//       if (index >= normalizedData.length - 3) {

//         const forecast = Math.max(
//           0,
//           Math.round(last + growth * (index - (normalizedData.length - 4)))
//         );

//         return { ...item, forecast };

//       }

//       return { ...item, forecast: null };

//     });

//   }, [normalizedData]);

//   /* ===============================
//      CLICK HANDLER
//   =============================== */

//   const handleClick = (state) => {

//     if (!state?.activeLabel) return;

//     setSelectedMonth(state.activeLabel);

//   };

//   /* ===============================
//      MODAL DATA
//   =============================== */

//   const selectedIndex = chartData.findIndex(
//     (d) => d.month === selectedMonth
//   );

//   const previous =
//     selectedIndex > 0
//       ? chartData[selectedIndex - 1]?.headcount
//       : 0;

//   const current =
//     selectedIndex >= 0
//       ? chartData[selectedIndex]?.headcount
//       : 0;

//   const growth = current - previous;

//   /* ===============================
//      RENDER
//   =============================== */

//   return (
//     <>
//       <motion.div
//         initial={{ opacity: 0, y: 25 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//       >

//         <Card className="rounded-2xl shadow-sm">

//           <CardContent className="p-6">

//             <h2 className="text-xl font-semibold mb-6">
//               Workforce Analytics
//             </h2>

//             <div className="w-full h-[320px]">

//               <ResponsiveContainer width="100%" height="100%">

//                 <AreaChart
//                   data={chartData}
//                   onClick={handleClick}
//                 >

//                   <defs>
//                     <linearGradient
//                       id="headcountGradient"
//                       x1="0"
//                       y1="0"
//                       x2="0"
//                       y2="1"
//                     >
//                       <stop
//                         offset="5%"
//                         stopColor="#6366f1"
//                         stopOpacity={0.4}
//                       />
//                       <stop
//                         offset="95%"
//                         stopColor="#6366f1"
//                         stopOpacity={0}
//                       />
//                     </linearGradient>
//                   </defs>

//                   <CartesianGrid strokeDasharray="3 3" />

//                   <XAxis dataKey="month" />

//                   <YAxis allowDecimals={false} />

//                   <Tooltip content={<CustomTooltip />} />

//                   <Legend />

//                   <Area
//                     type="monotone"
//                     dataKey="headcount"
//                     stroke="#6366f1"
//                     fill="url(#headcountGradient)"
//                     strokeWidth={3}
//                   />

//                   <Area
//                     type="monotone"
//                     dataKey="forecast"
//                     stroke="#f59e0b"
//                     strokeDasharray="5 5"
//                     fillOpacity={0}
//                   />

//                 </AreaChart>

//               </ResponsiveContainer>

//             </div>

//           </CardContent>

//         </Card>

//       </motion.div>

//       {/* MODAL */}

//       <Dialog
//         open={!!selectedMonth}
//         onOpenChange={() => setSelectedMonth(null)}
//       >

//         <DialogContent>

//           <DialogHeader>

//             <DialogTitle>
//               Workforce Details — {selectedMonth}
//             </DialogTitle>

//           </DialogHeader>

//           <div className="space-y-3 text-sm">

//             <p>• Total Employees: {current}</p>

//             <p>
//               • Net Growth:{" "}
//               {growth >= 0 ? `+${growth}` : growth}
//             </p>

//           </div>

//           <div className="pt-4">

//             <Button onClick={() => setSelectedMonth(null)}>
//               Close
//             </Button>

//           </div>

//         </DialogContent>

//       </Dialog>
//     </>
//   );
// }

//final

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

import { motion } from "framer-motion";
import { useState, useMemo, memo } from "react";

import { getLast12Months, getMonthsBetween } from "@/utils/dateUtils";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

/* =========================================================
   CUSTOM TOOLTIP
========================================================= */

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-white shadow-md border rounded-md p-3 text-xs">
      <p className="font-medium">{label}</p>
      <p>Headcount: {payload[0]?.value ?? "-"}</p>

      {payload[1]?.value && (
        <p className="text-amber-500">
          Forecast: {payload[1].value}
        </p>
      )}
    </div>
  );
}

/* =========================================================
   WORKFORCE CHART COMPONENT
========================================================= */

function WorkforceCharts({
  data = [],
  loading = false,
  error = null,
  filters = {},
}) {

  const [selectedMonth, setSelectedMonth] = useState(null);

  /* =============================
     LOADING
  ============================== */

  if (loading) {
    return (
      <Card className="rounded-2xl">
        <CardContent className="p-6 space-y-4">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-[280px] w-full rounded-xl" />
        </CardContent>
      </Card>
    );
  }

  /* =============================
     ERROR
  ============================== */

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-red-500">
          Failed to load workforce data
        </CardContent>
      </Card>
    );
  }

  /* =============================
     MONTH RANGE
  ============================== */

  const months = useMemo(() => {

    if (filters?.startDate && filters?.endDate) {
      return getMonthsBetween(filters.startDate, filters.endDate);
    }

    return getLast12Months();

  }, [filters?.startDate, filters?.endDate]);

  /* =============================
     NORMALIZED DATA
  ============================== */

  const normalizedData = useMemo(() => {

    const map = new Map(
      data.map((d) => [String(d.month).trim(), d.headcount])
    );

    let lastValue = 0;

    return months.map((m) => {

      const value = map.get(String(m.label).trim());

      if (typeof value === "number") {
        lastValue = value;
      }

      return {
        month: m.label,
        headcount: lastValue,
      };

    });

  }, [data, months]);

  /* =============================
     FORECAST CALCULATION
  ============================== */

  const chartData = useMemo(() => {

    const values = normalizedData.map((d) => d.headcount);

    const first = values[0] || 0;
    const last = values[values.length - 1] || 0;

    const growth =
      values.length > 1
        ? (last - first) / (values.length - 1)
        : 0;

    return normalizedData.map((item, index) => {

      if (index >= normalizedData.length - 3) {

        const forecast = Math.max(
          0,
          Math.round(
            last +
              growth *
                (index - (normalizedData.length - 4))
          )
        );

        return { ...item, forecast };

      }

      return { ...item, forecast: null };

    });

  }, [normalizedData]);

  /* =============================
     CLICK HANDLER
  ============================== */

  const handleClick = (state) => {
    if (!state?.activeLabel) return;
    setSelectedMonth(state.activeLabel);
  };

  /* =============================
     MODAL DATA
  ============================== */

  const modalData = useMemo(() => {

    if (!selectedMonth) return null;

    const index = chartData.findIndex(
      (d) => d.month === selectedMonth
    );

    if (index === -1) return null;

    const previous =
      index > 0 ? chartData[index - 1]?.headcount : 0;

    const current = chartData[index]?.headcount || 0;

    return {
      current,
      growth: current - previous,
    };

  }, [selectedMonth, chartData]);

  /* =============================
     RENDER
  ============================== */

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >

        <Card className="rounded-2xl shadow-sm">

          <CardContent className="p-6">

            <h2 className="text-xl font-semibold mb-6">
              Workforce Analytics
            </h2>

            <div className="w-full h-[320px]">

              <ResponsiveContainer width="100%" height="100%">

                <AreaChart
                  data={chartData}
                  onClick={handleClick}
                >

                  <defs>
                    <linearGradient
                      id="headcountGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#6366f1"
                        stopOpacity={0.4}
                      />
                      <stop
                        offset="95%"
                        stopColor="#6366f1"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="month" />

                  <YAxis allowDecimals={false} />

                  <Tooltip content={<CustomTooltip />} />

                  <Legend />

                  <Area
                    type="monotone"
                    dataKey="headcount"
                    stroke="#6366f1"
                    fill="url(#headcountGradient)"
                    strokeWidth={3}
                  />

                  <Area
                    type="monotone"
                    dataKey="forecast"
                    stroke="#f59e0b"
                    strokeDasharray="5 5"
                    fillOpacity={0}
                  />

                </AreaChart>

              </ResponsiveContainer>

            </div>

          </CardContent>

        </Card>

      </motion.div>

      {/* MODAL */}

      <Dialog
        open={!!selectedMonth}
        onOpenChange={() => setSelectedMonth(null)}
      >

        <DialogContent>

          <DialogHeader>
            <DialogTitle>
              Workforce Details — {selectedMonth}
            </DialogTitle>
          </DialogHeader>

          {modalData && (

            <div className="space-y-3 text-sm">

              <p>• Total Employees: {modalData.current}</p>

              <p>
                • Net Growth:{" "}
                {modalData.growth >= 0
                  ? `+${modalData.growth}`
                  : modalData.growth}
              </p>

            </div>

          )}

          <div className="pt-4">
            <Button onClick={() => setSelectedMonth(null)}>
              Close
            </Button>
          </div>

        </DialogContent>

      </Dialog>
    </>
  );
}

/* =========================================================
   MEMOIZED EXPORT
========================================================= */

export default memo(WorkforceCharts);
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
//   Legend,
// } from "recharts";
// import { motion } from "framer-motion";
// import { useState, useMemo } from "react";
// import { getLast12Months, getMonthsBetween } from "@/utils/dateUtils";

// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Badge } from "@/components/ui/badge";

// export default function AttendanceCharts({
//   data = [],
//   loading,
//   error,
//   filters,
// }) {
//   const [selectedMonth, setSelectedMonth] = useState(null);

//   const handleClick = (state) => {
//     if (state?.activeLabel) {
//       setSelectedMonth(state.activeLabel);
//     }
//   };

//   /* ================= LOADING ================= */

//   if (loading) {
//     return (
//       <Card>
//         <CardContent className="p-6">
//           <p className="text-muted-foreground">
//             Loading Attendance Data...
//           </p>
//         </CardContent>
//       </Card>
//     );
//   }

//   if (error) {
//     return (
//       <Card>
//         <CardContent className="p-6 text-red-500">
//           Failed to load attendance data
//         </CardContent>
//       </Card>
//     );
//   }

//   /* ================= MONTH GENERATION ================= */

//   const months =
//     filters?.startDate && filters?.endDate
//       ? getMonthsBetween(filters.startDate, filters.endDate)
//       : getLast12Months();

//   /* ================= SAFE NORMALIZATION ================= */

//   const formattedData = useMemo(() => {
//     return months.map((m) => {
//       const found = data.find(
//         (d) => String(d.month).trim() === String(m.label).trim()
//       );

//       if (!found) {
//         return {
//           month: m.label,
//           attendance: 0,
//           complianceScore: 0,
//           totalDays: 0,
//           presentDays: 0,
//           lateMarks: 0,
//           leavesTaken: 0,
//         };
//       }

//       return {
//         month: m.label,
//         attendance: found.attendance || 0,
//         complianceScore: found.complianceScore || 0,
//         totalDays: found.totalDays || 0,
//         presentDays: found.presentDays || 0,
//         lateMarks: found.lateMarks || 0,
//         leavesTaken: found.leavesTaken || 0,
//       };
//     });
//   }, [data, months]);

//   const selectedData = formattedData.find(
//     (d) => d.month === selectedMonth
//   );

//   const getComplianceVariant = (score) => {
//     if (score > 90) return "default";
//     if (score > 75) return "secondary";
//     return "destructive";
//   };

//   return (
//     <>
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <Card className="rounded-2xl shadow-sm">
//           <CardContent className="p-6">
//             <h2 className="text-xl font-semibold mb-6">
//               Attendance Analytics
//             </h2>

//             <div className="w-full h-[320px]">
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={formattedData} onClick={handleClick}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="month" />
//                   <YAxis domain={[0, 100]} />
//                   <Tooltip />
//                   <Legend />

//                   <Line
//                     type="monotone"
//                     dataKey="attendance"
//                     stroke="#22c55e"
//                     strokeWidth={3}
//                     dot={{ r: 4 }}
//                   />

//                   <Line
//                     type="monotone"
//                     dataKey="complianceScore"
//                     stroke="#6366f1"
//                     strokeWidth={2}
//                     strokeDasharray="5 5"
//                     dot={{ r: 3 }}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </CardContent>
//         </Card>
//       </motion.div>

//       <Dialog
//         open={!!selectedMonth}
//         onOpenChange={() => setSelectedMonth(null)}
//       >
//         <DialogContent className="max-w-md">
//           <DialogHeader>
//             <DialogTitle>
//               Attendance Details — {selectedMonth}
//             </DialogTitle>
//           </DialogHeader>

//           {selectedData && (
//             <div className="text-sm space-y-3 mt-4">
//               <p>Attendance: {selectedData.attendance}%</p>
//               <p>Total Records: {selectedData.totalDays}</p>
//               <p>Present Days: {selectedData.presentDays}</p>
//               <p>Late Marks: {selectedData.lateMarks}</p>
//               <p>Leaves Taken: {selectedData.leavesTaken}</p>

//               <div className="flex items-center gap-2">
//                 <span>Compliance Score:</span>
//                 <Badge
//                   variant={getComplianceVariant(
//                     selectedData.complianceScore
//                   )}
//                 >
//                   {selectedData.complianceScore}%
//                 </Badge>
//               </div>

//               <div className="pt-4">
//                 <Button onClick={() => setSelectedMonth(null)}>
//                   Close
//                 </Button>
//               </div>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }

// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
//   Legend,
// } from "recharts";

// import { motion } from "framer-motion";
// import { useState, useMemo } from "react";
// import { getLast12Months, getMonthsBetween } from "@/utils/dateUtils";

// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";

// import { Badge } from "@/components/ui/badge";

// /* =========================
//    CUSTOM TOOLTIP
// ========================= */

// function CustomTooltip({ active, payload, label }) {
//   if (!active || !payload?.length) return null;

//   const attendance = payload[0]?.value;
//   const compliance = payload[1]?.value;

//   return (
//     <div className="bg-white border shadow-md rounded-md p-3 text-xs">
//       <p className="font-semibold">{label}</p>

//       <p className="text-green-600">
//         Attendance: {attendance}%
//       </p>

//       <p className="text-indigo-600">
//         Compliance: {compliance}%
//       </p>
//     </div>
//   );
// }

// export default function AttendanceCharts({
//   data = [],
//   loading,
//   error,
//   filters,
// }) {

//   const [selectedMonth, setSelectedMonth] = useState(null);

//   /* ================= LOADING ================= */

//   if (loading) {
//     return (
//       <Card>
//         <CardContent className="p-6 text-muted-foreground">
//           Loading Attendance Data...
//         </CardContent>
//       </Card>
//     );
//   }

//   if (error) {
//     return (
//       <Card>
//         <CardContent className="p-6 text-red-500">
//           Failed to load attendance data
//         </CardContent>
//       </Card>
//     );
//   }

//   /* ================= MONTH RANGE ================= */

//   const months = useMemo(() => {

//     return filters?.startDate && filters?.endDate
//       ? getMonthsBetween(filters.startDate, filters.endDate)
//       : getLast12Months();

//   }, [filters]);

//   /* ================= DATA NORMALIZATION ================= */

//   const formattedData = useMemo(() => {

//     const map = new Map(
//       data.map((d) => [String(d.month).trim(), d])
//     );

//     return months.map((m) => {

//       const found = map.get(String(m.label).trim());

//       return {
//         month: m.label,
//         attendance: found?.attendance || 0,
//         complianceScore: found?.complianceScore || 0,
//         totalDays: found?.totalDays || 0,
//         presentDays: found?.presentDays || 0,
//         lateMarks: found?.lateMarks || 0,
//         leavesTaken: found?.leavesTaken || 0,
//       };

//     });

//   }, [data, months]);

//   /* ================= CLICK ================= */

//   const handleClick = (state) => {

//     if (!state?.activeLabel) return;

//     setSelectedMonth(state.activeLabel);

//   };

//   /* ================= MODAL DATA ================= */

//   const selectedData = formattedData.find(
//     (d) => d.month === selectedMonth
//   );

//   const getComplianceVariant = (score) => {
//     if (score > 90) return "default";
//     if (score > 75) return "secondary";
//     return "destructive";
//   };

//   /* ================= RENDER ================= */

//   return (
//     <>
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//       >

//         <Card className="rounded-2xl shadow-sm">

//           <CardContent className="p-6">

//             <h2 className="text-xl font-semibold mb-6">
//               Attendance Analytics
//             </h2>

//             <div className="w-full h-[320px]">

//               <ResponsiveContainer width="100%" height="100%">

//                 <LineChart
//                   data={formattedData}
//                   onClick={handleClick}
//                 >

//                   <CartesianGrid strokeDasharray="3 3" />

//                   <XAxis dataKey="month" />

//                   <YAxis domain={[0, 100]} />

//                   <Tooltip content={<CustomTooltip />} />

//                   <Legend />

//                   <Line
//                     type="monotone"
//                     dataKey="attendance"
//                     name="Attendance %"
//                     stroke="#22c55e"
//                     strokeWidth={3}
//                     dot={{ r: 4 }}
//                   />

//                   <Line
//                     type="monotone"
//                     dataKey="complianceScore"
//                     name="Compliance Score"
//                     stroke="#6366f1"
//                     strokeWidth={2}
//                     strokeDasharray="5 5"
//                     dot={{ r: 3 }}
//                   />

//                 </LineChart>

//               </ResponsiveContainer>

//             </div>

//           </CardContent>

//         </Card>

//       </motion.div>

//       {/* ================= MODAL ================= */}

//       <Dialog
//         open={!!selectedMonth}
//         onOpenChange={() => setSelectedMonth(null)}
//       >

//         <DialogContent className="max-w-md">

//           <DialogHeader>

//             <DialogTitle>
//               Attendance Details — {selectedMonth}
//             </DialogTitle>

//           </DialogHeader>

//           {selectedData && (

//             <div className="text-sm space-y-3 mt-4">

//               <p>
//                 Attendance: {selectedData.attendance}%
//               </p>

//               <p>
//                 Total Records: {selectedData.totalDays}
//               </p>

//               <p>
//                 Present Days: {selectedData.presentDays}
//               </p>

//               <p>
//                 Late Marks: {selectedData.lateMarks}
//               </p>

//               <p>
//                 Leaves Taken: {selectedData.leavesTaken}
//               </p>

//               <div className="flex items-center gap-2">

//                 <span>Compliance Score:</span>

//                 <Badge
//                   variant={getComplianceVariant(
//                     selectedData.complianceScore
//                   )}
//                 >
//                   {selectedData.complianceScore}%
//                 </Badge>

//               </div>

//               <div className="pt-4">

//                 <Button onClick={() => setSelectedMonth(null)}>
//                   Close
//                 </Button>

//               </div>

//             </div>

//           )}

//         </DialogContent>

//       </Dialog>
//     </>
//   );
// }


//final

import {
  LineChart,
  Line,
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
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";

/* =========================================================
   CUSTOM TOOLTIP
========================================================= */

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  const attendance = payload[0]?.value ?? "-";
  const compliance = payload[1]?.value ?? "-";

  return (
    <div className="bg-white border shadow-md rounded-md p-3 text-xs">
      <p className="font-semibold">{label}</p>

      <p className="text-green-600">
        Attendance: {attendance}%
      </p>

      <p className="text-indigo-600">
        Compliance: {compliance}%
      </p>
    </div>
  );
}

/* =========================================================
   ATTENDANCE CHART COMPONENT
========================================================= */

function AttendanceCharts({
  data = [],
  loading = false,
  error = null,
  filters = {},
}) {

  const [selectedMonth, setSelectedMonth] = useState(null);

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6 text-muted-foreground">
          Loading Attendance Data...
        </CardContent>
      </Card>
    );
  }

  /* ================= ERROR ================= */

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-red-500">
          Failed to load attendance data
        </CardContent>
      </Card>
    );
  }

  /* ================= MONTH RANGE ================= */

  const months = useMemo(() => {

    if (filters?.startDate && filters?.endDate) {
      return getMonthsBetween(filters.startDate, filters.endDate);
    }

    return getLast12Months();

  }, [filters?.startDate, filters?.endDate]);

  /* ================= DATA NORMALIZATION ================= */

  const formattedData = useMemo(() => {

    const map = new Map(
      data.map((d) => [String(d.month).trim(), d])
    );

    return months.map((m) => {

      const found = map.get(String(m.label).trim());

      return {
        month: m.label,
        attendance: found?.attendance || 0,
        complianceScore: found?.complianceScore || 0,
        totalDays: found?.totalDays || 0,
        presentDays: found?.presentDays || 0,
        lateMarks: found?.lateMarks || 0,
        leavesTaken: found?.leavesTaken || 0,
      };

    });

  }, [data, months]);

  /* ================= CLICK ================= */

  const handleClick = (state) => {
    if (!state?.activeLabel) return;
    setSelectedMonth(state.activeLabel);
  };

  /* ================= MODAL DATA ================= */

  const selectedData = useMemo(() => {

    if (!selectedMonth) return null;

    return formattedData.find(
      (d) => d.month === selectedMonth
    );

  }, [selectedMonth, formattedData]);

  const getComplianceVariant = (score) => {
    if (score > 90) return "default";
    if (score > 75) return "secondary";
    return "destructive";
  };

  /* ================= RENDER ================= */

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
              Attendance Analytics
            </h2>

            <div className="w-full h-[320px]">

              <ResponsiveContainer width="100%" height="100%">

                <LineChart
                  data={formattedData}
                  onClick={handleClick}
                >

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="month" />

                  <YAxis domain={[0, 100]} />

                  <Tooltip content={<CustomTooltip />} />

                  <Legend />

                  <Line
                    type="monotone"
                    dataKey="attendance"
                    name="Attendance %"
                    stroke="#22c55e"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />

                  <Line
                    type="monotone"
                    dataKey="complianceScore"
                    name="Compliance Score"
                    stroke="#6366f1"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ r: 3 }}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

          </CardContent>

        </Card>

      </motion.div>

      {/* ================= MODAL ================= */}

      <Dialog
        open={!!selectedMonth}
        onOpenChange={() => setSelectedMonth(null)}
      >

        <DialogContent className="max-w-md">

          <DialogHeader>

            <DialogTitle>
              Attendance Details — {selectedMonth}
            </DialogTitle>

          </DialogHeader>

          {selectedData && (

            <div className="text-sm space-y-3 mt-4">

              <p>
                Attendance: {selectedData.attendance}%
              </p>

              <p>
                Total Records: {selectedData.totalDays}
              </p>

              <p>
                Present Days: {selectedData.presentDays}
              </p>

              <p>
                Late Marks: {selectedData.lateMarks}
              </p>

              <p>
                Leaves Taken: {selectedData.leavesTaken}
              </p>

              <div className="flex items-center gap-2">

                <span>Compliance Score:</span>

                <Badge
                  variant={getComplianceVariant(
                    selectedData.complianceScore
                  )}
                >
                  {selectedData.complianceScore}%
                </Badge>

              </div>

              <div className="pt-4">

                <Button onClick={() => setSelectedMonth(null)}>
                  Close
                </Button>

              </div>

            </div>

          )}

        </DialogContent>

      </Dialog>
    </>
  );
}

/* =========================================================
   MEMOIZED EXPORT
========================================================= */

export default memo(AttendanceCharts);
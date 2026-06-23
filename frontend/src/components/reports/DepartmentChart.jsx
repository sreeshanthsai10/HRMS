// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
//   Legend,
// } from "recharts";
// import { motion } from "framer-motion";
// import { useState, useMemo } from "react";

// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Badge } from "@/components/ui/badge";

// export default function DepartmentChart({
//   data = [],
//   loading,
//   error,
// }) {
//   const [selectedDept, setSelectedDept] = useState(null);

//   const handleClick = (state) => {
//     if (state?.activeLabel) {
//       setSelectedDept(state.activeLabel);
//     }
//   };

//   /* ===============================
//      SAFE DATA NORMALIZATION
//   =============================== */

//   const formattedData = useMemo(() => {
//     const totalEmployees = data.reduce(
//       (sum, d) => sum + (d.employees || 0),
//       0
//     );

//     return data.map((d) => ({
//       department: d.department,
//       employees: d.employees || 0,
//       avgSalary: d.avgSalary || 0,
//       totalSalary: d.totalSalary || 0,
//       percentage:
//         d.percentage ??
//         (totalEmployees > 0
//           ? Math.round((d.employees / totalEmployees) * 100)
//           : 0),
//     }));
//   }, [data]);

//   const selectedData = formattedData.find(
//     (d) => d.department === selectedDept
//   );

//   if (loading) {
//     return (
//       <Card>
//         <CardContent className="p-6">
//           <p className="text-muted-foreground">
//             Loading Department Data...
//           </p>
//         </CardContent>
//       </Card>
//     );
//   }

//   if (error) {
//     return (
//       <Card>
//         <CardContent className="p-6 text-red-500">
//           Failed to load department data
//         </CardContent>
//       </Card>
//     );
//   }

//   if (!formattedData.length) {
//     return (
//       <Card>
//         <CardContent className="p-6 text-muted-foreground">
//           No department data available.
//         </CardContent>
//       </Card>
//     );
//   }

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
//               Department Distribution
//             </h2>

//             <div className="w-full h-[320px]">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={formattedData} onClick={handleClick}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="department" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />

//                   <Bar
//                     dataKey="employees"
//                     fill="#6366f1"
//                     radius={[8, 8, 0, 0]}
//                     activeBar={false}
//                   />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </CardContent>
//         </Card>
//       </motion.div>

//       {/* ================= Dialog ================= */}
//       <Dialog
//         open={!!selectedDept}
//         onOpenChange={() => setSelectedDept(null)}
//       >
//         <DialogContent className="max-w-md">
//           <DialogHeader>
//             <DialogTitle>
//               {selectedDept} Department Details
//             </DialogTitle>
//           </DialogHeader>

//           {selectedData && (
//             <div className="text-sm space-y-3 mt-4">
//               <p>
//                 Total Employees:{" "}
//                 <Badge variant="secondary">
//                   {selectedData.employees}
//                 </Badge>
//               </p>

//               <p>
//                 Avg Salary: ₹
//                 {selectedData.avgSalary.toLocaleString()}
//               </p>

//               <p>
//                 Total Salary: ₹
//                 {selectedData.totalSalary.toLocaleString()}
//               </p>

//               <p>
//                 Percentage:{" "}
//                 <Badge variant="outline">
//                   {selectedData.percentage}%
//                 </Badge>
//               </p>

//               <div className="pt-4">
//                 <Button onClick={() => setSelectedDept(null)}>
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
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
//   Legend,
//   Cell,
// } from "recharts";

// import { motion } from "framer-motion";
// import { useState, useMemo } from "react";

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

// function CustomTooltip({ active, payload }) {

//   if (!active || !payload?.length) return null;

//   const d = payload[0].payload;

//   return (
//     <div className="bg-white border shadow-md rounded-md p-3 text-xs">
//       <p className="font-semibold">{d.department}</p>

//       <p>Employees: {d.employees}</p>

//       <p>Avg Salary: ₹{d.avgSalary.toLocaleString()}</p>

//       <p>Total Salary: ₹{d.totalSalary.toLocaleString()}</p>

//       <p>Share: {d.percentage}%</p>
//     </div>
//   );
// }

// export default function DepartmentChart({
//   data = [],
//   loading,
//   error,
// }) {

//   const [selectedDept, setSelectedDept] = useState(null);

//   /* =========================
//      DATA NORMALIZATION
//   ========================= */

//   const formattedData = useMemo(() => {

//     const totalEmployees = data.reduce(
//       (sum, d) => sum + (d.employees || 0),
//       0
//     );

//     return data
//       .map((d) => ({
//         department: d.department,
//         employees: d.employees || 0,
//         avgSalary: d.avgSalary || 0,
//         totalSalary: d.totalSalary || 0,
//         percentage:
//           d.percentage ??
//           (totalEmployees > 0
//             ? Math.round((d.employees / totalEmployees) * 100)
//             : 0),
//       }))
//       .sort((a, b) => b.employees - a.employees);

//   }, [data]);

//   const selectedData = formattedData.find(
//     (d) => d.department === selectedDept
//   );

//   /* =========================
//      CHART CLICK
//   ========================= */

//   const handleClick = (state) => {

//     if (!state?.activePayload?.length) return;

//     const dept = state.activePayload[0].payload.department;

//     setSelectedDept(dept);

//   };

//   /* =========================
//      STATES
//   ========================= */

//   if (loading) {
//     return (
//       <Card>
//         <CardContent className="p-6 text-muted-foreground">
//           Loading Department Data...
//         </CardContent>
//       </Card>
//     );
//   }

//   if (error) {
//     return (
//       <Card>
//         <CardContent className="p-6 text-red-500">
//           Failed to load department data
//         </CardContent>
//       </Card>
//     );
//   }

//   if (!formattedData.length) {
//     return (
//       <Card>
//         <CardContent className="p-6 text-muted-foreground">
//           No department data available.
//         </CardContent>
//       </Card>
//     );
//   }

//   /* =========================
//      RENDER
//   ========================= */

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
//               Department Distribution
//             </h2>

//             <div className="w-full h-[320px]">

//               <ResponsiveContainer width="100%" height="100%">

//                 <BarChart
//                   data={formattedData}
//                   onClick={handleClick}
//                 >

//                   <CartesianGrid strokeDasharray="3 3" />

//                   <XAxis dataKey="department" />

//                   <YAxis allowDecimals={false} />

//                   <Tooltip content={<CustomTooltip />} />

//                   <Legend />

//                   <Bar
//                     dataKey="employees"
//                     radius={[8, 8, 0, 0]}
//                   >

//                     {formattedData.map((entry, index) => (
//                       <Cell
//                         key={`cell-${index}`}
//                         fill="#6366f1"
//                       />
//                     ))}

//                   </Bar>

//                 </BarChart>

//               </ResponsiveContainer>

//             </div>

//           </CardContent>

//         </Card>

//       </motion.div>

//       {/* ================= MODAL ================= */}

//       <Dialog
//         open={!!selectedDept}
//         onOpenChange={() => setSelectedDept(null)}
//       >

//         <DialogContent className="max-w-md">

//           <DialogHeader>

//             <DialogTitle>
//               {selectedDept} Department Details
//             </DialogTitle>

//           </DialogHeader>

//           {selectedData && (

//             <div className="text-sm space-y-3 mt-4">

//               <p>
//                 Total Employees:
//                 <Badge className="ml-2" variant="secondary">
//                   {selectedData.employees}
//                 </Badge>
//               </p>

//               <p>
//                 Avg Salary: ₹
//                 {selectedData.avgSalary.toLocaleString()}
//               </p>

//               <p>
//                 Total Salary: ₹
//                 {selectedData.totalSalary.toLocaleString()}
//               </p>

//               <p>
//                 Workforce Share:
//                 <Badge className="ml-2" variant="outline">
//                   {selectedData.percentage}%
//                 </Badge>
//               </p>

//               <div className="pt-4">

//                 <Button onClick={() => setSelectedDept(null)}>
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
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  Cell,
} from "recharts";

import { motion } from "framer-motion";
import { useState, useMemo, memo } from "react";

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

function CustomTooltip({ active, payload }) {

  if (!active || !payload?.length) return null;

  const d = payload[0].payload;

  return (
    <div className="bg-white border shadow-md rounded-md p-3 text-xs">

      <p className="font-semibold">{d.department}</p>

      <p>Employees: {d.employees}</p>

      <p>Avg Salary: ₹{d.avgSalary?.toLocaleString() || 0}</p>

      <p>Total Salary: ₹{d.totalSalary?.toLocaleString() || 0}</p>

      <p>Share: {d.percentage}%</p>

    </div>
  );
}

/* =========================================================
   COMPONENT
========================================================= */

function DepartmentChart({
  data = [],
  loading = false,
  error = null,
}) {

  const [selectedDept, setSelectedDept] = useState(null);

  /* =========================================================
     DATA NORMALIZATION (MEMOIZED)
  ========================================================= */

  const formattedData = useMemo(() => {

    if (!Array.isArray(data)) return [];

    const totalEmployees = data.reduce(
      (sum, d) => sum + (d.employees || 0),
      0
    );

    return data
      .map((d) => ({
        department: d.department || "Unknown",
        employees: d.employees || 0,
        avgSalary: d.avgSalary || 0,
        totalSalary: d.totalSalary || 0,
        percentage:
          d.percentage ??
          (totalEmployees > 0
            ? Math.round((d.employees / totalEmployees) * 100)
            : 0),
      }))
      .sort((a, b) => b.employees - a.employees);

  }, [data]);

  /* =========================================================
     SELECTED DATA (MEMOIZED)
  ========================================================= */

  const selectedData = useMemo(() => {

    if (!selectedDept) return null;

    return formattedData.find(
      (d) => d.department === selectedDept
    );

  }, [selectedDept, formattedData]);

  /* =========================================================
     CHART CLICK
  ========================================================= */

  const handleClick = (state) => {

    if (!state?.activePayload?.length) return;

    const dept = state.activePayload[0].payload.department;

    setSelectedDept(dept);

  };

  /* =========================================================
     STATES
  ========================================================= */

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6 text-muted-foreground">
          Loading Department Data...
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-red-500">
          Failed to load department data
        </CardContent>
      </Card>
    );
  }

  if (!formattedData.length) {
    return (
      <Card>
        <CardContent className="p-6 text-muted-foreground">
          No department data available.
        </CardContent>
      </Card>
    );
  }

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >

        <Card className="rounded-2xl shadow-sm">

          <CardContent className="p-6">

            <h2 className="text-xl font-semibold mb-6">
              Department Distribution
            </h2>

            <div className="w-full h-[320px]">

              <ResponsiveContainer width="100%" height="100%">

                <BarChart
                  data={formattedData}
                  onClick={handleClick}
                >

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="department" />

                  <YAxis allowDecimals={false} />

                  <Tooltip content={<CustomTooltip />} />

                  <Legend />

                  <Bar
                    dataKey="employees"
                    radius={[8, 8, 0, 0]}
                  >

                    {formattedData.map((_, index) => (
                      <Cell
                        key={index}
                        fill="#6366f1"
                      />
                    ))}

                  </Bar>

                </BarChart>

              </ResponsiveContainer>

            </div>

          </CardContent>

        </Card>

      </motion.div>

      {/* ================= MODAL ================= */}

      <Dialog
        open={!!selectedDept}
        onOpenChange={() => setSelectedDept(null)}
      >

        <DialogContent className="max-w-md">

          <DialogHeader>

            <DialogTitle>
              {selectedDept} Department Details
            </DialogTitle>

          </DialogHeader>

          {selectedData && (

            <div className="text-sm space-y-3 mt-4">

              <p>
                Total Employees:
                <Badge className="ml-2" variant="secondary">
                  {selectedData.employees}
                </Badge>
              </p>

              <p>
                Avg Salary: ₹
                {selectedData.avgSalary.toLocaleString()}
              </p>

              <p>
                Total Salary: ₹
                {selectedData.totalSalary.toLocaleString()}
              </p>

              <p>
                Workforce Share:
                <Badge className="ml-2" variant="outline">
                  {selectedData.percentage}%
                </Badge>
              </p>

              <div className="pt-4">

                <Button
                  onClick={() => setSelectedDept(null)}
                >
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
   MEMO EXPORT (PERFORMANCE)
========================================================= */

export default memo(DepartmentChart);
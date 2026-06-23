// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
// } from "recharts";
// import { motion } from "framer-motion";
// import { useMemo } from "react";

// import { Card, CardContent } from "@/components/ui/card";
// import { Skeleton } from "@/components/ui/skeleton";

// const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444"];

// export default function LeavePieChart({
//   data = [],
//   loading,
//   error,
// }) {
//   /* ===============================
//      SAFE NORMALIZATION
//   =============================== */

//   const formattedData = useMemo(() => {
//     if (!Array.isArray(data)) return [];

//     return data.map((item) => ({
//       name: item.name || item.leaveType || "Unknown",
//       value: item.value || item.count || 0,
//     }));
//   }, [data]);

//   const totalLeaves = formattedData.reduce(
//     (acc, item) => acc + item.value,
//     0
//   );

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
//           Failed to load leave data
//         </CardContent>
//       </Card>
//     );
//   }

//   if (!formattedData.length) {
//     return (
//       <Card>
//         <CardContent className="p-6 text-muted-foreground">
//           No leave data available.
//         </CardContent>
//       </Card>
//     );
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 40 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <Card className="rounded-2xl shadow-sm">
//         <CardContent className="p-6">
//           <h2 className="text-xl font-semibold mb-6">
//             Leave Breakdown
//           </h2>

//           <div className="relative w-full h-[320px]">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Tooltip />
//                 <Legend />

//                 <Pie
//                   data={formattedData}
//                   dataKey="value"
//                   nameKey="name"
//                   innerRadius={70}
//                   outerRadius={110}
//                   paddingAngle={3}
//                 >
//                   {formattedData.map((entry, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={COLORS[index % COLORS.length]}
//                     />
//                   ))}
//                 </Pie>
//               </PieChart>
//             </ResponsiveContainer>

//             {/* Center Total */}
//             <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
//               <p className="text-sm font-medium text-muted-foreground">
//                 Total Leaves
//               </p>
//               <p className="text-3xl font-bold">
//                 {totalLeaves}
//               </p>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </motion.div>
//   );
// }

//final
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { motion } from "framer-motion";
import { useMemo, memo } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/* =========================================================
   COLOR PALETTE
========================================================= */

const COLORS = [
  "#6366f1",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#06b6d4",
  "#8b5cf6",
];

/* =========================================================
   CUSTOM TOOLTIP
========================================================= */

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;

  const item = payload[0]?.payload;

  return (
    <div className="bg-white border shadow-md rounded-md p-3 text-xs">
      <p className="font-semibold">{item.name}</p>
      <p>Leaves: {item.value}</p>
      <p>Share: {item.percentage}%</p>
    </div>
  );
}

/* =========================================================
   COMPONENT
========================================================= */

function LeavePieChart({
  data = [],
  loading = false,
  error = null,
}) {

  /* =========================================================
     DATA NORMALIZATION
  ========================================================= */

  const formattedData = useMemo(() => {

    if (!Array.isArray(data)) return [];

    const normalized = data.map((item) => ({
      name: item.name || item.leaveType || "Unknown",
      value: item.value || item.count || 0,
    }));

    const total = normalized.reduce(
      (acc, item) => acc + item.value,
      0
    );

    return normalized.map((item) => ({
      ...item,
      percentage:
        total > 0
          ? Math.round((item.value / total) * 100)
          : 0,
    }));

  }, [data]);

  /* =========================================================
     TOTAL LEAVES
  ========================================================= */

  const totalLeaves = useMemo(() => {

    return formattedData.reduce(
      (acc, item) => acc + item.value,
      0
    );

  }, [formattedData]);

  /* =========================================================
     LOADING
  ========================================================= */

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

  /* =========================================================
     ERROR
  ========================================================= */

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-red-500">
          Failed to load leave data
        </CardContent>
      </Card>
    );
  }

  /* =========================================================
     EMPTY STATE
  ========================================================= */

  if (!formattedData.length) {
    return (
      <Card>
        <CardContent className="p-6 text-muted-foreground">
          No leave data available.
        </CardContent>
      </Card>
    );
  }

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >

      <Card className="rounded-2xl shadow-sm">

        <CardContent className="p-6">

          <h2 className="text-xl font-semibold mb-6">
            Leave Breakdown
          </h2>

          <div className="relative w-full h-[320px]">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Tooltip content={<CustomTooltip />} />

                <Legend />

                <Pie
                  data={formattedData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={3}
                >

                  {formattedData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}

                </Pie>

              </PieChart>

            </ResponsiveContainer>

            {/* CENTER LABEL */}

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">

              <p className="text-sm font-medium text-muted-foreground">
                Total Leaves
              </p>

              <p className="text-3xl font-bold">
                {totalLeaves}
              </p>

            </div>

          </div>

        </CardContent>

      </Card>

    </motion.div>
  );
}

/* =========================================================
   MEMO EXPORT
========================================================= */

export default memo(LeavePieChart);
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
// } from "recharts";
// import { motion } from "framer-motion";
// import { Card, CardContent } from "@/components/ui/card";
// import { Skeleton } from "@/components/ui/skeleton";

// const COLORS = [
//   "#10b981", // Productive
//   "#6366f1", // Neutral
//   "#ef4444", // Non-Productive
// ];

// export default function AppUsageChart({
//   data = [],
//   loading,
//   error,
// }) {
//   const total = data.reduce(
//     (sum, item) => sum + (item.value || 0),
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
//           Failed to load app usage data
//         </CardContent>
//       </Card>
//     );
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <Card className="rounded-2xl shadow-sm">
//         <CardContent className="p-6">
//           <h2 className="text-xl font-semibold mb-6">
//             App Usage Analysis
//           </h2>

//           <div className="relative w-full h-[320px]">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Tooltip />
//                 <Legend />

//                 <Pie
//                   data={data}
//                   dataKey="value"
//                   nameKey="name"
//                   innerRadius={70}
//                   outerRadius={110}
//                   paddingAngle={4}
//                 >
//                   {data.map((entry, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={
//                         COLORS[index % COLORS.length]
//                       }
//                     />
//                   ))}
//                 </Pie>
//               </PieChart>
//             </ResponsiveContainer>

//             {/* Center Label */}
//             <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
//               <p className="text-sm text-muted-foreground">
//                 Total Usage
//               </p>
//               <p className="text-3xl font-bold">
//                 {total} hrs
//               </p>
//             </div>
//           </div>

//         </CardContent>
//       </Card>
//     </motion.div>
//   );
// }

//final
import { memo, useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import SkeletonCard from "@/components/reports/SkeletonCard";

/*
=========================================================
COLOR SCALE
=========================================================
*/

const COLORS = [
  "#10b981", // Productive
  "#6366f1", // Neutral
  "#ef4444", // Non-Productive
];

/*
=========================================================
APP USAGE CHART
=========================================================
*/

function AppUsageChart({
  data = [],
  loading,
  error,
}) {

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <SkeletonCard variant="chart" height="h-[320px]" />
    );
  }

  /* =====================================================
     ERROR
  ===================================================== */

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-red-500">
          Failed to load app usage data
        </CardContent>
      </Card>
    );
  }

  /* =====================================================
     EMPTY STATE
  ===================================================== */

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-muted-foreground">
          No app usage data available
        </CardContent>
      </Card>
    );
  }

  /* =====================================================
     SAFE DATA
  ===================================================== */

  const formattedData = useMemo(() => {

    return data.map((item) => ({
      name: item.name || "Unknown",
      value: Number(item.value) || 0,
    }));

  }, [data]);

  /* =====================================================
     TOTAL HOURS
  ===================================================== */

  const total = useMemo(() => {

    return formattedData.reduce(
      (sum, item) => sum + item.value,
      0
    );

  }, [formattedData]);

  /* =====================================================
     RENDER
  ===================================================== */

  return (

    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >

      <Card className="rounded-2xl shadow-sm">

        <CardContent className="p-6">

          <h2 className="text-xl font-semibold mb-6">
            App Usage Analysis
          </h2>

          <div className="relative w-full h-[320px]">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Tooltip />

                <Legend />

                <Pie
                  data={formattedData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={4}
                >

                  {formattedData.map((entry) => (

                    <Cell
                      key={entry.name}
                      fill={
                        COLORS[
                          formattedData.indexOf(entry) %
                          COLORS.length
                        ]
                      }
                    />

                  ))}

                </Pie>

              </PieChart>

            </ResponsiveContainer>

            {/* CENTER LABEL */}

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">

              <p className="text-sm text-muted-foreground">
                Total Usage
              </p>

              <p className="text-3xl font-bold">
                {total} hrs
              </p>

            </div>

          </div>

        </CardContent>

      </Card>

    </motion.div>

  );

}

/*
=========================================================
MEMOIZED COMPONENT
=========================================================
*/

export default memo(AppUsageChart);
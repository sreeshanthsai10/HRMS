// import { motion } from "framer-motion";
// import CountUp from "react-countup";

// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import SkeletonCard from "@/components/reports/SkeletonCard";

// export default function DepartmentWorkingHours({
//   data,
//   loading,
//   error,
// }) {
//   /* ===============================
//      LOADING STATE
//   =============================== */
//   if (loading) {
//     return (
//       <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
//         {[...Array(3)].map((_, i) => (
//           <SkeletonCard key={i} />
//         ))}
//       </div>
//     );
//   }

//   /* ===============================
//      ERROR STATE
//   =============================== */
//   if (error) {
//     return (
//       <div className="mt-10 text-red-500">
//         Failed to load department working hours
//       </div>
//     );
//   }

//   /* ===============================
//      NORMALIZE DATA
//   =============================== */

//   const departments = Array.isArray(data)
//     ? data
//     : data?.data || [];

//   if (!departments.length) return null;

//   return (
//     <div className="mt-10">
//       <h2 className="text-xl font-semibold mb-6">
//         Department Working Hours
//       </h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
//         {departments.map((item, index) => {
//           const totalHours = Number(item.totalHours) || 0;
//           const avgHours = Number(item.avgHoursPerDay) || 0;

//           return (
//             <motion.div
//               key={item.department || index}
//               initial={{ opacity: 0, y: 15 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.07 }}
//             >
//               <Card className="rounded-2xl shadow-sm hover:shadow-md transition-all hover:scale-[1.02]">
//                 <CardContent className="p-6 space-y-4">

//                   <div className="flex items-center justify-between">
//                     <h3 className="text-lg font-semibold">
//                       {item.department || "Unknown"}
//                     </h3>

//                     <Badge variant="outline">
//                       Dept
//                     </Badge>
//                   </div>

//                   <div>
//                     <p className="text-sm text-muted-foreground">
//                       Total Working Hours
//                     </p>
//                     <p className="text-2xl font-bold">
//                       <CountUp
//                         end={totalHours}
//                         duration={1.4}
//                         separator=","
//                       />{" "}
//                       hrs
//                     </p>
//                   </div>

//                   <div>
//                     <p className="text-sm text-muted-foreground">
//                       Avg Hours Per Day
//                     </p>
//                     <p className="text-xl font-semibold">
//                       <CountUp
//                         end={avgHours}
//                         duration={1.4}
//                         decimals={1}
//                       />{" "}
//                       hrs
//                     </p>
//                   </div>

//                 </CardContent>
//               </Card>
//             </motion.div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

//final
import { motion } from "framer-motion";
import { useMemo, memo } from "react";
import CountUp from "react-countup";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SkeletonCard from "@/components/reports/SkeletonCard";

/* =========================================================
   COMPONENT
========================================================= */

function DepartmentWorkingHours({
  data = [],
  loading = false,
  error = null,
}) {

  /* =========================================================
     LOADING STATE
  ========================================================= */

  if (loading) {
    return (
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  /* =========================================================
     ERROR STATE
  ========================================================= */

  if (error) {
    return (
      <div className="mt-10 text-red-500">
        Failed to load department working hours
      </div>
    );
  }

  /* =========================================================
     NORMALIZE DATA (MEMOIZED)
  ========================================================= */

  const departments = useMemo(() => {

    const normalized = Array.isArray(data)
      ? data
      : data?.data || [];

    return normalized.map((item) => ({
      department: item.department || "Unknown",
      totalHours: Number(item.totalHours) || 0,
      avgHoursPerDay: Number(item.avgHoursPerDay) || 0,
    }));

  }, [data]);

  if (!departments.length) return null;

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="mt-10">

      <h2 className="text-xl font-semibold mb-6">
        Department Working Hours
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

        {departments.map((item, index) => (

          <motion.div
            key={item.department + index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: index * 0.05 }}
          >

            <Card className="rounded-2xl shadow-sm hover:shadow-md transition-all hover:scale-[1.02]">

              <CardContent className="p-6 space-y-4">

                {/* Header */}

                <div className="flex items-center justify-between">

                  <h3 className="text-lg font-semibold">
                    {item.department}
                  </h3>

                  <Badge variant="outline">
                    Dept
                  </Badge>

                </div>

                {/* Total Hours */}

                <div>

                  <p className="text-sm text-muted-foreground">
                    Total Working Hours
                  </p>

                  <p className="text-2xl font-bold">

                    <CountUp
                      end={item.totalHours}
                      duration={1}
                      separator=","
                    />{" "}
                    hrs

                  </p>

                </div>

                {/* Avg Hours */}

                <div>

                  <p className="text-sm text-muted-foreground">
                    Avg Hours Per Day
                  </p>

                  <p className="text-xl font-semibold">

                    <CountUp
                      end={item.avgHoursPerDay}
                      duration={1}
                      decimals={1}
                    />{" "}
                    hrs

                  </p>

                </div>

              </CardContent>

            </Card>

          </motion.div>

        ))}

      </div>

    </div>
  );
}

/* =========================================================
   MEMO EXPORT (PERFORMANCE)
========================================================= */

export default memo(DepartmentWorkingHours);
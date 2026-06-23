// import SkeletonCard from "@/components/reports/SkeletonCard";
// import CountUp from "react-countup";
// import { motion } from "framer-motion";
// import { Card, CardContent } from "@/components/ui/card";

// export default function KPISection({ data, loading, error }) {
//   /* ===============================
//      LOADING STATE
//   =============================== */
//   if (loading) {
//     return (
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         {[...Array(8)].map((_, i) => (
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
//       <Card>
//         <CardContent className="p-6 text-red-500">
//           Failed to load report data
//         </CardContent>
//       </Card>
//     );
//   }

//   if (!data || typeof data !== "object") return null;

//   /* ===============================
//      SAFE DATA EXTRACTION
//   =============================== */

//   const headcount = Number(data.headcount) || 0;
//   const activeEmployees = Number(data.activeEmployees) || 0;
//   const attritionRate = Number(data.attritionRate) || 0;
//   const avgAttendance = Number(data.avgAttendance) || 0;
//   const totalPayroll = Number(data.totalPayroll) || 0;
//   const totalWorkingHours = Number(data.totalWorkingHours) || 0;
//   const avgWorkingHours = Number(data.avgWorkingHours) || 0;
//   const openPositions = Number(data.openPositions) || 0;

//   const cards = [
//     { label: "Headcount", value: headcount },
//     { label: "Active Employees", value: activeEmployees },
//     {
//       label: "Attrition Rate",
//       value: attritionRate,
//       suffix: "%",
//       decimals: 1,
//     },
//     {
//       label: "Avg Attendance",
//       value: avgAttendance,
//       suffix: "%",
//       decimals: 1,
//     },
//     {
//       label: "Total Payroll",
//       value: totalPayroll,
//       prefix: "₹",
//     },
//     {
//       label: "Total Working Hours",
//       value: totalWorkingHours,
//       suffix: " hrs",
//     },
//     {
//       label: "Avg Working Hours",
//       value: avgWorkingHours,
//       suffix: " hrs",
//       decimals: 1,
//     },
//     { label: "Open Positions", value: openPositions },
//   ];

//   /* ===============================
//      RENDER
//   =============================== */

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//       {cards.map((card, i) => (
//         <motion.div
//           key={i}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: i * 0.05 }}
//         >
//           <Card className="rounded-2xl shadow-sm hover:shadow-md transition-all hover:scale-[1.02]">
//             <CardContent className="p-5">
//               <p className="text-sm text-muted-foreground">
//                 {card.label}
//               </p>

//               <p className="text-2xl font-bold mt-2">
//                 <CountUp
//                   end={card.value}
//                   duration={1.4}
//                   prefix={card.prefix || ""}
//                   suffix={card.suffix || ""}
//                   decimals={card.decimals || 0}
//                   separator=","
//                 />
//               </p>
//             </CardContent>
//           </Card>
//         </motion.div>
//       ))}
//     </div>
//   );
// }

// import SkeletonCard from "@/components/reports/SkeletonCard";
// import CountUp from "react-countup";
// import { motion } from "framer-motion";

// import {
//   Users,
//   UserCheck,
//   TrendingDown,
//   CalendarCheck,
//   IndianRupee,
//   Clock,
//   Timer,
//   Briefcase,
// } from "lucide-react";

// import { Card, CardContent } from "@/components/ui/card";

// export default function KPISection({ data, loading, error }) {

//   /* =============================
//      LOADING
//   ============================== */

//   if (loading) {
//     return (
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         {[...Array(8)].map((_, i) => (
//           <SkeletonCard key={i} />
//         ))}
//       </div>
//     );
//   }

//   /* =============================
//      ERROR
//   ============================== */

//   if (error) {
//     return (
//       <Card>
//         <CardContent className="p-6 text-red-500">
//           Failed to load report data
//         </CardContent>
//       </Card>
//     );
//   }

//   if (!data) return null;

//   /* =============================
//      SAFE VALUES
//   ============================== */

//   const {
//     headcount = 0,
//     activeEmployees = 0,
//     attritionRate = 0,
//     avgAttendance = 0,
//     totalPayroll = 0,
//     totalWorkingHours = 0,
//     avgWorkingHours = 0,
//     openPositions = 0,
//   } = data;

//   /* =============================
//      KPI CONFIG
//   ============================== */

//   const cards = [
//     {
//       id: "headcount",
//       label: "Headcount",
//       value: headcount,
//       icon: Users,
//       color: "text-indigo-500",
//     },
//     {
//       id: "active",
//       label: "Active Employees",
//       value: activeEmployees,
//       icon: UserCheck,
//       color: "text-emerald-500",
//     },
//     {
//       id: "attrition",
//       label: "Attrition Rate",
//       value: attritionRate,
//       suffix: "%",
//       decimals: 1,
//       icon: TrendingDown,
//       color: attritionRate > 8 ? "text-red-500" : "text-amber-500",
//     },
//     {
//       id: "attendance",
//       label: "Avg Attendance",
//       value: avgAttendance,
//       suffix: "%",
//       decimals: 1,
//       icon: CalendarCheck,
//       color: "text-blue-500",
//     },
//     {
//       id: "payroll",
//       label: "Total Payroll",
//       value: totalPayroll,
//       prefix: "₹",
//       icon: IndianRupee,
//       color: "text-emerald-600",
//     },
//     {
//       id: "hours",
//       label: "Total Working Hours",
//       value: totalWorkingHours,
//       suffix: " hrs",
//       icon: Clock,
//       color: "text-indigo-400",
//     },
//     {
//       id: "avgHours",
//       label: "Avg Working Hours",
//       value: avgWorkingHours,
//       suffix: " hrs",
//       decimals: 1,
//       icon: Timer,
//       color: "text-purple-500",
//     },
//     {
//       id: "open",
//       label: "Open Positions",
//       value: openPositions,
//       icon: Briefcase,
//       color: "text-orange-500",
//     },
//   ];

//   /* =============================
//      RENDER
//   ============================== */

//   return (

//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

//       {cards.map((card, index) => {

//         const Icon = card.icon;

//         return (

//           <motion.div
//             key={card.id}
//             initial={{ opacity: 0, y: 15 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.05 }}
//           >

//             <Card className="rounded-2xl shadow-sm hover:shadow-md transition hover:scale-[1.02]">

//               <CardContent className="p-5 flex items-center justify-between">

//                 <div>

//                   <p className="text-sm text-muted-foreground">
//                     {card.label}
//                   </p>

//                   <p className="text-2xl font-bold mt-1">

//                     <CountUp
//                       end={card.value}
//                       duration={1.2}
//                       prefix={card.prefix || ""}
//                       suffix={card.suffix || ""}
//                       decimals={card.decimals || 0}
//                       separator=","
//                     />

//                   </p>

//                 </div>

//                 <Icon
//                   size={28}
//                   className={`${card.color} opacity-80`}
//                 />

//               </CardContent>

//             </Card>

//           </motion.div>

//         );

//       })}

//     </div>

//   );
// }

//final

import { memo, useMemo } from "react";
import SkeletonCard from "@/components/reports/SkeletonCard";
import CountUp from "react-countup";
import { motion } from "framer-motion";

import {
  Users,
  UserCheck,
  TrendingDown,
  CalendarCheck,
  IndianRupee,
  Clock,
  Timer,
  Briefcase,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

/* =========================================================
   KPI SECTION
========================================================= */

function KPISection({ data, loading = false, error = null }) {

  /* =============================
     LOADING
  ============================== */

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  /* =============================
     ERROR
  ============================== */

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-red-500">
          Failed to load report data
        </CardContent>
      </Card>
    );
  }

  if (!data) return null;

  /* =============================
     SAFE VALUES
  ============================== */

  const {
    headcount = 0,
    activeEmployees = 0,
    attritionRate = 0,
    avgAttendance = 0,
    totalPayroll = 0,
    totalWorkingHours = 0,
    avgWorkingHours = 0,
    openPositions = 0,
  } = data;

  /* =============================
     KPI CONFIG (MEMOIZED)
  ============================== */

  const cards = useMemo(
    () => [
      {
        id: "headcount",
        label: "Headcount",
        value: headcount,
        icon: Users,
        color: "text-indigo-500",
      },
      {
        id: "active",
        label: "Active Employees",
        value: activeEmployees,
        icon: UserCheck,
        color: "text-emerald-500",
      },
      {
        id: "attrition",
        label: "Attrition Rate",
        value: attritionRate,
        suffix: "%",
        decimals: 1,
        icon: TrendingDown,
        color: attritionRate > 8 ? "text-red-500" : "text-amber-500",
      },
      {
        id: "attendance",
        label: "Avg Attendance",
        value: avgAttendance,
        suffix: "%",
        decimals: 1,
        icon: CalendarCheck,
        color: "text-blue-500",
      },
      {
        id: "payroll",
        label: "Total Payroll",
        value: totalPayroll,
        prefix: "₹",
        icon: IndianRupee,
        color: "text-emerald-600",
      },
      {
        id: "hours",
        label: "Total Working Hours",
        value: totalWorkingHours,
        suffix: " hrs",
        icon: Clock,
        color: "text-indigo-400",
      },
      {
        id: "avgHours",
        label: "Avg Working Hours",
        value: avgWorkingHours,
        suffix: " hrs",
        decimals: 1,
        icon: Timer,
        color: "text-purple-500",
      },
      {
        id: "open",
        label: "Open Positions",
        value: openPositions,
        icon: Briefcase,
        color: "text-orange-500",
      },
    ],
    [
      headcount,
      activeEmployees,
      attritionRate,
      avgAttendance,
      totalPayroll,
      totalWorkingHours,
      avgWorkingHours,
      openPositions,
    ]
  );

  /* =============================
     RENDER
  ============================== */

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

      {cards.map((card, index) => {

        const Icon = card.icon;

        return (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
          >

            <Card className="rounded-2xl shadow-sm hover:shadow-md transition">

              <CardContent className="p-5 flex items-center justify-between">

                <div>

                  <p className="text-sm text-muted-foreground">
                    {card.label}
                  </p>

                  <p className="text-2xl font-bold mt-1">

                    <CountUp
                      end={card.value}
                      duration={1}
                      prefix={card.prefix || ""}
                      suffix={card.suffix || ""}
                      decimals={card.decimals || 0}
                      separator=","
                    />

                  </p>

                </div>

                <Icon
                  size={28}
                  className={`${card.color} opacity-80`}
                />

              </CardContent>

            </Card>

          </motion.div>
        );

      })}

    </div>
  );
}

/* =========================================================
   MEMOIZED EXPORT
========================================================= */

export default memo(KPISection);
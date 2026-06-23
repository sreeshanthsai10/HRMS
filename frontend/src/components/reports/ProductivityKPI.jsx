// import { motion } from "framer-motion";
// import CountUp from "react-countup";
// import { Card, CardContent } from "@/components/ui/card";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Activity, Coffee, Zap, Target } from "lucide-react";

// export default function ProductivityKPI({
//   data,
//   loading,
//   error,
// }) {
//   if (loading) {
//     return (
//       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
//         {[...Array(4)].map((_, i) => (
//           <Card key={i} className="rounded-2xl">
//             <CardContent className="p-5 space-y-3">
//               <Skeleton className="h-4 w-24" />
//               <Skeleton className="h-6 w-32" />
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <Card>
//         <CardContent className="p-6 text-red-500">
//           Failed to load productivity data
//         </CardContent>
//       </Card>
//     );
//   }

//   if (!data) return null;

//   const cards = [
//     {
//       label: "Total Active Hours",
//       value: data.totalActiveHours ?? 0,
//       suffix: " hrs",
//       icon: Activity,
//       color: "text-indigo-600",
//     },
//     {
//       label: "Idle Hours",
//       value: data.idleHours ?? 0,
//       suffix: " hrs",
//       icon: Coffee,
//       color: "text-amber-600",
//     },
//     {
//       label: "Focus Score",
//       value: data.focusScore ?? 0,
//       suffix: "%",
//       icon: Target,
//       color: "text-emerald-600",
//     },
//     {
//       label: "Distraction Index",
//       value: data.distractionIndex ?? 0,
//       suffix: "%",
//       icon: Zap,
//       color: "text-rose-600",
//     },
//   ];

//   return (
//     <div className="space-y-6">
//       <h2 className="text-xl font-semibold">
//         Productivity Overview
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
//         {cards.map((card, index) => {
//           const Icon = card.icon;

//           return (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.08 }}
//             >
//               <Card className="rounded-2xl shadow-sm hover:shadow-md transition">
//                 <CardContent className="p-5 space-y-3">
                  
//                   <div className="flex items-center justify-between">
//                     <p className="text-sm text-muted-foreground">
//                       {card.label}
//                     </p>
//                     <Icon
//                       className={`${card.color}`}
//                       size={20}
//                     />
//                   </div>

//                   <p className="text-2xl font-bold">
//                     <CountUp
//                       end={card.value}
//                       duration={1.5}
//                       suffix={card.suffix}
//                       separator=","
//                     />
//                   </p>

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
import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";

import { Card, CardContent } from "@/components/ui/card";
import SkeletonCard from "@/components/reports/SkeletonCard";

import {
  Activity,
  Coffee,
  Zap,
  Target,
} from "lucide-react";

/*
=========================================================
PRODUCTIVITY KPI CARDS
=========================================================
*/

function ProductivityKPI({
  data,
  loading,
  error,
}) {

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <SkeletonCard key={i} variant="kpi" />
        ))}
      </div>
    );
  }

  /* =====================================================
     ERROR
  ===================================================== */

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-red-500">
          Failed to load productivity data
        </CardContent>
      </Card>
    );
  }

  if (!data) return null;

  /* =====================================================
     SAFE NUMERIC VALUES
  ===================================================== */

  const safe = (v) => Number(v) || 0;

  /* =====================================================
     CARD CONFIG
  ===================================================== */

  const cards = useMemo(() => [

    {
      id: "active",
      label: "Total Active Hours",
      value: safe(data.totalActiveHours),
      suffix: " hrs",
      icon: Activity,
      color: "text-indigo-600",
    },

    {
      id: "idle",
      label: "Idle Hours",
      value: safe(data.idleHours),
      suffix: " hrs",
      icon: Coffee,
      color: "text-amber-600",
    },

    {
      id: "focus",
      label: "Focus Score",
      value: safe(data.focusScore),
      suffix: "%",
      icon: Target,
      color: "text-emerald-600",
    },

    {
      id: "distraction",
      label: "Distraction Index",
      value: safe(data.distractionIndex),
      suffix: "%",
      icon: Zap,
      color: "text-rose-600",
    }

  ], [data]);

  /* =====================================================
     RENDER
  ===================================================== */

  return (

    <div className="space-y-6">

      <h2 className="text-xl font-semibold">
        Productivity Overview
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        {cards.map((card, index) => {

          const Icon = card.icon;

          return (

            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.07 }}
            >

              <Card className="rounded-2xl shadow-sm hover:shadow-md transition">

                <CardContent className="p-5 space-y-3">

                  <div className="flex items-center justify-between">

                    <p className="text-sm text-muted-foreground">
                      {card.label}
                    </p>

                    <Icon
                      className={card.color}
                      size={20}
                    />

                  </div>

                  <p className="text-2xl font-bold">

                    <CountUp
                      end={card.value}
                      duration={1.4}
                      suffix={card.suffix}
                      separator=","
                    />

                  </p>

                </CardContent>

              </Card>

            </motion.div>

          );

        })}

      </div>

    </div>

  );

}

/*
=========================================================
MEMOIZED COMPONENT
=========================================================
*/

export default memo(ProductivityKPI);
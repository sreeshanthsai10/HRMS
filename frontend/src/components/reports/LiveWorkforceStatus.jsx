// import { motion } from "framer-motion";
// import CountUp from "react-countup";
// import { Card, CardContent } from "@/components/ui/card";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Users, Activity, Coffee, UserX } from "lucide-react";

// export default function LiveWorkforceStatus({
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
//               <Skeleton className="h-6 w-20" />
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
//           Failed to load live workforce status
//         </CardContent>
//       </Card>
//     );
//   }

//   if (!data) return null;

//   const cards = [
//     {
//       label: "Active Now",
//       value: data.active ?? 0,
//       icon: Activity,
//       color: "text-emerald-600",
//     },
//     {
//       label: "Idle",
//       value: data.idle ?? 0,
//       icon: Coffee,
//       color: "text-amber-600",
//     },
//     {
//       label: "Away",
//       value: data.away ?? 0,
//       icon: UserX,
//       color: "text-rose-600",
//     },
//     {
//       label: "Total Online",
//       value: data.totalOnline ?? 0,
//       icon: Users,
//       color: "text-indigo-600",
//     },
//   ];

//   return (
//     <div className="space-y-6">
//       <h2 className="text-xl font-semibold">
//         Live Workforce Status
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
//                       duration={1.2}
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
  Users,
  Activity,
  Coffee,
  UserX,
} from "lucide-react";

/*
=========================================================
LIVE WORKFORCE STATUS
Real-time workforce activity metrics
=========================================================
*/

function LiveWorkforceStatus({
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
          Failed to load live workforce status
        </CardContent>
      </Card>
    );
  }

  if (!data) return null;

  /* =====================================================
     SAFE VALUE PARSER
  ===================================================== */

  const safe = (v) => Number(v) || 0;

  /* =====================================================
     CARD CONFIG
  ===================================================== */

  const cards = useMemo(() => [

    {
      id: "active",
      label: "Active Now",
      value: safe(data.active),
      icon: Activity,
      color: "text-emerald-600",
    },

    {
      id: "idle",
      label: "Idle",
      value: safe(data.idle),
      icon: Coffee,
      color: "text-amber-600",
    },

    {
      id: "away",
      label: "Away",
      value: safe(data.away),
      icon: UserX,
      color: "text-rose-600",
    },

    {
      id: "online",
      label: "Total Online",
      value: safe(data.totalOnline),
      icon: Users,
      color: "text-indigo-600",
    }

  ], [data]);

  /* =====================================================
     RENDER
  ===================================================== */

  return (

    <div className="space-y-6">

      <h2 className="text-xl font-semibold">
        Live Workforce Status
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
                      duration={1.2}
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

export default memo(LiveWorkforceStatus);
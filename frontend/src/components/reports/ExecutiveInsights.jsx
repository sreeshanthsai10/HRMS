// import { motion } from "framer-motion";
// import {
//   TrendingUp,
//   AlertTriangle,
//   IndianRupee,
//   Users,
// } from "lucide-react";

// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Progress } from "@/components/ui/progress";

// export default function ExecutiveInsights({
//   data,
//   loading,
//   error,
// }) {
//   /* ===============================
//      LOADING STATE
//   =============================== */
//   if (loading) {
//     return (
//       <Card className="rounded-2xl">
//         <CardContent className="p-6 space-y-4">
//           <Skeleton className="h-6 w-48" />
//           <Skeleton className="h-4 w-72" />
//           <Skeleton className="h-24 w-full" />
//         </CardContent>
//       </Card>
//     );
//   }

//   if (error) {
//     return (
//       <Card>
//         <CardContent className="p-6 text-red-500">
//           Failed to generate executive insights
//         </CardContent>
//       </Card>
//     );
//   }

//   if (!data || typeof data !== "object") return null;

//   /* ===============================
//      SAFE EXTRACTION
//   =============================== */

//   const headcount = Number(data.headcount) || 0;
//   const activeEmployees = Number(data.activeEmployees) || 0;
//   const attritionRate = Number(data.attritionRate) || 0;
//   const totalPayroll = Number(data.totalPayroll) || 0;
//   const openPositions = Number(data.openPositions) || 0;
//   const avgAttendance = Number(data.avgAttendance) || 0;

//   /* ===============================
//      SMART ANALYSIS LOGIC
//   =============================== */

//   const activeRatio =
//     headcount > 0
//       ? (activeEmployees / headcount) * 100
//       : 0;

//   // Attrition Risk
//   const attritionRisk =
//     attritionRate > 8
//       ? { level: "High Risk", variant: "destructive" }
//       : attritionRate > 5
//       ? { level: "Moderate Risk", variant: "secondary" }
//       : { level: "Low Risk", variant: "default" };

//   // Workforce Growth Insight
//   const growthMessage =
//     avgAttendance > 90
//       ? "High engagement and strong workforce stability."
//       : avgAttendance > 75
//       ? "Stable workforce with moderate engagement."
//       : "Engagement levels require monitoring.";

//   // Hiring Pressure
//   const hiringPressure =
//     openPositions > headcount * 0.15
//       ? "High hiring pressure across departments."
//       : "Hiring demand within expected range.";

//   // Payroll Health
//   const payrollSignal =
//     totalPayroll > 0
//       ? `Total payroll allocation at ₹${totalPayroll.toLocaleString()}.`
//       : "Payroll data currently unavailable.";

//   // Dynamic AI confidence (simple logic example)
//   const confidenceScore =
//     Math.min(
//       98,
//       Math.round(
//         80 +
//           (avgAttendance / 100) * 10 +
//           (100 - attritionRate) * 0.1
//       )
//     );

//   /* ===============================
//      INSIGHTS ARRAY
//   =============================== */

//   const insights = [
//     {
//       icon: TrendingUp,
//       title: "Workforce Health",
//       description: growthMessage,
//       color: "text-indigo-500",
//     },
//     {
//       icon: AlertTriangle,
//       title: "Attrition Analysis",
//       description: `Attrition rate at ${attritionRate.toFixed(
//         1
//       )}%.`,
//       badge: attritionRisk.level,
//       variant: attritionRisk.variant,
//       color: "text-amber-500",
//     },
//     {
//       icon: IndianRupee,
//       title: "Payroll Overview",
//       description: payrollSignal,
//       color: "text-emerald-500",
//     },
//     {
//       icon: Users,
//       title: "Hiring Activity",
//       description: hiringPressure,
//       color: "text-blue-500",
//     },
//   ];

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//     >
//       <Card className="rounded-2xl shadow-sm">
//         <CardContent className="p-8">

//           {/* Header */}
//           <div className="flex items-center justify-between mb-8">
//             <div>
//               <h2 className="text-2xl font-semibold">
//                 Executive AI Insights
//               </h2>
//               <p className="text-sm text-muted-foreground mt-1">
//                 AI-generated executive summary based on selected filters
//               </p>
//             </div>

//             <div className="text-right w-44">
//               <p className="text-xs text-muted-foreground">
//                 AI Confidence
//               </p>
//               <div className="flex items-center gap-2 mt-1">
//                 <Progress value={confidenceScore} className="h-2" />
//                 <span className="text-sm font-semibold text-indigo-600">
//                   {confidenceScore}%
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Insight Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
//             {insights.map((item, index) => {
//               const Icon = item.icon;

//               return (
//                 <motion.div
//                   key={index}
//                   whileHover={{ scale: 1.03 }}
//                   transition={{ duration: 0.2 }}
//                 >
//                   <Card className="rounded-xl hover:shadow-md transition">
//                     <CardContent className="p-6 space-y-3">

//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-3">
//                           <Icon className={item.color} size={22} />
//                           <h3 className="font-semibold">
//                             {item.title}
//                           </h3>
//                         </div>

//                         {item.badge && (
//                           <Badge variant={item.variant}>
//                             {item.badge}
//                           </Badge>
//                         )}
//                       </div>

//                       <p className="text-sm text-muted-foreground">
//                         {item.description}
//                       </p>

//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               );
//             })}
//           </div>

//         </CardContent>
//       </Card>
//     </motion.div>
//   );
// }


// import { motion } from "framer-motion";
// import { useMemo } from "react";
// import {
//   TrendingUp,
//   AlertTriangle,
//   IndianRupee,
//   Users,
// } from "lucide-react";

// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Progress } from "@/components/ui/progress";

// export default function ExecutiveInsights({
//   data,
//   loading,
//   error,
// }) {

//   /* =============================
//      LOADING
//   ============================== */

//   if (loading) {
//     return (
//       <Card className="rounded-2xl">
//         <CardContent className="p-6 space-y-4">
//           <Skeleton className="h-6 w-48" />
//           <Skeleton className="h-4 w-72" />
//           <Skeleton className="h-24 w-full" />
//         </CardContent>
//       </Card>
//     );
//   }

//   if (error) {
//     return (
//       <Card>
//         <CardContent className="p-6 text-red-500">
//           Failed to generate executive insights
//         </CardContent>
//       </Card>
//     );
//   }

//   if (!data) return null;

//   /* =============================
//      SAFE DATA
//   ============================== */

//   const {
//     headcount = 0,
//     activeEmployees = 0,
//     attritionRate = 0,
//     totalPayroll = 0,
//     openPositions = 0,
//     avgAttendance = 0,
//   } = data;

//   /* =============================
//      ANALYTICS (MEMOIZED)
//   ============================== */

//   const insights = useMemo(() => {

//     const attritionRisk =
//       attritionRate > 8
//         ? { level: "High Risk", variant: "destructive" }
//         : attritionRate > 5
//         ? { level: "Moderate Risk", variant: "secondary" }
//         : { level: "Low Risk", variant: "default" };

//     const workforceHealth =
//       avgAttendance > 90
//         ? "High engagement and strong workforce stability."
//         : avgAttendance > 75
//         ? "Stable workforce with moderate engagement."
//         : "Engagement levels require monitoring.";

//     const hiringPressure =
//       openPositions > headcount * 0.15
//         ? "High hiring pressure across departments."
//         : "Hiring demand within expected range.";

//     const payrollInsight =
//       totalPayroll > 0
//         ? `Payroll allocation ₹${totalPayroll.toLocaleString()}`
//         : "Payroll data unavailable.";

//     return [
//       {
//         id: "health",
//         icon: TrendingUp,
//         title: "Workforce Health",
//         description: workforceHealth,
//         color: "text-indigo-500",
//       },
//       {
//         id: "attrition",
//         icon: AlertTriangle,
//         title: "Attrition Analysis",
//         description: `Attrition rate ${attritionRate.toFixed(1)}%`,
//         badge: attritionRisk.level,
//         variant: attritionRisk.variant,
//         color: "text-amber-500",
//       },
//       {
//         id: "payroll",
//         icon: IndianRupee,
//         title: "Payroll Overview",
//         description: payrollInsight,
//         color: "text-emerald-500",
//       },
//       {
//         id: "hiring",
//         icon: Users,
//         title: "Hiring Activity",
//         description: hiringPressure,
//         color: "text-blue-500",
//       },
//     ];

//   }, [
//     headcount,
//     attritionRate,
//     avgAttendance,
//     openPositions,
//     totalPayroll,
//   ]);

//   /* =============================
//      AI CONFIDENCE SCORE
//   ============================== */

//   const confidenceScore = useMemo(() => {

//     return Math.min(
//       98,
//       Math.round(
//         80 +
//           (avgAttendance / 100) * 10 +
//           (100 - attritionRate) * 0.1
//       )
//     );

//   }, [avgAttendance, attritionRate]);

//   /* =============================
//      RENDER
//   ============================== */

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: -15 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4 }}
//     >

//       <Card className="rounded-2xl shadow-sm">

//         <CardContent className="p-8">

//           {/* HEADER */}

//           <div className="flex items-center justify-between mb-8">

//             <div>
//               <h2 className="text-2xl font-semibold">
//                 Executive AI Insights
//               </h2>

//               <p className="text-sm text-muted-foreground mt-1">
//                 AI-generated workforce analysis
//               </p>
//             </div>

//             <div className="text-right w-48">

//               <p className="text-xs text-muted-foreground">
//                 AI Confidence
//               </p>

//               <div className="flex items-center gap-2 mt-1">

//                 <Progress
//                   value={confidenceScore}
//                   className="h-2"
//                 />

//                 <span className="text-sm font-semibold text-indigo-600">
//                   {confidenceScore}%
//                 </span>

//               </div>

//             </div>

//           </div>

//           {/* INSIGHT CARDS */}

//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

//             {insights.map((item) => {

//               const Icon = item.icon;

//               return (

//                 <motion.div
//                   key={item.id}
//                   whileHover={{ scale: 1.04 }}
//                   transition={{ duration: 0.2 }}
//                 >

//                   <Card className="rounded-xl hover:shadow-md transition">

//                     <CardContent className="p-6 space-y-3">

//                       <div className="flex items-center justify-between">

//                         <div className="flex items-center gap-3">

//                           <Icon
//                             className={item.color}
//                             size={22}
//                           />

//                           <h3 className="font-semibold">
//                             {item.title}
//                           </h3>

//                         </div>

//                         {item.badge && (
//                           <Badge variant={item.variant}>
//                             {item.badge}
//                           </Badge>
//                         )}

//                       </div>

//                       <p className="text-sm text-muted-foreground">
//                         {item.description}
//                       </p>

//                     </CardContent>

//                   </Card>

//                 </motion.div>

//               );

//             })}

//           </div>

//         </CardContent>

//       </Card>

//     </motion.div>
//   );
// }

//final

import { motion } from "framer-motion";
import { useMemo } from "react";
import {
  TrendingUp,
  AlertTriangle,
  IndianRupee,
  Users,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";

export default function ExecutiveInsights({
  data,
  loading,
  error,
}) {

  /* =============================
     LOADING
  ============================== */

  if (loading) {
    return (
      <Card className="rounded-2xl">
        <CardContent className="p-6 space-y-4">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-72" />
          <Skeleton className="h-24 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-red-500">
          Failed to generate executive insights
        </CardContent>
      </Card>
    );
  }

  if (!data) return null;

  /* =============================
     SAFE DATA
  ============================== */

  const {
    headcount = 0,
    activeEmployees = 0,
    attritionRate = 0,
    totalPayroll = 0,
    openPositions = 0,
    avgAttendance = 0,
  } = data;

  /* =============================
     ANALYTICS (MEMOIZED)
  ============================== */

  const insights = useMemo(() => {

    const attritionRisk =
      attritionRate > 8
        ? { level: "High Risk", variant: "destructive" }
        : attritionRate > 5
        ? { level: "Moderate Risk", variant: "secondary" }
        : { level: "Low Risk", variant: "default" };

    const workforceHealth =
      avgAttendance > 90
        ? "High engagement and strong workforce stability."
        : avgAttendance > 75
        ? "Stable workforce with moderate engagement."
        : "Engagement levels require monitoring.";

    const hiringPressure =
      openPositions > headcount * 0.15
        ? "High hiring pressure across departments."
        : "Hiring demand within expected range.";

    const payrollInsight =
      totalPayroll > 0
        ? `Payroll allocation ₹${totalPayroll.toLocaleString()}`
        : "Payroll data unavailable.";

    return [
      {
        id: "health",
        icon: TrendingUp,
        title: "Workforce Health",
        description: workforceHealth,
        color: "text-indigo-500",
      },
      {
        id: "attrition",
        icon: AlertTriangle,
        title: "Attrition Analysis",
        description: `Attrition rate ${attritionRate.toFixed(1)}%`,
        badge: attritionRisk.level,
        variant: attritionRisk.variant,
        color: "text-amber-500",
      },
      {
        id: "payroll",
        icon: IndianRupee,
        title: "Payroll Overview",
        description: payrollInsight,
        color: "text-emerald-500",
      },
      {
        id: "hiring",
        icon: Users,
        title: "Hiring Activity",
        description: hiringPressure,
        color: "text-blue-500",
      },
    ];

  }, [
    headcount,
    attritionRate,
    avgAttendance,
    openPositions,
    totalPayroll,
  ]);

  /* =============================
     AI CONFIDENCE SCORE
  ============================== */

  const confidenceScore = useMemo(() => {

    return Math.min(
      98,
      Math.round(
        80 +
          (avgAttendance / 100) * 10 +
          (100 - attritionRate) * 0.1
      )
    );

  }, [avgAttendance, attritionRate]);

  /* =============================
     RENDER
  ============================== */

  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >

      <Card className="rounded-2xl shadow-sm">

        <CardContent className="p-8">

          {/* HEADER */}

          <div className="flex items-center justify-between mb-8">

            <div>
              <h2 className="text-2xl font-semibold">
                Executive AI Insights
              </h2>

              <p className="text-sm text-muted-foreground mt-1">
                AI-generated workforce analysis
              </p>
            </div>

            <div className="text-right w-48">

              <p className="text-xs text-muted-foreground">
                AI Confidence
              </p>

              <div className="flex items-center gap-2 mt-1">

                <Progress
                  value={confidenceScore}
                  className="h-2"
                />

                <span className="text-sm font-semibold text-indigo-600">
                  {confidenceScore}%
                </span>

              </div>

            </div>

          </div>

          {/* INSIGHT CARDS */}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            {insights.map((item) => {

              const Icon = item.icon;

              return (

                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.2 }}
                >

                  <Card className="rounded-xl hover:shadow-md transition">

                    <CardContent className="p-6 space-y-3">

                      <div className="flex items-center justify-between">

                        <div className="flex items-center gap-3">

                          <Icon
                            className={item.color}
                            size={22}
                          />

                          <h3 className="font-semibold">
                            {item.title}
                          </h3>

                        </div>

                        {item.badge && (
                          <Badge variant={item.variant}>
                            {item.badge}
                          </Badge>
                        )}

                      </div>

                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>

                    </CardContent>

                  </Card>

                </motion.div>

              );

            })}

          </div>

        </CardContent>

      </Card>

    </motion.div>
  );
}
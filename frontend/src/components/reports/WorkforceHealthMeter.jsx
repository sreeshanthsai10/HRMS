// import { motion } from "framer-motion";

// export default function WorkforceHealthMeter({
//   data,
//   loading,
//   error,
// }) {
//   if (loading) {
//     return (
//       <div className="bg-white dark:bg-slate-900 border rounded-2xl p-8 text-center">
//         Loading Health Score...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-red-500">
//         Failed to calculate workforce health
//       </div>
//     );
//   }

//   if (!data || typeof data !== "object") {
//     return (
//       <div className="bg-white dark:bg-slate-900 border rounded-2xl p-8 text-center text-muted-foreground">
//         No health data available.
//       </div>
//     );
//   }

//   /* ===============================
//      SAFE METRIC EXTRACTION
//   =============================== */

//   const attendanceScore = Number(data.avgAttendance) || 0;
//   const attritionRate = Number(data.attritionRate) || 0;
//   const headcount = Number(data.headcount) || 0;
//   const activeEmployees = Number(data.activeEmployees) || 0;

//   const attritionScore = 100 - attritionRate;

//   const activeRatio =
//     headcount > 0
//       ? (activeEmployees / headcount) * 100
//       : 0;

//   /* ===============================
//      HEALTH FORMULA
//      40% Attendance
//      30% (100 - Attrition)
//      30% Active Ratio
//   =============================== */

//   let calculatedScore =
//     attendanceScore * 0.4 +
//     attritionScore * 0.3 +
//     activeRatio * 0.3;

//   // Clamp between 0 and 100
//   const healthScore = Math.max(
//     0,
//     Math.min(100, Math.round(calculatedScore))
//   );

//   /* ===============================
//      STATUS & COLOR
//   =============================== */

//   const status =
//     healthScore >= 85
//       ? "Healthy"
//       : healthScore >= 65
//       ? "Moderate"
//       : "Critical";

//   const color =
//     healthScore >= 85
//       ? "#10b981"
//       : healthScore >= 65
//       ? "#f59e0b"
//       : "#ef4444";

//   /* ===============================
//      SVG CALCULATION
//   =============================== */

//   const radius = 60;
//   const circumference = 2 * Math.PI * radius;

//   const offset =
//     circumference -
//     (healthScore / 100) * circumference;

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 40 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//       className="bg-white dark:bg-slate-900 border rounded-2xl p-8 text-center shadow-sm"
//     >
//       <h2 className="text-xl font-semibold mb-6">
//         Workforce Health Score
//       </h2>

//       <div className="relative flex items-center justify-center">
//         <svg width="160" height="160">
//           {/* Background */}
//           <circle
//             cx="80"
//             cy="80"
//             r={radius}
//             stroke="#e5e7eb"
//             strokeWidth="12"
//             fill="none"
//             className="dark:stroke-slate-700"
//           />

//           {/* Progress */}
//           <motion.circle
//             cx="80"
//             cy="80"
//             r={radius}
//             stroke={color}
//             strokeWidth="12"
//             fill="none"
//             strokeLinecap="round"
//             strokeDasharray={circumference}
//             strokeDashoffset={offset}
//             initial={{ strokeDashoffset: circumference }}
//             animate={{ strokeDashoffset: offset }}
//             transition={{ duration: 1 }}
//             transform="rotate(-90 80 80)"
//           />
//         </svg>

//         {/* Center Text */}
//         <div className="absolute flex flex-col items-center">
//           <span
//             className="text-3xl font-bold"
//             style={{ color }}
//           >
//             {healthScore}
//           </span>
//           <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
//             {status}
//           </span>
//         </div>
//       </div>

//       <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">
//         AI-generated overall workforce health assessment
//       </p>
//     </motion.div>
//   );
// }

//final

import { motion } from "framer-motion";
import { useMemo, memo } from "react";

export default memo(function WorkforceHealthMeter({
  data = {},
  loading = false,
  error = null,
}) {

  /* =========================================================
     STATES
  ========================================================= */

  if (loading) {
    return (
      <div className="bg-white dark:bg-slate-900 border rounded-2xl p-8 text-center">
        Loading Health Score...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500">
        Failed to calculate workforce health
      </div>
    );
  }

  if (!data || typeof data !== "object") {
    return (
      <div className="bg-white dark:bg-slate-900 border rounded-2xl p-8 text-center text-muted-foreground">
        No health data available.
      </div>
    );
  }

  /* =========================================================
     SAFE METRIC EXTRACTION
  ========================================================= */

  const {
    attendanceScore,
    attritionScore,
    activeRatio,
  } = useMemo(() => {

    const attendance = Number(data.avgAttendance) || 0;
    const attrition = Number(data.attritionRate) || 0;

    const headcount = Number(data.headcount) || 0;
    const activeEmployees = Number(data.activeEmployees) || 0;

    const attritionScore = 100 - attrition;

    const activeRatio =
      headcount > 0
        ? (activeEmployees / headcount) * 100
        : 0;

    return {
      attendanceScore: attendance,
      attritionScore,
      activeRatio,
    };

  }, [data]);

  /* =========================================================
     HEALTH SCORE
  ========================================================= */

  const healthScore = useMemo(() => {

    const score =
      attendanceScore * 0.4 +
      attritionScore * 0.3 +
      activeRatio * 0.3;

    return Math.max(0, Math.min(100, Math.round(score)));

  }, [attendanceScore, attritionScore, activeRatio]);

  /* =========================================================
     STATUS + COLOR
  ========================================================= */

  const { status, color } = useMemo(() => {

    if (healthScore >= 85)
      return { status: "Healthy", color: "#10b981" };

    if (healthScore >= 65)
      return { status: "Moderate", color: "#f59e0b" };

    return { status: "Critical", color: "#ef4444" };

  }, [healthScore]);

  /* =========================================================
     SVG CALCULATIONS
  ========================================================= */

  const { radius, circumference, offset } = useMemo(() => {

    const radius = 60;
    const circumference = 2 * Math.PI * radius;

    const offset =
      circumference -
      (healthScore / 100) * circumference;

    return { radius, circumference, offset };

  }, [healthScore]);

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-slate-900 border rounded-2xl p-8 text-center shadow-sm"
    >

      <h2 className="text-xl font-semibold mb-6">
        Workforce Health Score
      </h2>

      <div className="relative flex items-center justify-center">

        <svg width="160" height="160">

          {/* Background */}

          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="12"
            fill="none"
            className="dark:stroke-slate-700"
          />

          {/* Progress */}

          <motion.circle
            cx="80"
            cy="80"
            r={radius}
            stroke={color}
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1 }}
            transform="rotate(-90 80 80)"
          />

        </svg>

        {/* CENTER LABEL */}

        <div className="absolute flex flex-col items-center">

          <span
            className="text-3xl font-bold"
            style={{ color }}
          >
            {healthScore}
          </span>

          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {status}
          </span>

        </div>

      </div>

      <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">
        AI-generated workforce health assessment
      </p>

    </motion.div>
  );
});
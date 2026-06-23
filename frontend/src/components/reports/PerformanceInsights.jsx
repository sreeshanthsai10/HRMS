// import { Card, CardContent } from "@/components/ui/card";
// import { Skeleton } from "@/components/ui/skeleton";

// export default function PerformanceInsights({ data, loading }) {

//   if (loading) {
//     return (
//       <Card>
//         <CardContent className="p-6 space-y-4">
//           <Skeleton className="h-6 w-48" />
//           <Skeleton className="h-4 w-full" />
//           <Skeleton className="h-4 w-full" />
//         </CardContent>
//       </Card>
//     );
//   }

//   if (!data) return null;

//   const { topPerformers = [], atRiskEmployees = [] } = data;

//   return (
//     <div className="grid md:grid-cols-2 gap-6">

//       {/* ================= TOP PERFORMERS ================= */}
//       <Card className="rounded-2xl shadow-sm">
//         <CardContent className="p-6">
//           <h2 className="text-xl font-semibold mb-4 text-emerald-600">
//             Top Performers
//           </h2>

//           {topPerformers.length === 0 ? (
//             <p className="text-muted-foreground">
//               No top performers found.
//             </p>
//           ) : (
//             <div className="space-y-3">
//               {topPerformers.map((emp, index) => (
//                 <div
//                   key={index}
//                   className="flex justify-between items-center border-b pb-2"
//                 >
//                   <div>
//                     <p className="font-medium">{emp.name}</p>
//                     <p className="text-sm text-muted-foreground">
//                       {emp.department || "N/A"}
//                     </p>
//                   </div>
//                   <div className="font-semibold text-emerald-600">
//                     {emp.score}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </CardContent>
//       </Card>

//       {/* ================= AT RISK ================= */}
//       <Card className="rounded-2xl shadow-sm">
//         <CardContent className="p-6">
//           <h2 className="text-xl font-semibold mb-4 text-red-600">
//             At Risk Employees
//           </h2>

//           {atRiskEmployees.length === 0 ? (
//             <p className="text-muted-foreground">
//               No at-risk employees.
//             </p>
//           ) : (
//             <div className="space-y-3">
//               {atRiskEmployees.map((emp, index) => (
//                 <div
//                   key={index}
//                   className="flex justify-between items-center border-b pb-2"
//                 >
//                   <div>
//                     <p className="font-medium">{emp.name}</p>
//                     <p className="text-sm text-muted-foreground">
//                       {emp.department || "N/A"}
//                     </p>
//                   </div>
//                   <div className="font-semibold text-red-600">
//                     {emp.score}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </CardContent>
//       </Card>

//     </div>
//   );
// }

//final
import { memo, useMemo } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/* =========================================================
   COMPONENT
========================================================= */

function PerformanceInsights({ data = {}, loading = false }) {

  /* =========================================================
     LOADING STATE
  ========================================================= */

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6 space-y-4">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!data) return null;

  /* =========================================================
     SAFE DATA EXTRACTION
  ========================================================= */

  const { topPerformers = [], atRiskEmployees = [] } = data;

  /* =========================================================
     MEMOIZED LISTS
  ========================================================= */

  const topList = useMemo(() => {

    if (!Array.isArray(topPerformers)) return [];

    return topPerformers.map((emp, index) => ({
      id: emp.id || `${emp.name}-${index}`,
      name: emp.name || "Unknown",
      department: emp.department || "N/A",
      score: Number(emp.score) || 0,
    }));

  }, [topPerformers]);

  const riskList = useMemo(() => {

    if (!Array.isArray(atRiskEmployees)) return [];

    return atRiskEmployees.map((emp, index) => ({
      id: emp.id || `${emp.name}-${index}`,
      name: emp.name || "Unknown",
      department: emp.department || "N/A",
      score: Number(emp.score) || 0,
    }));

  }, [atRiskEmployees]);

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="grid md:grid-cols-2 gap-6">

      {/* ================= TOP PERFORMERS ================= */}

      <Card className="rounded-2xl shadow-sm">

        <CardContent className="p-6">

          <h2 className="text-xl font-semibold mb-4 text-emerald-600">
            Top Performers
          </h2>

          {!topList.length ? (

            <p className="text-muted-foreground">
              No top performers found.
            </p>

          ) : (

            <div className="space-y-3">

              {topList.map((emp) => (

                <div
                  key={emp.id}
                  className="flex justify-between items-center border-b pb-2"
                >

                  <div>

                    <p className="font-medium">
                      {emp.name}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {emp.department}
                    </p>

                  </div>

                  <div className="font-semibold text-emerald-600">
                    {emp.score}
                  </div>

                </div>

              ))}

            </div>

          )}

        </CardContent>

      </Card>

      {/* ================= AT RISK ================= */}

      <Card className="rounded-2xl shadow-sm">

        <CardContent className="p-6">

          <h2 className="text-xl font-semibold mb-4 text-red-600">
            At Risk Employees
          </h2>

          {!riskList.length ? (

            <p className="text-muted-foreground">
              No at-risk employees.
            </p>

          ) : (

            <div className="space-y-3">

              {riskList.map((emp) => (

                <div
                  key={emp.id}
                  className="flex justify-between items-center border-b pb-2"
                >

                  <div>

                    <p className="font-medium">
                      {emp.name}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {emp.department}
                    </p>

                  </div>

                  <div className="font-semibold text-red-600">
                    {emp.score}
                  </div>

                </div>

              ))}

            </div>

          )}

        </CardContent>

      </Card>

    </div>
  );
}

/* =========================================================
   MEMO EXPORT
========================================================= */

export default memo(PerformanceInsights);
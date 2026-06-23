// import { useEffect, useState } from "react";
// import api from "@/services/apiClient";
// import { Building2, Users, Banknote } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";

// export default function DepartmentBudgetOverview({ filters }) {
//   const [departments, setDepartments] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchDepartments = async () => {
//       try {
//         setLoading(true);

//         const res = await api.get("/reports/department-budgets", {
//           params: filters,
//         });

       
//         const formatted = res.data.map((dept) => ({
//           id: dept.id,
//           department: dept.name,
//           employeeCount: dept.employee_count || 0,
//           totalSalary: dept.total_salary || 0,
//           budget: dept.budget || 0,
//         }));

//         setDepartments(formatted);

//       } catch (error) {
//         console.error("Department Budget error:", error);
//         setDepartments([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDepartments();
//   }, [filters]);

//   if (loading) {
//     return <p className="text-muted-foreground">Loading department budgets...</p>;
//   }

//   if (!departments.length) {
//     return (
//       <p className="text-muted-foreground">
//         No department budget data available.
//       </p>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-semibold">
//         Department Budget Overview
//       </h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {departments.map((dept) => {
//           const utilization =
//             dept.budget > 0
//               ? (dept.totalSalary / dept.budget) * 100
//               : 0;

//           return (
//             <Card key={dept.id} className="rounded-2xl shadow-sm">
//               <CardContent className="p-6 space-y-4">

//                 <div className="flex items-center gap-3">
//                   <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
//                     <Building2 className="w-5 h-5" />
//                   </div>
//                   <h3 className="text-lg font-semibold">
//                     {dept.department}
//                   </h3>
//                 </div>

//                 <div className="flex justify-between text-sm">
//                   <span className="flex items-center gap-2 text-muted-foreground">
//                     <Users className="w-4 h-4" />
//                     Headcount
//                   </span>
//                   <span className="font-medium">
//                     {dept.employeeCount}
//                   </span>
//                 </div>

//                 <div className="flex justify-between text-sm">
//                   <span className="flex items-center gap-2 text-muted-foreground">
//                     <Banknote className="w-4 h-4" />
//                     Total Salary
//                   </span>
//                   <span className="font-medium">
//                     ₹{dept.totalSalary.toLocaleString()}
//                   </span>
//                 </div>

//                 <div className="flex justify-between text-sm">
//                   <span className="flex items-center gap-2 text-muted-foreground">
//                     <Banknote className="w-4 h-4" />
//                     Budget
//                   </span>
//                   <span className="font-medium">
//                     ₹{dept.budget.toLocaleString()}
//                   </span>
//                 </div>

//                 <div className="pt-3 border-t">
//                   <div className="flex justify-between text-xs mb-1">
//                     <span>Budget Utilization</span>
//                     <span className="font-medium">
//                       {Math.round(utilization)}%
//                     </span>
//                   </div>

//                   <div className="w-full bg-slate-200 rounded-full h-2">
//                     <div
//                       className={`h-2 rounded-full ${
//                         utilization > 90
//                           ? "bg-red-500"
//                           : "bg-indigo-500"
//                       }`}
//                       style={{
//                         width: `${Math.min(utilization, 100)}%`,
//                       }}
//                     />
//                   </div>
//                 </div>

//               </CardContent>
//             </Card>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

//final
import { useEffect, useState, useMemo, memo } from "react";
import api from "@/services/apiClient";

import { Building2, Users, Banknote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

/* =========================================================
   COMPONENT
========================================================= */

function DepartmentBudgetOverview({ filters = {} }) {

  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* =========================================================
     FETCH DATA
  ========================================================= */

  useEffect(() => {

    const controller = new AbortController();

    const fetchDepartments = async () => {

      try {

        setLoading(true);
        setError(null);

        const res = await api.get(
          "/reports/department-budgets",
          {
            params: filters,
            signal: controller.signal,
          }
        );

        const apiData =
          res?.data?.data ??
          res?.data ??
          [];

        const formatted = apiData.map((dept) => ({
          id: dept.id || dept._id || dept.department,
          department:
            dept.name ||
            dept.department ||
            "Unknown",
          employeeCount:
            Number(dept.employee_count) || 0,
          totalSalary:
            Number(dept.total_salary) || 0,
          budget:
            Number(dept.budget) || 0,
        }));

        setDepartments(formatted);

      } catch (err) {
          const isCanceled =
            err?.name === "CanceledError" ||
            err?.message === "canceled" ||
            err?.code === "ERR_CANCELED";

          if (isCanceled) return;

          console.error(
            "Department Budget error:",
            err?.response?.data || err
          );

          setError(
            err?.response?.data?.message ||
            "Failed to load department budgets"
          );

          setDepartments([]);
      } finally {

        setLoading(false);

      }

    };

    fetchDepartments();

    return () => controller.abort();

  }, [
    filters?.department,
    filters?.role,
    filters?.startDate,
    filters?.endDate,
  ]);

  /* =========================================================
     MEMOIZED STATS
  ========================================================= */

  const departmentStats = useMemo(() => {

    return departments.map((dept) => {

      const utilization =
        dept.budget > 0
          ? (dept.totalSalary / dept.budget) * 100
          : 0;

      return {
        ...dept,
        utilization,
      };

    });

  }, [departments]);

  /* =========================================================
     STATES
  ========================================================= */

  if (loading) {
    return (
      <p className="text-muted-foreground">
        Loading department budgets...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-red-500">
        {error}
      </p>
    );
  }

  if (!departmentStats.length) {
    return (
      <p className="text-muted-foreground">
        No department budget data available.
      </p>
    );
  }

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="space-y-6">

      <h2 className="text-2xl font-semibold">
        Department Budget Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {departmentStats.map((dept, index) => (

            <Card
              key={dept.id || `${dept.department}-${index}`}
              className="rounded-2xl shadow-sm"
            >

            <CardContent className="p-6 space-y-4">

              {/* Header */}

              <div className="flex items-center gap-3">

                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                  <Building2 className="w-5 h-5" />
                </div>

                <h3 className="text-lg font-semibold">
                  {dept.department}
                </h3>

              </div>

              {/* Headcount */}

              <div className="flex justify-between text-sm">

                <span className="flex items-center gap-2 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  Headcount
                </span>

                <span className="font-medium">
                  {dept.employeeCount}
                </span>

              </div>

              {/* Salary */}

              <div className="flex justify-between text-sm">

                <span className="flex items-center gap-2 text-muted-foreground">
                  <Banknote className="w-4 h-4" />
                  Total Salary
                </span>

                <span className="font-medium">
                  ₹{dept.totalSalary.toLocaleString()}
                </span>

              </div>

              {/* Budget */}

              <div className="flex justify-between text-sm">

                <span className="flex items-center gap-2 text-muted-foreground">
                  <Banknote className="w-4 h-4" />
                  Budget
                </span>

                <span className="font-medium">
                  ₹{dept.budget.toLocaleString()}
                </span>

              </div>

              {/* Utilization */}

              <div className="pt-3 border-t">

                <div className="flex justify-between text-xs mb-1">

                  <span>Budget Utilization</span>

                  <span className="font-medium">
                    {Math.round(dept.utilization)}%
                  </span>

                </div>

                <div className="w-full bg-slate-200 rounded-full h-2">

                  <div
                    className={`h-2 rounded-full ${
                      dept.utilization > 90
                        ? "bg-red-500"
                        : "bg-indigo-500"
                    }`}
                    style={{
                      width: `${Math.min(
                        dept.utilization,
                        100
                      )}%`,
                    }}
                  />

                </div>

              </div>

            </CardContent>

          </Card>

        ))}

      </div>

    </div>
  );
}

export default memo(DepartmentBudgetOverview);
// import FiltersSection from "@/components/reports/FiltersSection";
// import {
//   Table,
//   TableHeader,
//   TableRow,
//   TableHead,
//   TableBody,
//   TableCell,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Badge } from "@/components/ui/badge";

// export default function PerformanceSection({
//   hook,
//   filters,
//   setFilters,
// }) {
//   const {
//     data = [],
//     pagination,
//     loading,
//     error,
//   } = hook || {};

//   const currentPage = Number(filters?.page) || 1;
//   const totalPages = Number(pagination?.pages) || 1;

//   /* ===============================
//      GRADE COLOR LOGIC
//   =============================== */

//   const getGradeStyle = (grade) => {
//     switch (grade) {
//       case "A":
//         return "bg-emerald-100 text-emerald-600";
//       case "B":
//         return "bg-amber-100 text-amber-600";
//       case "C":
//         return "bg-orange-100 text-orange-600";
//       default:
//         return "bg-red-100 text-red-600";
//     }
//   };

//   return (
//     <div className="space-y-6">

//       {/* Header */}
//       <div>
//         <h2 className="text-2xl font-semibold">
//           Employee Performance
//         </h2>
//         <p className="text-sm text-muted-foreground mt-1">
//           Performance analytics based on selected filters
//         </p>
//       </div>

//       {/* Filters */}
//       <FiltersSection
//         filters={filters}
//         setFilters={setFilters}
//       />

//       {/* Table Card */}
//       <Card className="rounded-2xl shadow-sm">
//         <CardContent className="p-6 space-y-6">

//           <div className="overflow-x-auto">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Name</TableHead>
//                   <TableHead>Department</TableHead>
//                   <TableHead>Attendance %</TableHead>
//                   <TableHead>Leaves</TableHead>
//                   <TableHead>Late</TableHead>
//                   <TableHead>Compliance</TableHead>
//                   <TableHead>Score</TableHead>
//                   <TableHead>Grade</TableHead>
//                 </TableRow>
//               </TableHeader>

//               <TableBody>
//                 {/* LOADING */}
//                 {loading ? (
//                   [...Array(6)].map((_, i) => (
//                     <TableRow key={i}>
//                       {[...Array(8)].map((__, j) => (
//                         <TableCell key={j}>
//                           <Skeleton className="h-4 w-full" />
//                         </TableCell>
//                       ))}
//                     </TableRow>
//                   ))
//                 ) : error ? (
//                   <TableRow>
//                     <TableCell
//                       colSpan={8}
//                       className="text-center text-red-500"
//                     >
//                       Failed to load performance data
//                     </TableCell>
//                   </TableRow>
//                 ) : data.length === 0 ? (
//                   <TableRow>
//                     <TableCell
//                       colSpan={8}
//                       className="text-center text-muted-foreground"
//                     >
//                       No employee performance data found
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   data.map((emp, index) => {
//                     const attendance =
//                       Number(emp.attendance) || 0;
//                     const compliance =
//                       Number(emp.compliance) || 0;
//                     const score =
//                       Number(emp.performanceScore) || 0;
//                     const grade = emp.grade || "N/A";

//                     return (
//                       <TableRow
//                         key={emp._id || index}
//                         className="hover:bg-muted/50 transition"
//                       >
//                         <TableCell className="font-medium">
//                           {emp.firstName} {emp.lastName}
//                         </TableCell>

//                         <TableCell>
//                           {emp.department || "-"}
//                         </TableCell>

//                         <TableCell>
//                           {attendance.toFixed(1)}%
//                         </TableCell>

//                         <TableCell>
//                           {emp.leaves ?? 0}
//                         </TableCell>

//                         <TableCell>
//                           {emp.lateMarks ?? 0}
//                         </TableCell>

//                         <TableCell>
//                           {compliance.toFixed(1)}%
//                         </TableCell>

//                         <TableCell>
//                           <span className="font-semibold">
//                             {score}
//                           </span>
//                         </TableCell>

//                         <TableCell>
//                           <Badge
//                             className={getGradeStyle(
//                               grade
//                             )}
//                           >
//                             {grade}
//                           </Badge>
//                         </TableCell>
//                       </TableRow>
//                     );
//                   })
//                 )}
//               </TableBody>
//             </Table>
//           </div>

//           {/* Pagination */}
//           <div className="flex justify-end items-center gap-4">
//             <Button
//               variant="outline"
//               disabled={currentPage <= 1}
//               onClick={() =>
//                 setFilters((prev) => ({
//                   ...prev,
//                   page: currentPage - 1,
//                 }))
//               }
//             >
//               Previous
//             </Button>

//             <span className="text-sm text-muted-foreground">
//               Page {currentPage} of {totalPages}
//             </span>

//             <Button
//               variant="outline"
//               disabled={currentPage >= totalPages}
//               onClick={() =>
//                 setFilters((prev) => ({
//                   ...prev,
//                   page: currentPage + 1,
//                 }))
//               }
//             >
//               Next
//             </Button>
//           </div>

//         </CardContent>
//       </Card>
//     </div>
//   );
// }

//final
import { memo, useMemo } from "react";

import FiltersSection from "@/components/reports/FiltersSection";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

/* =========================================================
   COMPONENT
========================================================= */

function PerformanceSection({
  hook,
  filters = {},
  setFilters,
}) {

  const {
    data = [],
    pagination = {},
    loading = false,
    error = null,
  } = hook || {};

  const currentPage = Number(filters?.page) || 1;
  const totalPages = Number(pagination?.pages) || 1;

  /* =========================================================
     GRADE STYLE
  ========================================================= */

  const getGradeStyle = (grade) => {

    switch (grade) {

      case "A":
        return "bg-emerald-100 text-emerald-600";

      case "B":
        return "bg-amber-100 text-amber-600";

      case "C":
        return "bg-orange-100 text-orange-600";

      default:
        return "bg-red-100 text-red-600";

    }

  };

  /* =========================================================
     NORMALIZE EMPLOYEES (MEMOIZED)
  ========================================================= */

  const employees = useMemo(() => {

    if (!Array.isArray(data)) return [];

    return data.map((emp, index) => ({

      id: emp._id || emp.id || `${emp.firstName}-${index}`,

      name:
        `${emp.firstName || ""} ${emp.lastName || ""}`.trim() ||
        "Unknown",

      department: emp.department || "-",

      attendance: Number(emp.attendance) || 0,

      leaves: emp.leaves ?? 0,

      lateMarks: emp.lateMarks ?? 0,

      compliance: Number(emp.compliance) || 0,

      score: Number(emp.performanceScore) || 0,

      grade: emp.grade || "N/A",

    }));

  }, [data]);

  /* =========================================================
     PAGINATION HANDLERS
  ========================================================= */

  const handlePrev = () => {

    if (currentPage <= 1) return;

    setFilters((prev) => ({
      ...prev,
      page: currentPage - 1,
    }));

  };

  const handleNext = () => {

    if (currentPage >= totalPages) return;

    setFilters((prev) => ({
      ...prev,
      page: currentPage + 1,
    }));

  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (

    <div className="space-y-6">

      {/* HEADER */}

      <div>

        <h2 className="text-2xl font-semibold">
          Employee Performance
        </h2>

        <p className="text-sm text-muted-foreground mt-1">
          Performance analytics based on selected filters
        </p>

      </div>

      {/* FILTERS */}

      <FiltersSection
        filters={filters}
        setFilters={setFilters}
      />

      {/* TABLE */}

      <Card className="rounded-2xl shadow-sm">

        <CardContent className="p-6 space-y-6">

          <div className="overflow-x-auto">

            <Table>

              <TableHeader>

                <TableRow>

                  <TableHead>Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Attendance %</TableHead>
                  <TableHead>Leaves</TableHead>
                  <TableHead>Late</TableHead>
                  <TableHead>Compliance</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Grade</TableHead>

                </TableRow>

              </TableHeader>

              <TableBody>

                {/* LOADING */}

                {loading ? (

                  [...Array(6)].map((_, i) => (

                    <TableRow key={i}>

                      {[...Array(8)].map((__, j) => (

                        <TableCell key={j}>
                          <Skeleton className="h-4 w-full" />
                        </TableCell>

                      ))}

                    </TableRow>

                  ))

                ) : error ? (

                  <TableRow>

                    <TableCell
                      colSpan={8}
                      className="text-center text-red-500"
                    >
                      Failed to load performance data
                    </TableCell>

                  </TableRow>

                ) : employees.length === 0 ? (

                  <TableRow>

                    <TableCell
                      colSpan={8}
                      className="text-center text-muted-foreground"
                    >
                      No employee performance data found
                    </TableCell>

                  </TableRow>

                ) : (

                  employees.map((emp) => (

                    <TableRow
                      key={emp.id}
                      className="hover:bg-muted/50 transition"
                    >

                      <TableCell className="font-medium">
                        {emp.name}
                      </TableCell>

                      <TableCell>
                        {emp.department}
                      </TableCell>

                      <TableCell>
                        {emp.attendance.toFixed(1)}%
                      </TableCell>

                      <TableCell>
                        {emp.leaves}
                      </TableCell>

                      <TableCell>
                        {emp.lateMarks}
                      </TableCell>

                      <TableCell>
                        {emp.compliance.toFixed(1)}%
                      </TableCell>

                      <TableCell>
                        <span className="font-semibold">
                          {emp.score}
                        </span>
                      </TableCell>

                      <TableCell>

                        <Badge
                          className={getGradeStyle(emp.grade)}
                        >
                          {emp.grade}
                        </Badge>

                      </TableCell>

                    </TableRow>

                  ))

                )}

              </TableBody>

            </Table>

          </div>

          {/* PAGINATION */}

          <div className="flex justify-end items-center gap-4">

            <Button
              variant="outline"
              disabled={currentPage <= 1}
              onClick={handlePrev}
            >
              Previous
            </Button>

            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>

            <Button
              variant="outline"
              disabled={currentPage >= totalPages}
              onClick={handleNext}
            >
              Next
            </Button>

          </div>

        </CardContent>

      </Card>

    </div>

  );

}

/* =========================================================
   MEMO EXPORT
========================================================= */

export default memo(PerformanceSection);
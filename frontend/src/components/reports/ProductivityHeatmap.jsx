// // import { motion } from "framer-motion";
// // import { Card, CardContent } from "@/components/ui/card";
// // import { Skeleton } from "@/components/ui/skeleton";

// // const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
// // const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8AM–7PM

// // function getColor(value) {
// //   if (value > 85) return "bg-emerald-500";
// //   if (value > 70) return "bg-green-400";
// //   if (value > 50) return "bg-yellow-400";
// //   if (value > 30) return "bg-orange-400";
// //   return "bg-red-400";
// // }

// // export default function ProductivityHeatmap({
// //   data = [],
// //   loading,
// //   error,
// // }) {
// //   if (loading) {
// //     return (
// //       <Card className="rounded-2xl">
// //         <CardContent className="p-6 space-y-4">
// //           <Skeleton className="h-5 w-48" />
// //           <Skeleton className="h-[280px] w-full rounded-xl" />
// //         </CardContent>
// //       </Card>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <Card>
// //         <CardContent className="p-6 text-red-500">
// //           Failed to load productivity heatmap
// //         </CardContent>
// //       </Card>
// //     );
// //   }

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, y: 30 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       transition={{ duration: 0.5 }}
// //     >
// //       <Card className="rounded-2xl shadow-sm">
// //         <CardContent className="p-6">
// //           <h2 className="text-xl font-semibold mb-6">
// //             Productivity Heatmap
// //           </h2>

// //           <div className="overflow-x-auto">
// //             <div className="grid grid-cols-13 gap-2 text-xs">
              
// //               {/* Empty top-left cell */}
// //               <div />

// //               {/* Hour labels */}
// //               {hours.map((hour) => (
// //                 <div
// //                   key={hour}
// //                   className="text-center text-muted-foreground"
// //                 >
// //                   {hour}:00
// //                 </div>
// //               ))}

// //               {/* Heatmap Grid */}
// //               {days.map((day) => (
// //                 <>
// //                   <div
// //                     key={day}
// //                     className="flex items-center font-medium"
// //                   >
// //                     {day}
// //                   </div>

// //                   {hours.map((hour) => {
// //                     const cell = data.find(
// //                       (d) =>
// //                         d.day === day && d.hour === hour
// //                     );

// //                     const value = cell?.value ?? 0;

// //                     return (
// //                       <div
// //                         key={`${day}-${hour}`}
// //                         title={`${day} ${hour}:00 - ${value}%`}
// //                         className={`h-8 w-8 rounded-md ${getColor(
// //                           value
// //                         )} opacity-80 hover:opacity-100 transition`}
// //                       />
// //                     );
// //                   })}
// //                 </>
// //               ))}
// //             </div>
// //           </div>

// //         </CardContent>
// //       </Card>
// //     </motion.div>
// //   );
// // }

// import { useState } from "react";
// import { motion } from "framer-motion";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import {
//   Select,
//   SelectTrigger,
//   SelectContent,
//   SelectItem,
//   SelectValue,
// } from "@/components/ui/select";
// import { Card, CardContent } from "@/components/ui/card";

// const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
// const hours = Array.from({ length: 10 }, (_, i) => i + 8);

// function getColor(value) {
//   if (value >= 85) return "bg-emerald-500";
//   if (value >= 70) return "bg-green-400";
//   if (value >= 50) return "bg-yellow-400";
//   if (value >= 30) return "bg-orange-400";
//   return "bg-red-400";
// }

// export default function ProductivityHeatmap({
//   data = [],
//   departments = [],
//   selectedDepartment,
//   onDepartmentChange,
//   loading,
//   error,
// }) {
//   const [selectedCell, setSelectedCell] = useState(null);

//   if (loading)
//     return <Card><CardContent className="p-6">Loading...</CardContent></Card>;

//   if (error)
//     return <Card><CardContent className="p-6 text-red-500">Failed to load</CardContent></Card>;

//   return (
//     <>
//       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//         <Card className="rounded-2xl shadow-sm">
//           <CardContent className="p-6 space-y-6">

//             {/* Header */}
//             <div className="flex justify-between items-center">
//               <h2 className="text-xl font-semibold">
//                 Productivity Heatmap
//               </h2>

//               <div className="w-[200px]">
//                 <Select
//                   value={selectedDepartment}
//                   onValueChange={onDepartmentChange}
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select Department" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="all">All</SelectItem>
//                     {departments.map((dept) => (
//                       <SelectItem key={dept} value={dept}>
//                         {dept}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>

//             {/* Heatmap Grid */}
//             <div className="grid grid-cols-11 gap-2 text-xs">
//               <div />
//               {hours.map((hour) => (
//                 <div key={hour} className="text-center text-muted-foreground">
//                   {hour}
//                 </div>
//               ))}

//               {days.map((day) => (
//                 <>
//                   <div key={day} className="font-medium">
//                     {day}
//                   </div>

//                   {hours.map((hour) => {
//                     const cell = data.find(
//                       (d) => d.day === day && d.hour === hour
//                     );

//                     const value = cell?.value || 0;

//                     return (
//                       <div
//                         key={`${day}-${hour}`}
//                         onClick={() =>
//                           setSelectedCell({ day, hour, value })
//                         }
//                         className={`h-9 w-9 rounded-lg ${getColor(
//                           value
//                         )} cursor-pointer hover:scale-110 transition`}
//                       />
//                     );
//                   })}
//                 </>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </motion.div>

//       {/* ================= MODAL ================= */}
//       <Dialog
//         open={!!selectedCell}
//         onOpenChange={() => setSelectedCell(null)}
//       >
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>
//               Detailed Productivity Analysis
//             </DialogTitle>
//           </DialogHeader>

//           {selectedCell && (
//             <div className="space-y-4 text-sm">
//               <p>
//                 <strong>Day:</strong> {selectedCell.day}
//               </p>
//               <p>
//                 <strong>Hour:</strong> {selectedCell.hour}:00
//               </p>
//               <p>
//                 <strong>Productivity Score:</strong>{" "}
//                 {selectedCell.value}%
//               </p>

//               <div className="pt-2 border-t">
//                 <p>
//                   🔍 Suggested Action:
//                 </p>
//                 {selectedCell.value < 40 ? (
//                   <p className="text-red-500">
//                     Low productivity detected. Consider workload review or
//                     break optimization.
//                   </p>
//                 ) : selectedCell.value > 85 ? (
//                   <p className="text-emerald-600">
//                     Peak performance hour. Ideal for strategic tasks.
//                   </p>
//                 ) : (
//                   <p className="text-yellow-600">
//                     Stable productivity. Monitor trends over time.
//                   </p>
//                 )}
//               </div>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }

// import { useState } from "react";
// import { motion } from "framer-motion";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import {
//   Select,
//   SelectTrigger,
//   SelectContent,
//   SelectItem,
//   SelectValue,
// } from "@/components/ui/select";
// import { Card, CardContent } from "@/components/ui/card";
// import React from "react";

// const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
// const hours = Array.from({ length: 10 }, (_, i) => i + 8);

// function getColor(value) {
//   if (value >= 85) return "bg-emerald-500";
//   if (value >= 70) return "bg-green-400";
//   if (value >= 50) return "bg-yellow-400";
//   if (value >= 30) return "bg-orange-400";
//   return "bg-red-400";
// }

// export default function ProductivityHeatmap({
//   data = [],
//   departments = [],
//   selectedDepartment,
//   onDepartmentChange,
//   loading,
//   error,
// }) {

//   const [selectedCell, setSelectedCell] = useState(null);

//   if (loading)
//     return (
//       <Card>
//         <CardContent className="p-6">Loading...</CardContent>
//       </Card>
//     );

//   if (error)
//     return (
//       <Card>
//         <CardContent className="p-6 text-red-500">
//           Failed to load productivity heatmap
//         </CardContent>
//       </Card>
//     );

//   return (
//     <>
//       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

//         <Card className="rounded-2xl shadow-sm">

//           <CardContent className="p-6 space-y-6">

//             {/* Header */}

//             <div className="flex justify-between items-center">

//               <h2 className="text-xl font-semibold">
//                 Productivity Heatmap
//               </h2>

//               <div className="w-[200px]">

//                 <Select
//                   value={selectedDepartment}
//                   onValueChange={onDepartmentChange}
//                 >

//                   <SelectTrigger>
//                     <SelectValue placeholder="Select Department" />
//                   </SelectTrigger>

//                   <SelectContent>

//                     <SelectItem value="all">
//                       All
//                     </SelectItem>

//                     {departments.map((dept) => (
//                       <SelectItem key={dept} value={dept}>
//                         {dept}
//                       </SelectItem>
//                     ))}

//                   </SelectContent>

//                 </Select>

//               </div>

//             </div>

//             {/* Heatmap Grid */}

//             <div className="grid grid-cols-11 gap-2 text-xs">

//               {/* Empty corner */}
//               <div />

//               {/* Hour Labels */}
//               {hours.map((hour) => (
//                 <div
//                   key={`hour-${hour}`}
//                   className="text-center text-muted-foreground"
//                 >
//                   {hour}
//                 </div>
//               ))}

//               {/* Heatmap Rows */}
//               {days.map((day) => (
//                 <React.Fragment key={day}>

//                   {/* Day Label */}
//                   <div className="font-medium flex items-center">
//                     {day}
//                   </div>

//                   {hours.map((hour) => {

//                     const cell = data.find(
//                       (d) => d.day === day && d.hour === hour
//                     );

//                     const value = cell?.value ?? 0;

//                     return (
//                       <div
//                         key={`${day}-${hour}`}
//                         onClick={() =>
//                           setSelectedCell({ day, hour, value })
//                         }
//                         title={`${day} ${hour}:00 - ${value}%`}
//                         className={`h-9 w-9 rounded-lg ${getColor(value)}
//                         cursor-pointer hover:scale-110 transition`}
//                       />
//                     );
//                   })}

//                 </React.Fragment>
//               ))}

//             </div>

//           </CardContent>

//         </Card>

//       </motion.div>

//       {/* Modal */}

//       <Dialog
//         open={!!selectedCell}
//         onOpenChange={() => setSelectedCell(null)}
//       >

//         <DialogContent>

//           <DialogHeader>
//             <DialogTitle>
//               Detailed Productivity Analysis
//             </DialogTitle>
//           </DialogHeader>

//           {selectedCell && (

//             <div className="space-y-4 text-sm">

//               <p>
//                 <strong>Day:</strong> {selectedCell.day}
//               </p>

//               <p>
//                 <strong>Hour:</strong> {selectedCell.hour}:00
//               </p>

//               <p>
//                 <strong>Productivity Score:</strong>{" "}
//                 {selectedCell.value}%
//               </p>

//               <div className="pt-2 border-t">

//                 <p className="font-medium">
//                   Suggested Action:
//                 </p>

//                 {selectedCell.value < 40 ? (
//                   <p className="text-red-500">
//                     Low productivity detected. Consider workload balancing
//                     or break optimization.
//                   </p>
//                 ) : selectedCell.value > 85 ? (
//                   <p className="text-emerald-600">
//                     Peak productivity hour. Ideal for strategic tasks.
//                   </p>
//                 ) : (
//                   <p className="text-yellow-600">
//                     Stable productivity. Monitor trends over time.
//                   </p>
//                 )}

//               </div>

//             </div>

//           )}

//         </DialogContent>

//       </Dialog>
//     </>
//   );
// }

//final

import { useState, useMemo, memo } from "react";
import { motion } from "framer-motion";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { Card, CardContent } from "@/components/ui/card";
import SkeletonCard from "@/components/reports/SkeletonCard";

/*
=========================================================
CONSTANTS
=========================================================
*/

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const HOURS = Array.from({ length: 10 }, (_, i) => i + 8);

/*
=========================================================
COLOR SCALE
=========================================================
*/

function getColor(value) {
  if (value >= 85) return "bg-emerald-500";
  if (value >= 70) return "bg-green-400";
  if (value >= 50) return "bg-yellow-400";
  if (value >= 30) return "bg-orange-400";
  return "bg-red-400";
}

/*
=========================================================
COMPONENT
=========================================================
*/

function ProductivityHeatmap({
  data = [],
  departments = [],
  selectedDepartment,
  onDepartmentChange,
  loading,
  error,
}) {

  const [selectedCell, setSelectedCell] = useState(null);

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return <SkeletonCard variant="chart" height="h-[320px]" />;
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-red-500">
          Failed to load productivity heatmap
        </CardContent>
      </Card>
    );
  }

  /* =====================================================
     DATA MAP (O(1) LOOKUP)
  ===================================================== */

  const dataMap = useMemo(() => {

    const map = new Map();

    data.forEach((item) => {
      map.set(`${item.day}-${item.hour}`, item.value);
    });

    return map;

  }, [data]);

  /* =====================================================
     CELL VALUE GETTER
  ===================================================== */

  const getValue = (day, hour) =>
    dataMap.get(`${day}-${hour}`) ?? 0;

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >

        <Card className="rounded-2xl shadow-sm">

          <CardContent className="p-6 space-y-6">

            {/* HEADER */}

            <div className="flex justify-between items-center">

              <h2 className="text-xl font-semibold">
                Productivity Heatmap
              </h2>

              <div className="w-[200px]">

                <Select
                  value={selectedDepartment}
                  onValueChange={onDepartmentChange}
                >

                  <SelectTrigger>
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>

                  <SelectContent>

                    <SelectItem value="all">
                      All
                    </SelectItem>

                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}

                  </SelectContent>

                </Select>

              </div>

            </div>

            {/* HEATMAP GRID */}

            <div className="grid grid-cols-11 gap-2 text-xs">

              <div />

              {HOURS.map((hour) => (
                <div
                  key={`hour-${hour}`}
                  className="text-center text-muted-foreground"
                >
                  {hour}
                </div>
              ))}

              {DAYS.map((day) => (
  <div key={`row-${day}`} className="contents">

    <div className="font-medium flex items-center">
      {day}
    </div>

    {HOURS.map((hour) => {

      const value = getValue(day, hour);

      return (
        <div
          key={`cell-${day}-${hour}`}
          title={`${day} ${hour}:00 - ${value}%`}
          onClick={() =>
            setSelectedCell({
              day,
              hour,
              value,
            })
          }
          className={`h-9 w-9 rounded-lg ${getColor(
            value
          )} cursor-pointer hover:scale-110 transition`}
        />
      );

    })}

  </div>
))}

            </div>

          </CardContent>

        </Card>

      </motion.div>

      {/* MODAL */}

      <Dialog
        open={!!selectedCell}
        onOpenChange={() => setSelectedCell(null)}
      >

        <DialogContent>

          <DialogHeader>
            <DialogTitle>
              Productivity Analysis
            </DialogTitle>
          </DialogHeader>

          {selectedCell && (

            <div className="space-y-4 text-sm">

              <p>
                <strong>Day:</strong> {selectedCell.day}
              </p>

              <p>
                <strong>Hour:</strong> {selectedCell.hour}:00
              </p>

              <p>
                <strong>Score:</strong>{" "}
                {selectedCell.value}%
              </p>

              <div className="pt-2 border-t">

                {selectedCell.value < 40 && (
                  <p className="text-red-500">
                    Low productivity detected.
                  </p>
                )}

                {selectedCell.value >= 40 &&
                  selectedCell.value < 85 && (
                    <p className="text-yellow-600">
                      Stable productivity period.
                    </p>
                  )}

                {selectedCell.value >= 85 && (
                  <p className="text-emerald-600">
                    Peak productivity hour.
                  </p>
                )}

              </div>

            </div>

          )}

        </DialogContent>

      </Dialog>

    </>
  );

}

/*
=========================================================
MEMOIZED COMPONENT
=========================================================
*/

export default memo(ProductivityHeatmap);
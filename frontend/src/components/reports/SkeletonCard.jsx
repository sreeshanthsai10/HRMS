// import { Card, CardContent } from "@/components/ui/card";
// import { Skeleton } from "@/components/ui/skeleton";

// export default function SkeletonCard({
//   variant = "kpi",
//   height = "h-[280px]",
// }) {
//   if (variant === "chart") {
//     return (
//       <Card className="rounded-2xl shadow-sm">
//         <CardContent className="p-6 space-y-4">
//           <Skeleton className="h-5 w-40" />
//           <Skeleton className={`w-full ${height} rounded-xl`} />
//         </CardContent>
//       </Card>
//     );
//   }

//   if (variant === "table") {
//     return (
//       <Card className="rounded-2xl shadow-sm">
//         <CardContent className="p-6 space-y-4">
//           <Skeleton className="h-5 w-32" />
//           <Skeleton className="h-10 w-full" />
//           <Skeleton className="h-10 w-full" />
//           <Skeleton className="h-10 w-full" />
//         </CardContent>
//       </Card>
//     );
//   }

//   // Default KPI style
//   return (
//     <Card className="rounded-2xl shadow-sm">
//       <CardContent className="p-5 space-y-3">
//         <Skeleton className="h-4 w-24" />
//         <Skeleton className="h-6 w-20" />
//       </CardContent>
//     </Card>
//   );
// }

//final

import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/*
=========================================================
REUSABLE SKELETON CARD
Used across reports dashboard for loading states
=========================================================
*/

function SkeletonCard({
  variant = "kpi",
  height = "h-[280px]",
  rows = 3
}) {

  /* =====================================================
     KPI SKELETON
  ===================================================== */

  if (variant === "kpi") {
    return (
      <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-5 space-y-3">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-7 w-24" />
        </CardContent>
      </Card>
    );
  }

  /* =====================================================
     CHART SKELETON
  ===================================================== */

  if (variant === "chart") {
    return (
      <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-6 space-y-4">
          <Skeleton className="h-5 w-40" />
          <Skeleton className={`w-full ${height} rounded-xl`} />
        </CardContent>
      </Card>
    );
  }

  /* =====================================================
     TABLE SKELETON
  ===================================================== */

  if (variant === "table") {
    return (
      <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-6 space-y-3">

          <Skeleton className="h-5 w-36 mb-2" />

          {Array.from({ length: rows }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-10 w-full rounded-md"
            />
          ))}

        </CardContent>
      </Card>
    );
  }

  /* =====================================================
     FALLBACK
  ===================================================== */

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-5">
        <Skeleton className="h-8 w-full" />
      </CardContent>
    </Card>
  );

}

/*
=========================================================
MEMOIZED COMPONENT
Prevents unnecessary re-renders
=========================================================
*/

export default memo(SkeletonCard);
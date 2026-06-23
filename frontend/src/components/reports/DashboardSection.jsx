// import ExecutiveInsights from "@/components/reports/ExecutiveInsights";
// import KPISection from "@/components/reports/KPISection";
// import WorkforceCharts from "@/components/reports/WorkforceCharts";
// import AttendanceCharts from "@/components/reports/AttendanceCharts";
// import DepartmentChart from "@/components/reports/DepartmentChart";
// import LeavePieChart from "@/components/reports/LeavePieChart";
// import WorkforceHealthMeter from "@/components/reports/WorkforceHealthMeter";
// import DepartmentWorkingHours from "@/components/reports/DepartmentWorkingHours";
// import PerformanceInsights from "@/components/reports/PerformanceInsights";
// export default function DashboardSection({
//   data,
//   insightsData,
//   insightsLoading,
//   loading,
//   error,
//   filters,
// }) {
//   if (loading) return <p>Loading dashboard...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;
//   if (!data) return null;

//   return (
//     <>
//       <ExecutiveInsights data={data.summary} />
//       <KPISection data={data.summary} />
//       <PerformanceInsights
//   data={insightsData}
//   loading={insightsLoading}
// />
//       <DepartmentWorkingHours data={data?.departmentWorkingHours} />
//       <WorkforceCharts
//         data={data.workforceTrend}
//         filters={filters}
//       />

//       <AttendanceCharts
//         data={data.attendanceTrend}
//         filters={filters}
//       />

//       <div className="grid md:grid-cols-2 gap-6">
//         <DepartmentChart data={data.departmentDistribution} />
//         <LeavePieChart data={data.leaveBreakdown} />
//       </div>
//       <WorkforceHealthMeter data={data.summary} />
//     </>
//   );
// }

import ExecutiveInsights from "@/components/reports/ExecutiveInsights";
import KPISection from "@/components/reports/KPISection";
import WorkforceCharts from "@/components/reports/WorkforceCharts";
import AttendanceCharts from "@/components/reports/AttendanceCharts";
import DepartmentChart from "@/components/reports/DepartmentChart";
import LeavePieChart from "@/components/reports/LeavePieChart";
import WorkforceHealthMeter from "@/components/reports/WorkforceHealthMeter";
import DepartmentWorkingHours from "@/components/reports/DepartmentWorkingHours";
import PerformanceInsights from "@/components/reports/PerformanceInsights";

export default function DashboardSection({
  data,
  insightsData,
  insightsLoading,
  loading,
  error,
  filters,
}) {
  if (loading)
    return <p className="text-muted-foreground">Loading dashboard...</p>;

  if (error)
    return <p className="text-red-500">{error}</p>;

  if (!data) return null;

  return (
    <div className="space-y-16">

      {/* ================= EXECUTIVE OVERVIEW ================= */}
      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold">
            Executive Overview
          </h2>
          <p className="text-sm text-muted-foreground">
            High-level workforce and financial performance
          </p>
        </div>

        <ExecutiveInsights data={data.summary} />

        <KPISection data={data.summary} />

        <WorkforceHealthMeter data={data.summary} />
      </section>

      {/* ================= WORKFORCE ANALYTICS ================= */}
      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold">
            Workforce Analytics
          </h2>
          <p className="text-sm text-muted-foreground">
            Growth, attendance and operational metrics
          </p>
        </div>

        <div className="grid xl:grid-cols-2 gap-8">
          <WorkforceCharts
            data={data.workforceTrend}
            filters={filters}
          />

          <AttendanceCharts
            data={data.attendanceTrend}
            filters={filters}
          />
        </div>

        <DepartmentWorkingHours
          data={data?.departmentWorkingHours}
        />
      </section>

      {/* ================= DISTRIBUTION & INSIGHTS ================= */}
      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold">
            Department Distribution & Insights
          </h2>
          <p className="text-sm text-muted-foreground">
            Department-wise employee and leave analytics
          </p>
        </div>

        <PerformanceInsights
          data={insightsData}
          loading={insightsLoading}
        />

        <div className="grid xl:grid-cols-2 gap-8">
          <DepartmentChart
            data={data.departmentDistribution}
          />

          <LeavePieChart
            data={data.leaveBreakdown}
          />
        </div>
      </section>

    </div>
  );
}
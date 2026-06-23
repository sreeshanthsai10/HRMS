import WorkforceCharts from "@/components/reports/WorkforceCharts";
import AttendanceCharts from "@/components/reports/AttendanceCharts";
import DepartmentChart from "@/components/reports/DepartmentChart";
import LeavePieChart from "@/components/reports/LeavePieChart";
import DepartmentWorkingHours from "@/components/reports/DepartmentWorkingHours";

export default function WorkforceSection({ data, filters }) {
  if (!data) return null;

  return (
    <section className="space-y-12">
      <h2 className="text-2xl font-semibold">Workforce Analytics</h2>

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

      <div className="grid xl:grid-cols-2 gap-8">
        <DepartmentChart data={data.departmentDistribution} />
        <LeavePieChart data={data.leaveBreakdown} />
      </div>

      <DepartmentWorkingHours
        data={data.departmentWorkingHours}
      />
    </section>
  );
}
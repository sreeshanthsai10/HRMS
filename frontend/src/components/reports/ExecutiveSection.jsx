import ExecutiveInsights from "@/components/reports/ExecutiveInsights";
import KPISection from "@/components/reports/KPISection";
import WorkforceHealthMeter from "@/components/reports/WorkforceHealthMeter";
import DepartmentBudgetOverview from "@/components/reports/DepartmentBudgetOverview";

export default function ExecutiveSection({ data, filters }) {
  if (!data) return null;

  return (
    <section className="space-y-10">
      <h2 className="text-2xl font-semibold">Executive Overview</h2>

      <ExecutiveInsights data={data.summary} />
      <KPISection data={data.summary} />

      <div className="grid xl:grid-cols-2 gap-8">
        <WorkforceHealthMeter data={data.summary} />
        <DepartmentBudgetOverview filters={filters} />
      </div>
    </section>
  );
}
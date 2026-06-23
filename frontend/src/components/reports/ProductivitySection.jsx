import ProductivityKPI from "@/components/reports/ProductivityKPI";
import LiveWorkforceStatus from "@/components/reports/LiveWorkforceStatus";
import ProductivityHeatmap from "@/components/reports/ProductivityHeatmap";
import AppUsageChart from "@/components/reports/AppUsageChart";

export default function ProductivitySection({
  productivityData,
  liveStatusData,
  heatmapData,
  appUsageData,
  departmentsList,
  selectedDept,
  setSelectedDept,
}) {
  return (
    <section className="space-y-12">
      <h2 className="text-2xl font-semibold">
        Productivity Intelligence
      </h2>

      <ProductivityKPI data={productivityData} />
      <LiveWorkforceStatus data={liveStatusData} />

      <div className="grid xl:grid-cols-2 gap-8">
        <AppUsageChart data={appUsageData} />
        <ProductivityHeatmap
          data={heatmapData}
          departments={departmentsList}
          selectedDepartment={selectedDept}
          onDepartmentChange={setSelectedDept}
        />
      </div>
    </section>
  );
}
import PerformanceInsights from "@/components/reports/PerformanceInsights";
import PerformanceSection from "@/components/reports/PerformanceSection";

export default function PerformanceBlock({
  insightsData,
  insightsLoading,
  performanceHook,
  performanceFilters,
  setPerformanceFilters,
}) {
  return (
    <section className="space-y-12">
      <h2 className="text-2xl font-semibold">
        Performance Analytics
      </h2>

      <PerformanceInsights
        data={insightsData}
        loading={insightsLoading}
      />

      <PerformanceSection
        hook={performanceHook}
        filters={performanceFilters}
        setFilters={setPerformanceFilters}
      />
    </section>
  );
}
// // import { useState, useEffect } from "react";
// // import api from "@/services/apiClient";
// // import jsPDF from "jspdf";
// // import autoTable from "jspdf-autotable";

// // import DashboardSection from "@/components/reports/DashboardSection";
// // import PerformanceSection from "@/components/reports/PerformanceSection";
// // import ReportsHeader from "@/components/reports/ReportsHeader";
// // import PerformanceInsights from "@/components/reports/PerformanceInsights";
// // import DepartmentBudgetOverview from "@/components/reports/DepartmentBudgetOverview";
// // import useReports from "@/hooks/useReports";
// // import useEmployeePerformance from "@/hooks/useEmployeePerformance";
// // import usePerformanceInsights from "@/hooks/usePerformanceInsights";
// // import ProductivityKPI from "@/components/reports/ProductivityKPI";
// // import LiveWorkforceStatus from "@/components/reports/LiveWorkforceStatus";
// // import ProductivityHeatmap from "@/components/reports/ProductivityHeatmap";
// // import AppUsageChart from "@/components/reports/AppUsageChart";


// // export default function ReportsPage() {

// //   /* ================= GLOBAL FILTERS ================= */
// //   const [filters, setFilters] = useState({
// //     period: "3m",
// //     startDate: "",
// //     endDate: "",
// //     department: "all",
// //     role: "all",
// //   });

// //   /* ================= REPORTS DATA ================= */
// //   const {
// //     data: reportsData,
// //     loading: reportsLoading,
// //     error: reportsError,
// //   } = useReports(filters);

// //   /* ================= PERFORMANCE INSIGHTS ================= */
// //   const {
// //     data: insightsData,
// //     loading: insightsLoading,
// //   } = usePerformanceInsights(filters);

// //   /* ================= PERFORMANCE TABLE FILTERS ================= */
// //   const [performanceFilters, setPerformanceFilters] = useState({
// //     role: "all",
// //     department: "all",
// //     search: "",
// //     page: 1,
// //     limit: 10,
// //   });

// //   useEffect(() => {
// //     setPerformanceFilters((prev) => ({
// //       ...prev,
// //       role: filters.role,
// //       department: filters.department,
// //       page: 1,
// //     }));
// //   }, [filters.role, filters.department]);

// //   const performanceHook = useEmployeePerformance(performanceFilters);

// //   /* ================= EXPORT CSV ================= */
// //   const handleExportCSV = async () => {
// //     try {
// //       const res = await api.get("/reports/export", { params: filters });
// //       const data = res?.data?.data || [];

// //       if (!data.length) return;

// //       const headers = Object.keys(data[0]);
// //       const csvRows = [];

// //       csvRows.push(headers.join(","));

// //       for (const row of data) {
// //         csvRows.push(headers.map(h => `"${row[h] ?? ""}"`).join(","));
// //       }

// //       const blob = new Blob([csvRows.join("\n")], {
// //         type: "text/csv",
// //       });

// //       const url = window.URL.createObjectURL(blob);
// //       const a = document.createElement("a");

// //       a.href = url;
// //       a.download = "HRMS_Report.csv";
// //       a.click();

// //       window.URL.revokeObjectURL(url);

// //     } catch (error) {
// //       console.error("CSV Export failed:", error);
// //     }
// //   };

// //   /* ================= EXPORT PDF ================= */
// //   const handleExportPDF = async () => {
// //     try {
// //       const res = await api.get("/reports/export", { params: filters });
// //       const data = res?.data?.data || [];

// //       if (!data.length) return;

// //       const doc = new jsPDF();

// //       doc.setFontSize(16);
// //       doc.text("HRMS Report", 14, 15);

// //       doc.setFontSize(10);
// //       doc.text(
// //         `Department: ${filters.department} | Role: ${filters.role}`,
// //         14,
// //         22
// //       );

// //       autoTable(doc, {
// //         head: [Object.keys(data[0])],
// //         body: data.map(row => Object.values(row)),
// //         startY: 28,
// //         styles: { fontSize: 8 },
// //       });

// //       doc.save("HRMS_Report.pdf");

// //     } catch (error) {
// //       console.error("PDF Export failed:", error);
// //     }
// //   };

// //   return (
// //     <div className="p-6 space-y-8">
// //       <h1 className="text-3xl font-bold">
// //         Reports & Analytics
// //       </h1>
      
// //       {/* HEADER FILTERS */}
// //       <ReportsHeader filters={filters} setFilters={setFilters} />


// //       {/* DASHBOARD SECTION */}
// //       <DashboardSection
// //   data={reportsData}
// //   insightsData={insightsData}
// //   insightsLoading={insightsLoading}
// //   loading={reportsLoading}
// //   error={reportsError}
// //   filters={filters}
// // />

// //       {/* PERFORMANCE INSIGHTS (Top & At-Risk) */}
// //       <PerformanceInsights
// //         data={insightsData}
// //         loading={insightsLoading}
// //       />

// //       {/* PERFORMANCE TABLE */}
// //       <PerformanceSection
// //         hook={performanceHook}
// //         filters={performanceFilters}
// //         setFilters={setPerformanceFilters}
// //       />
// //       <ProductivityKPI
// //         data={{
// //         totalActiveHours: 128,
// //         idleHours: 22,
// //         focusScore: 82,
// //         distractionIndex: 18,
// //        }}
// //         loading={false}
// //         error={null}
// //       />

// //       <LiveWorkforceStatus
// //   data={{
// //     active: 42,
// //     idle: 8,
// //     away: 5,
// //     totalOnline: 55,
// //   }}
// //   loading={false}
// //   error={null}
// // />

// // <ProductivityHeatmap
// //   data={[
// //     { day: "Mon", hour: 9, value: 85 },
// //     { day: "Mon", hour: 10, value: 92 },
// //     { day: "Tue", hour: 14, value: 65 },
// //     { day: "Wed", hour: 11, value: 45 },
// //   ]}
// //   loading={false}
// //   error={null}
// // />

// // <AppUsageChart
// //   data={[
// //     { name: "Productive", value: 420 },
// //     { name: "Neutral", value: 180 },
// //     { name: "Non-Productive", value: 120 },
// //   ]}
// //   loading={false}
// //   error={null}
// // />
// //     </div>
// //   );
// // }

// import { useState, useEffect } from "react";
// import api from "@/services/apiClient";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// import ReportsHeader from "@/components/reports/ReportsHeader";
// import DashboardSection from "@/components/reports/DashboardSection";
// import DepartmentBudgetOverview from "@/components/reports/DepartmentBudgetOverview";
// import PerformanceSection from "@/components/reports/PerformanceSection";
// import PerformanceInsights from "@/components/reports/PerformanceInsights";

// /* ===== Productivity Modules ===== */
// import ProductivityKPI from "@/components/reports/ProductivityKPI";
// import LiveWorkforceStatus from "@/components/reports/LiveWorkforceStatus";
// import TeamProductivityComparison from "@/components/reports/TeamProductivityComparison";
// import ProductivityHeatmap from "@/components/reports/ProductivityHeatmap";
// import AppUsageTimeline from "@/components/reports/AppUsageTimeline";
// import AppUsageChart from "@/components/reports/AppUsageChart";
// import IdleTimeAlerts from "@/components/reports/IdleTimeAlerts";
// import WorkLifeBalanceOverview from "@/components/reports/WorkLifeBalanceOverview";

// import useReports from "@/hooks/useReports";
// import useEmployeePerformance from "@/hooks/useEmployeePerformance";
// import usePerformanceInsights from "@/hooks/usePerformanceInsights";

// export default function ReportsPage() {

//   const [selectedDept, setSelectedDept] = useState("all");
//   // const [heatmapData, setHeatmapData] = useState([]);
//   const [heatmapLoading, setHeatmapLoading] = useState(false);
//   /* ================= GLOBAL FILTERS ================= */
//   const [filters, setFilters] = useState({
//     period: "3m",
//     startDate: "",
//     endDate: "",
//     department: "all",
//     role: "all",
//   });

//   /* ================= CORE REPORT DATA ================= */
//   const {
//     data: reportsData,
//     loading: reportsLoading,
//     error: reportsError,
//   } = useReports(filters);

//   /* ================= PERFORMANCE INSIGHTS ================= */
//   const {
//     data: insightsData,
//     loading: insightsLoading,
//   } = usePerformanceInsights(filters);

//   /* ================= PERFORMANCE TABLE ================= */
//   const [performanceFilters, setPerformanceFilters] = useState({
//     role: "all",
//     department: "all",
//     search: "",
//     page: 1,
//     limit: 10,
//   });

//   useEffect(() => {
//     setPerformanceFilters(prev => ({
//       ...prev,
//       role: filters.role,
//       department: filters.department,
//       page: 1,
//     }));
//   }, [filters.role, filters.department]);

//   const performanceHook = useEmployeePerformance(performanceFilters);

//   /* ================= EXPORT FUNCTIONS ================= */
//   const handleExportCSV = async () => {
//     try {
//       const res = await api.get("/reports/export", { params: filters });
//       const data = res?.data?.data || [];
//       if (!data.length) return;

//       const headers = Object.keys(data[0]);
//       const csvRows = [];
//       csvRows.push(headers.join(","));

//       for (const row of data) {
//         csvRows.push(headers.map(h => `"${row[h] ?? ""}"`).join(","));
//       }

//       const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = "HRMS_Report.csv";
//       a.click();
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("CSV Export failed:", error);
//     }
//   };

//   const handleExportPDF = async () => {
//     try {
//       const res = await api.get("/reports/export", { params: filters });
//       const data = res?.data?.data || [];
//       if (!data.length) return;

//       const doc = new jsPDF();
//       doc.setFontSize(16);
//       doc.text("HRMS Report", 14, 15);
//       doc.setFontSize(10);
//       doc.text(
//         `Department: ${filters.department} | Role: ${filters.role}`,
//         14,
//         22
//       );

//       autoTable(doc, {
//         head: [Object.keys(data[0])],
//         body: data.map(row => Object.values(row)),
//         startY: 28,
//         styles: { fontSize: 8 },
//       });

//       doc.save("HRMS_Report.pdf");
//     } catch (error) {
//       console.error("PDF Export failed:", error);
//     }
//   };
//   const heatmapData = [
//   { day: "Mon", hour: 8, value: 60 },
//   { day: "Mon", hour: 9, value: 85 },
//   { day: "Tue", hour: 10, value: 72 },
//   { day: "Wed", hour: 11, value: 45 },
//   { day: "Thu", hour: 14, value: 90 },
//   { day: "Fri", hour: 16, value: 30 },
// ];

//   return (
//     <div className="p-8 space-y-16">

//       {/* ================= PAGE HEADER ================= */}
//       <div>
//         <h1 className="text-3xl font-bold">
//           Reports & Analytics
//         </h1>
//         <p className="text-muted-foreground mt-2">
//           Enterprise workforce intelligence and productivity analytics
//         </p>
//       </div>

//       {/* ================= FILTER HEADER ================= */}
//       <ReportsHeader
//         filters={filters}
//         setFilters={setFilters}
//         onExportCSV={handleExportCSV}
//         onExportPDF={handleExportPDF}
//       />

//       {/* ================= CORE ANALYTICS ================= */}
//       <section className="space-y-10">
//         <h2 className="text-2xl font-semibold">
//           Workforce Overview
//         </h2>

//         <DashboardSection
//           data={reportsData}
//           loading={reportsLoading}
//           error={reportsError}
//           filters={filters}
//         />

//         <DepartmentBudgetOverview filters={filters} />
//       </section>

//       {/* ================= PRODUCTIVITY INTELLIGENCE ================= */}
//       <section className="space-y-10">
//         <h2 className="text-2xl font-semibold">
//           Productivity Intelligence
//         </h2>

//         <ProductivityKPI
//           data={{
//             totalActiveHours: 128,
//             idleHours: 22,
//             focusScore: 82,
//             distractionIndex: 18,
//           }}
//         />

//         <LiveWorkforceStatus
//           data={{
//             active: 42,
//             idle: 8,
//             away: 5,
//             totalOnline: 55,
//           }}
//         />

//         <TeamProductivityComparison
//           data={[
//             { team: "Engineering", productivity: 88 },
//             { team: "Marketing", productivity: 72 },
//             { team: "HR", productivity: 64 },
//           ]}
//         />

//         <ProductivityHeatmap
//           data={heatmapData}
//           departments={["Engineering", "HR", "Sales", "Marketing","IT","Finance","Operations"]}
//           selectedDepartment={selectedDept}
//           onDepartmentChange={setSelectedDept}
//         />

//         <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
//           <AppUsageTimeline
//             data={[
//               {
//                 hour: 9,
//                 apps: [
//                   { name: "VS Code", type: "productive" },
//                   { name: "Slack", type: "neutral" },
//                 ],
//               },
//             ]}
//           />

//           <AppUsageChart
//             data={[
//               { name: "Productive", value: 420 },
//               { name: "Neutral", value: 180 },
//               { name: "Non-Productive", value: 120 },
//             ]}
//           />
//         </div>

//         <IdleTimeAlerts
//           data={[
//             { employee: "Rahul", idleMinutes: 45 },
//           ]}
//         />

//         <WorkLifeBalanceOverview
//           data={[
//             { name: "Focus Time", value: 60 },
//             { name: "Breaks", value: 25 },
//             { name: "Overtime", value: 15 },
//           ]}
//         />
//       </section>

//       {/* ================= PERFORMANCE ANALYTICS ================= */}
//       <section className="space-y-10">
//         <h2 className="text-2xl font-semibold">
//           Performance Analytics
//         </h2>

//         <PerformanceInsights
//           data={insightsData}
//           loading={insightsLoading}
//         />

//         <PerformanceSection
//           hook={performanceHook}
//           filters={performanceFilters}
//           setFilters={setPerformanceFilters}
//         />
//       </section>

//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import api from "@/services/apiClient";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// import ReportsHeader from "@/components/reports/ReportsHeader";
// import ExecutiveInsights from "@/components/reports/ExecutiveInsights";
// import KPISection from "@/components/reports/KPISection";
// import WorkforceCharts from "@/components/reports/WorkforceCharts";
// import AttendanceCharts from "@/components/reports/AttendanceCharts";
// import DepartmentChart from "@/components/reports/DepartmentChart";
// import LeavePieChart from "@/components/reports/LeavePieChart";
// import WorkforceHealthMeter from "@/components/reports/WorkforceHealthMeter";
// import DepartmentWorkingHours from "@/components/reports/DepartmentWorkingHours";
// import PerformanceInsights from "@/components/reports/PerformanceInsights";
// import DepartmentBudgetOverview from "@/components/reports/DepartmentBudgetOverview";
// import PerformanceSection from "@/components/reports/PerformanceSection";

// import ProductivityKPI from "@/components/reports/ProductivityKPI";
// import LiveWorkforceStatus from "@/components/reports/LiveWorkforceStatus";
// import ProductivityHeatmap from "@/components/reports/ProductivityHeatmap";
// import AppUsageChart from "@/components/reports/AppUsageChart";

// import useReports from "@/hooks/useReports";
// import useEmployeePerformance from "@/hooks/useEmployeePerformance";
// import usePerformanceInsights from "@/hooks/usePerformanceInsights";

// export default function ReportsPage() {

//   /* ================= GLOBAL FILTERS ================= */
//   const [filters, setFilters] = useState({
//     period: "3m",
//     startDate: "",
//     endDate: "",
//     department: "all",
//     role: "all",
//   });

//   /* ================= REPORTS DATA ================= */
//   const {
//     data: reportsData,
//     loading: reportsLoading,
//     error: reportsError,
//   } = useReports(filters);

//   /* ================= PERFORMANCE INSIGHTS ================= */
//   const {
//     data: insightsData,
//     loading: insightsLoading,
//   } = usePerformanceInsights(filters);

//   /* ================= PERFORMANCE TABLE ================= */
//   const [performanceFilters, setPerformanceFilters] = useState({
//     role: "all",
//     department: "all",
//     search: "",
//     page: 1,
//     limit: 10,
//   });

//   useEffect(() => {
//     setPerformanceFilters((prev) => ({
//       ...prev,
//       role: filters.role,
//       department: filters.department,
//       page: 1,
//     }));
//   }, [filters.role, filters.department]);

//   const performanceHook = useEmployeePerformance(performanceFilters);

//   /* ================= PRODUCTIVITY MOCK DATA ================= */
//   const [selectedDept, setSelectedDept] = useState("all");

//   const productivityData = {
//     totalActiveHours: 128,
//     idleHours: 22,
//     focusScore: 82,
//     distractionIndex: 18,
//   };

//   const liveStatusData = {
//     active: 42,
//     idle: 8,
//     away: 5,
//     totalOnline: 55,
//   };

//   const heatmapData = [
//     { day: "Mon", hour: 8, value: 65 },
//     { day: "Mon", hour: 9, value: 85 },
//     { day: "Tue", hour: 10, value: 72 },
//     { day: "Wed", hour: 11, value: 45 },
//     { day: "Thu", hour: 14, value: 90 },
//     { day: "Fri", hour: 16, value: 30 },
//   ];

//   const appUsageData = [
//     { name: "Productive", value: 420 },
//     { name: "Neutral", value: 180 },
//     { name: "Non-Productive", value: 120 },
//   ];

//   const departmentsList = [
//     "Engineering",
//     "HR",
//     "Sales",
//     "Marketing",
//     "IT",
//     "Finance",
//     "Operations",
//   ];

//   /* ================= EXPORT CSV ================= */
//   const handleExportCSV = async () => {
//     try {
//       const res = await api.get("/reports/export", { params: filters });
//       const data = res?.data?.data || [];
//       if (!data.length) return;

//       const headers = Object.keys(data[0]);
//       const csvRows = [];

//       csvRows.push(headers.join(","));
//       for (const row of data) {
//         csvRows.push(headers.map(h => `"${row[h] ?? ""}"`).join(","));
//       }

//       const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement("a");

//       a.href = url;
//       a.download = "HRMS_Report.csv";
//       a.click();
//       window.URL.revokeObjectURL(url);

//     } catch (error) {
//       console.error("CSV Export failed:", error);
//     }
//   };

//   /* ================= EXPORT PDF ================= */
//   const handleExportPDF = async () => {
//     try {
//       const res = await api.get("/reports/export", { params: filters });
//       const data = res?.data?.data || [];
//       if (!data.length) return;

//       const doc = new jsPDF();

//       doc.setFontSize(16);
//       doc.text("HRMS Report", 14, 15);

//       doc.setFontSize(10);
//       doc.text(
//         `Department: ${filters.department} | Role: ${filters.role}`,
//         14,
//         22
//       );

//       autoTable(doc, {
//         head: [Object.keys(data[0])],
//         body: data.map(row => Object.values(row)),
//         startY: 28,
//         styles: { fontSize: 8 },
//       });

//       doc.save("HRMS_Report.pdf");

//     } catch (error) {
//       console.error("PDF Export failed:", error);
//     }
//   };

//   /* ================= PAGE ================= */
//   return (
//     <div className="min-h-screen bg-muted/40">

//       {/* HEADER */}
//       <div className="border-b bg-background px-8 py-6">
//         <div className="max-w-7xl mx-auto space-y-3">
//           <h1 className="text-3xl font-bold tracking-tight">
//             Reports & Analytics
//           </h1>
//           <p className="text-muted-foreground">
//             Enterprise Workforce Intelligence Dashboard
//           </p>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-8 py-10 space-y-20">

//         <ReportsHeader
//           filters={filters}
//           setFilters={setFilters}
//           onExportCSV={handleExportCSV}
//           onExportPDF={handleExportPDF}
//         />

//         {/* EXECUTIVE OVERVIEW */}
//         <section className="space-y-10">
//           <h2 className="text-2xl font-semibold">Executive Overview</h2>
//           <ExecutiveInsights data={reportsData?.summary} />
//           <KPISection data={reportsData?.summary} />
//         </section>

//         {/* WORKFORCE ANALYTICS */}
//         <section className="space-y-12">
//           <h2 className="text-2xl font-semibold">Workforce Analytics</h2>

//           <div className="grid xl:grid-cols-1 gap-8">
//             <WorkforceCharts
//               data={reportsData?.workforceTrend}
//               filters={filters}
//             />
//             <AttendanceCharts
//               data={reportsData?.attendanceTrend}
//               filters={filters}
//             />
//           </div>
//           <div className="grid xl:grid-cols-3 gap-4">
//             <DepartmentChart data={reportsData?.departmentDistribution} />
//             <LeavePieChart data={reportsData?.leaveBreakdown} />
//             <WorkforceHealthMeter data={reportsData?.summary} />
//           </div>
//           <div className="grid xl:grid-cols-1 gap-8">
//             <DepartmentBudgetOverview filters={filters} />
//           </div>

//           <DepartmentWorkingHours
//             data={reportsData?.departmentWorkingHours}
//           />
//         </section>

//         {/* PRODUCTIVITY INTELLIGENCE */}
//         <section className="space-y-12">
//           <h2 className="text-2xl font-semibold">
//             Productivity Intelligence
//           </h2>

//           <ProductivityKPI data={productivityData} />
//           <LiveWorkforceStatus data={liveStatusData} />

//           <div className="grid xl:grid-cols-2 gap-6">
//             <AppUsageChart data={appUsageData} />
//             <ProductivityHeatmap
//               data={heatmapData}
//               departments={departmentsList}
//               selectedDepartment={selectedDept}
//               onDepartmentChange={setSelectedDept}
//             />
//           </div>
//         </section>

//         {/* PERFORMANCE ANALYTICS */}
//         <section className="space-y-12">
//           <h2 className="text-2xl font-semibold">Performance Analytics</h2>

//           <PerformanceInsights
//             data={insightsData}
//             loading={insightsLoading}
//           />

//           <PerformanceSection
//             hook={performanceHook}
//             filters={performanceFilters}
//             setFilters={setPerformanceFilters}
//           />
//         </section>

//       </div>
//     </div>
//   );
// }
// import { useState, useEffect, useMemo } from "react";
// import api from "@/services/apiClient";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import { Loader2, Shield, AlertTriangle } from "lucide-react";

// // ─── Auth & Roles (your existing files) ──────────────────────────────────────
// import { useAuth } from "@/contexts/AuthContext";
// import { ROLES } from "@/constants/roles";
// import { REPORTS_RBAC } from "@/constants/reportsRBAC";

// // ─── Your existing report sub-components ─────────────────────────────────────
// import ReportsHeader          from "@/components/reports/ReportsHeader";
// import ExecutiveInsights      from "@/components/reports/ExecutiveInsights";
// import KPISection             from "@/components/reports/KPISection";
// import WorkforceCharts        from "@/components/reports/WorkforceCharts";
// import AttendanceCharts       from "@/components/reports/AttendanceCharts";
// import DepartmentChart        from "@/components/reports/DepartmentChart";
// import LeavePieChart          from "@/components/reports/LeavePieChart";
// import WorkforceHealthMeter   from "@/components/reports/WorkforceHealthMeter";
// import DepartmentWorkingHours from "@/components/reports/DepartmentWorkingHours";
// import PerformanceInsights    from "@/components/reports/PerformanceInsights";
// import DepartmentBudgetOverview from "@/components/reports/DepartmentBudgetOverview";
// import PerformanceSection     from "@/components/reports/PerformanceSection";
// import ProductivityKPI        from "@/components/reports/ProductivityKPI";
// import LiveWorkforceStatus    from "@/components/reports/LiveWorkforceStatus";
// import ProductivityHeatmap    from "@/components/reports/ProductivityHeatmap";
// import AppUsageChart          from "@/components/reports/AppUsageChart";

// // ─── Your existing hooks ──────────────────────────────────────────────────────
// import useReports              from "@/hooks/useReports";
// import useEmployeePerformance  from "@/hooks/useEmployeePerformance";
// import usePerformanceInsights  from "@/hooks/usePerformanceInsights";

// // ─── UI primitives ────────────────────────────────────────────────────────────
// import { Badge }  from "@/components/ui/badge";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// // ═════════════════════════════════════════════════════════════════════════════
// // RBAC — what each role can see
// // Keys match ROLES values from @/constants/roles.js
// // ═════════════════════════════════════════════════════════════════════════════
// const REPORTS_RBAC = {
//   // ── Full access ────────────────────────────────────────────────────────────
//   [ROLES.CEO]: {
//     tabs:        ["executive", "workforce", "productivity", "performance"],
//     canExport:   true,
//     scope:       "Organization",
//     level:       "Full",
//   },
//   [ROLES.COUNTRY_MANAGER]: {
//     tabs:        ["executive", "workforce", "productivity", "performance"],
//     canExport:   true,
//     scope:       "Organization",
//     level:       "Full",
//   },
//   [ROLES.HR_MANAGER]: {
//     tabs:        ["executive", "workforce", "productivity", "performance"],
//     canExport:   true,
//     scope:       "Organization",
//     level:       "Full",
//   },

//   // ── Partial access ─────────────────────────────────────────────────────────
//   [ROLES.HR_OFFICER]: {
//     tabs:        ["workforce", "performance"],
//     canExport:   false,
//     scope:       "Organization",
//     level:       "Partial",
//   },
//   [ROLES.DEPARTMENT_MANAGER]: {
//     tabs:        ["workforce", "performance"],
//     canExport:   false,
//     scope:       "Department",
//     level:       "Department Only",
//   },
//   [ROLES.DIRECT_MANAGER]: {
//     tabs:        ["workforce", "productivity"],
//     canExport:   false,
//     scope:       "Team",
//     level:       "Team Only",
//   },
//   [ROLES.OPERATIONS_MANAGER]: {
//     tabs:        ["workforce", "productivity"],
//     canExport:   false,
//     scope:       "Operations",
//     level:       "Team Only",
//   },
//   [ROLES.PROJECT_MANAGER]: {
//     tabs:        ["productivity"],
//     canExport:   false,
//     scope:       "Project Team",
//     level:       "Project Only",
//   },
//   [ROLES.CAMP_BOSS]: {
//     tabs:        ["workforce"],
//     canExport:   false,
//     scope:       "Camp",
//     level:       "Limited",
//   },

//   // ── Restricted access ──────────────────────────────────────────────────────
//   [ROLES.PAYROLL_OFFICER]: {
//     tabs:        ["workforce"],           // payroll data comes via workforce section
//     canExport:   false,
//     scope:       "Organization (Read Only)",
//     level:       "Payroll Linked",
//   },
//   [ROLES.EMPLOYEE]: {
//     tabs:        ["self"],
//     canExport:   false,
//     scope:       "Self",
//     level:       "Self Only",
//   },

//   // ── Admin — system-level, full access ─────────────────────────────────────
//   [ROLES.ADMIN]: {
//     tabs:        ["executive", "workforce", "productivity", "performance"],
//     canExport:   true,
//     scope:       "Organization",
//     level:       "System Override",
//   },
// };

// const TAB_LABELS = {
//   executive:    "Executive Overview",
//   workforce:    "Workforce Analytics",
//   productivity: "Productivity Intelligence",
//   performance:  "Performance Analytics",
//   self:         "My Analytics",
// };

// // Badge variant per level (uses your badge.jsx variants)
// const LEVEL_BADGE_VARIANT = {
//   "Full":             "success",
//   "Partial":          "warning",
//   "Self Only":        "secondary",
//   "Payroll Linked":   "secondary",
//   "Department Only":  "default",
//   "Team Only":        "default",
//   "Project Only":     "default",
//   "Limited":          "destructive",
//   "System Override":  "success",
// };

// // ═════════════════════════════════════════════════════════════════════════════
// // GUARD VIEWS
// // ═════════════════════════════════════════════════════════════════════════════
// const NoAccessView = () => (
//   <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
//     <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
//       <Shield className="w-8 h-8 text-muted-foreground" />
//     </div>
//     <h3 className="text-xl font-semibold">No Access</h3>
//     <p className="text-sm text-muted-foreground max-w-sm">
//       Your role does not have access to the Reports & Analytics module.
//       Contact your HR Manager if you believe this is an error.
//     </p>
//   </div>
// );

// const UnknownRoleView = ({ rawRole }) => (
//   <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
//     <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center">
//       <AlertTriangle className="w-8 h-8 text-amber-500" />
//     </div>
//     <h3 className="text-xl font-semibold">Role Not Recognised</h3>
//     <p className="text-sm text-muted-foreground max-w-sm">
//       Your account role{" "}
//       <span className="font-mono font-medium bg-muted px-1 rounded">"{rawRole}"</span>{" "}
//       is not configured. Contact your administrator.
//     </p>
//   </div>
// );

// // ═════════════════════════════════════════════════════════════════════════════
// // SECTION COMPONENTS
// // (each wraps your existing report sub-components, filtered by RBAC scope)
// // ═════════════════════════════════════════════════════════════════════════════

// /** Executive — CEO / HR Manager / Country Manager / Admin only */
// const ExecutiveTab = ({ reportsData }) => (
//   <section className="space-y-10">
//     <ExecutiveInsights data={reportsData?.summary} />
//     <KPISection        data={reportsData?.summary} />
//   </section>
// );

// /** Workforce — most roles, but scope differs (org / dept / team) */
// const WorkforceTab = ({ reportsData, filters }) => (
//   <section className="space-y-12">
//     <div className="grid xl:grid-cols-1 gap-8">
//       <WorkforceCharts  data={reportsData?.workforceTrend}  filters={filters} />
//       <AttendanceCharts data={reportsData?.attendanceTrend} filters={filters} />
//     </div>
//     <div className="grid xl:grid-cols-3 gap-4">
//       <DepartmentChart      data={reportsData?.departmentDistribution} />
//       <LeavePieChart        data={reportsData?.leaveBreakdown} />
//       <WorkforceHealthMeter data={reportsData?.summary} />
//     </div>
//     <DepartmentBudgetOverview filters={filters} />
//     <DepartmentWorkingHours   data={reportsData?.departmentWorkingHours} />
//   </section>
// );

// /** Productivity — managers + direct managers */
// const ProductivityTab = ({ selectedDept, setSelectedDept }) => {
//   const productivityData = {
//     totalActiveHours: 128,
//     idleHours: 22,
//     focusScore: 82,
//     distractionIndex: 18,
//   };
//   const liveStatusData = { active: 42, idle: 8, away: 5, totalOnline: 55 };
//   const heatmapData = [
//     { day: "Mon", hour: 8,  value: 65 },
//     { day: "Mon", hour: 9,  value: 85 },
//     { day: "Tue", hour: 10, value: 72 },
//     { day: "Wed", hour: 11, value: 45 },
//     { day: "Thu", hour: 14, value: 90 },
//     { day: "Fri", hour: 16, value: 30 },
//   ];
//   const appUsageData = [
//     { name: "Productive",     value: 420 },
//     { name: "Neutral",        value: 180 },
//     { name: "Non-Productive", value: 120 },
//   ];
//   const departmentsList = ["Engineering","HR","Sales","Marketing","IT","Finance","Operations"];

//   return (
//     <section className="space-y-12">
//       <ProductivityKPI      data={productivityData} />
//       <LiveWorkforceStatus  data={liveStatusData} />
//       <div className="grid xl:grid-cols-2 gap-6">
//         <AppUsageChart data={appUsageData} />
//         <ProductivityHeatmap
//           data={heatmapData}
//           departments={departmentsList}
//           selectedDepartment={selectedDept}
//           onDepartmentChange={setSelectedDept}
//         />
//       </div>
//     </section>
//   );
// };

// /** Performance — HR roles + dept/direct managers */
// const PerformanceTab = ({
//   insightsData, insightsLoading,
//   performanceHook, performanceFilters, setPerformanceFilters,
// }) => (
//   <section className="space-y-12">
//     <PerformanceInsights
//       data={insightsData}
//       loading={insightsLoading}
//     />
//     <PerformanceSection
//       hook={performanceHook}
//       filters={performanceFilters}
//       setFilters={setPerformanceFilters}
//     />
//   </section>
// );

// /** Self — Employee only */
// const SelfTab = ({ reportsData, insightsData, insightsLoading }) => (
//   <section className="space-y-12">
//     <KPISection data={reportsData?.summary} />
//     <PerformanceInsights data={insightsData} loading={insightsLoading} />
//   </section>
// );

// // ═════════════════════════════════════════════════════════════════════════════
// // ROLE BADGE STRIP
// // ═════════════════════════════════════════════════════════════════════════════
// const RoleBadgeStrip = ({ rbac, rawRole }) => (
//   <div className="flex flex-wrap items-center gap-2 mb-6">
//     <Badge variant="outline" className="font-mono text-xs">{rawRole}</Badge>
//     <Badge variant={LEVEL_BADGE_VARIANT[rbac.level] || "secondary"}>
//       {rbac.level}
//     </Badge>
//     <Badge variant="outline">Scope: {rbac.scope}</Badge>
//     {rbac.canExport && (
//       <Badge variant="success">✓ Export Enabled</Badge>
//     )}
//   </div>
// );

// // ═════════════════════════════════════════════════════════════════════════════
// // MAIN PAGE
// // ═════════════════════════════════════════════════════════════════════════════
// export default function ReportsPage() {

//   // ── Auth ─────────────────────────────────────────────────────────────────
//   const { user } = useAuth();

//   // Extract role string the same way RoleBasedRoute does
//   const rawRole = typeof user?.role === "string"
//     ? user.role
//     : user?.role?.name || "";

//   // Look up RBAC config for this role
//   const rbac = useMemo(() => REPORTS_RBAC[rawRole] ?? null, [rawRole]);

//   // ── Global filters ────────────────────────────────────────────────────────
//   const [filters, setFilters] = useState({
//     period:     "3m",
//     startDate:  "",
//     endDate:    "",
//     department: "all",
//     role:       "all",
//   });

//   // ── Data hooks (your existing useReports) ─────────────────────────────────
//   const {
//     data:    reportsData,
//     loading: reportsLoading,
//     error:   reportsError,
//   } = useReports(filters);

//   const {
//     data:    insightsData,
//     loading: insightsLoading,
//   } = usePerformanceInsights(filters);

//   // ── Performance table filters ─────────────────────────────────────────────
//   const [performanceFilters, setPerformanceFilters] = useState({
//     role:       "all",
//     department: "all",
//     search:     "",
//     page:       1,
//     limit:      10,
//   });

//   useEffect(() => {
//     setPerformanceFilters((prev) => ({
//       ...prev,
//       role:       filters.role,
//       department: filters.department,
//       page:       1,
//     }));
//   }, [filters.role, filters.department]);

//   const performanceHook = useEmployeePerformance(performanceFilters);

//   // ── Productivity local state ───────────────────────────────────────────────
//   const [selectedDept, setSelectedDept] = useState("all");

//   // ── Export handlers (your existing logic) ─────────────────────────────────
//   const handleExportCSV = async () => {
//     if (!rbac?.canExport) return;
//     try {
//       const res  = await api.get("/reports/export", { params: filters });
//       const data = res?.data?.data || [];
//       if (!data.length) return;

//       const headers = Object.keys(data[0]);
//       const rows    = [headers.join(",")];
//       for (const row of data) {
//         rows.push(headers.map((h) => `"${row[h] ?? ""}"`).join(","));
//       }

//       const blob = new Blob([rows.join("\n")], { type: "text/csv" });
//       const url  = window.URL.createObjectURL(blob);
//       const a    = document.createElement("a");
//       a.href     = url;
//       a.download = "HRMS_Report.csv";
//       a.click();
//       window.URL.revokeObjectURL(url);
//     } catch (err) {
//       console.error("CSV export failed:", err);
//     }
//   };

//   const handleExportPDF = async () => {
//     if (!rbac?.canExport) return;
//     try {
//       const res  = await api.get("/reports/export", { params: filters });
//       const data = res?.data?.data || [];
//       if (!data.length) return;

//       const doc = new jsPDF();
//       doc.setFontSize(16);
//       doc.text("HRMS Report", 14, 15);
//       doc.setFontSize(10);
//       doc.text(`Department: ${filters.department} | Role: ${filters.role}`, 14, 22);

//       autoTable(doc, {
//         head:    [Object.keys(data[0])],
//         body:    data.map((row) => Object.values(row)),
//         startY:  28,
//         styles:  { fontSize: 8 },
//       });

//       doc.save("HRMS_Report.pdf");
//     } catch (err) {
//       console.error("PDF export failed:", err);
//     }
//   };

//   // ── Loading guard ─────────────────────────────────────────────────────────
//   if (!user) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="text-center space-y-4">
//           <Loader2 className="h-10 w-10 animate-spin text-blue-600 mx-auto" />
//           <p className="text-sm text-muted-foreground">Loading profile…</p>
//         </div>
//       </div>
//     );
//   }

//   // ── Unknown role guard ────────────────────────────────────────────────────
//   if (!rbac) return <UnknownRoleView rawRole={rawRole} />;

//   // ── No tabs = no access (e.g. future role with empty tabs) ────────────────
//   if (!rbac.tabs.length) return <NoAccessView />;

//   // ═════════════════════════════════════════════════════════════════════════
//   // RENDER
//   // ═════════════════════════════════════════════════════════════════════════
//   return (
//     <div className="min-h-screen bg-muted/40">

//       {/* ── Page header ── */}
//       <div className="border-b bg-background px-8 py-6">
//         <div className="max-w-7xl mx-auto space-y-1">
//           <h1 className="text-3xl font-bold tracking-tight">
//             Reports & Analytics
//           </h1>
//           <p className="text-muted-foreground">
//             Enterprise Workforce Intelligence Dashboard
//           </p>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-8 py-8 space-y-8">

//         {/* ── Role badge strip ── */}
//         <RoleBadgeStrip rbac={rbac} rawRole={rawRole} />

//         {/* ── Filters header (your existing ReportsHeader) ── */}
//         <ReportsHeader
//           filters={filters}
//           setFilters={setFilters}
//           onExportCSV={rbac.canExport ? handleExportCSV : undefined}
//           onExportPDF={rbac.canExport ? handleExportPDF : undefined}
//           canExport={rbac.canExport}
//         />

//         {/* ── Single tab — no tab bar needed ── */}
//         {rbac.tabs.length === 1 && (
//           <div className="space-y-12">
//             {rbac.tabs[0] === "executive" && (
//               <ExecutiveTab reportsData={reportsData} />
//             )}
//             {rbac.tabs[0] === "workforce" && (
//               <WorkforceTab reportsData={reportsData} filters={filters} />
//             )}
//             {rbac.tabs[0] === "productivity" && (
//               <ProductivityTab
//                 selectedDept={selectedDept}
//                 setSelectedDept={setSelectedDept}
//               />
//             )}
//             {rbac.tabs[0] === "performance" && (
//               <PerformanceTab
//                 insightsData={insightsData}
//                 insightsLoading={insightsLoading}
//                 performanceHook={performanceHook}
//                 performanceFilters={performanceFilters}
//                 setPerformanceFilters={setPerformanceFilters}
//               />
//             )}
//             {rbac.tabs[0] === "self" && (
//               <SelfTab
//                 reportsData={reportsData}
//                 insightsData={insightsData}
//                 insightsLoading={insightsLoading}
//               />
//             )}
//           </div>
//         )}

//         {/* ── Multiple tabs — use Tabs from your tabs.jsx ── */}
//         {rbac.tabs.length > 1 && (
//           <Tabs defaultValue={rbac.tabs[0]} className="w-full">

//             <TabsList className="mb-8 flex-wrap h-auto gap-1">
//               {rbac.tabs.map((tab) => (
//                 <TabsTrigger key={tab} value={tab}>
//                   {TAB_LABELS[tab]}
//                 </TabsTrigger>
//               ))}
//             </TabsList>

//             {rbac.tabs.includes("executive") && (
//               <TabsContent value="executive">
//                 <ExecutiveTab reportsData={reportsData} />
//               </TabsContent>
//             )}

//             {rbac.tabs.includes("workforce") && (
//               <TabsContent value="workforce">
//                 <WorkforceTab reportsData={reportsData} filters={filters} />
//               </TabsContent>
//             )}

//             {rbac.tabs.includes("productivity") && (
//               <TabsContent value="productivity">
//                 <ProductivityTab
//                   selectedDept={selectedDept}
//                   setSelectedDept={setSelectedDept}
//                 />
//               </TabsContent>
//             )}

//             {rbac.tabs.includes("performance") && (
//               <TabsContent value="performance">
//                 <PerformanceTab
//                   insightsData={insightsData}
//                   insightsLoading={insightsLoading}
//                   performanceHook={performanceHook}
//                   performanceFilters={performanceFilters}
//                   setPerformanceFilters={setPerformanceFilters}
//                 />
//               </TabsContent>
//             )}

//             {rbac.tabs.includes("self") && (
//               <TabsContent value="self">
//                 <SelfTab
//                   reportsData={reportsData}
//                   insightsData={insightsData}
//                   insightsLoading={insightsLoading}
//                 />
//               </TabsContent>
//             )}

//           </Tabs>
//         )}

//       </div>
//     </div>
//   );
// }

// import { useState, useEffect, useMemo } from "react";
// import { Loader2 } from "lucide-react";

// import { useAuth } from "@/contexts/AuthContext";
// import { ROLES } from "@/constants/roles";
// import { REPORTS_RBAC } from "@/constants/reportsRBAC";

// import api from "@/services/apiClient";

// import ReportsHeader from "@/components/reports/ReportsHeader";
// import ExecutiveInsights from "@/components/reports/ExecutiveInsights";
// import KPISection from "@/components/reports/KPISection";
// import WorkforceCharts from "@/components/reports/WorkforceCharts";
// import AttendanceCharts from "@/components/reports/AttendanceCharts";
// import DepartmentChart from "@/components/reports/DepartmentChart";
// import LeavePieChart from "@/components/reports/LeavePieChart";
// import WorkforceHealthMeter from "@/components/reports/WorkforceHealthMeter";
// import DepartmentWorkingHours from "@/components/reports/DepartmentWorkingHours";
// import PerformanceInsights from "@/components/reports/PerformanceInsights";
// import DepartmentBudgetOverview from "@/components/reports/DepartmentBudgetOverview";
// import PerformanceSection from "@/components/reports/PerformanceSection";
// import ProductivityKPI from "@/components/reports/ProductivityKPI";
// import LiveWorkforceStatus from "@/components/reports/LiveWorkforceStatus";
// import ProductivityHeatmap from "@/components/reports/ProductivityHeatmap";
// import AppUsageChart from "@/components/reports/AppUsageChart";

// import useReports from "@/hooks/useReports";
// import useEmployeePerformance from "@/hooks/useEmployeePerformance";
// import usePerformanceInsights from "@/hooks/usePerformanceInsights";

// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// export default function ReportsPage() {

//   const { user } = useAuth();

//   /* =============================
//      ROLE NORMALIZATION
//   ============================== */
//   const rawRole = typeof user?.role === "string"
//     ? user.role
//     : user?.role?.name || "";

//   const roleKey = rawRole?.toUpperCase().replace(/\s+/g, "_");

//   const rbac = useMemo(() => REPORTS_RBAC[roleKey] ?? null, [roleKey]);

//   /* =============================
//      GLOBAL FILTERS
//   ============================== */
//   const [filters, setFilters] = useState({
//     period: "3m",
//     startDate: "",
//     endDate: "",
//     department: "all",
//     role: "all",
//     page: 1
//   });

//   /* =============================
//      REPORT DATA
//   ============================== */
//   const {
//     data: reportsData,
//     loading: reportsLoading,
//     error: reportsError
//   } = useReports(filters);

//   const {
//     data: insightsData,
//     loading: insightsLoading
//   } = usePerformanceInsights(filters);

//   /* =============================
//      PERFORMANCE TABLE FILTERS
//   ============================== */
//   const [performanceFilters, setPerformanceFilters] = useState({
//     role: "all",
//     department: "all",
//     search: "",
//     page: 1,
//     limit: 10
//   });

//   useEffect(() => {
//     setPerformanceFilters(prev => ({
//       ...prev,
//       role: filters.role,
//       department: filters.department,
//       page: 1
//     }));
//   }, [filters.role, filters.department]);

//   const performanceHook = useEmployeePerformance(performanceFilters);

//   /* =============================
//      PRODUCTIVITY STATE
//   ============================== */
//   const [selectedDept, setSelectedDept] = useState("all");

//   /* =============================
//      EXPORT FUNCTIONS
//   ============================== */
//   const handleExportCSV = async () => {

//     if (!rbac?.canExport) return;

//     try {

//       const res = await api.get("/reports/export", {
//         params: { ...filters, type: "csv" },
//         responseType: "blob"
//       });

//       const blob = new Blob([res.data]);
//       const url = window.URL.createObjectURL(blob);

//       const link = document.createElement("a");
//       link.href = url;
//       link.download = "reports.csv";
//       link.click();

//       window.URL.revokeObjectURL(url);

//     } catch (error) {
//       console.error("CSV export failed", error);
//     }
//   };

//   const handleExportPDF = async () => {

//     if (!rbac?.canExport) return;

//     try {

//       const res = await api.get("/reports/export", {
//         params: { ...filters, type: "pdf" },
//         responseType: "blob"
//       });

//       const blob = new Blob([res.data]);
//       const url = window.URL.createObjectURL(blob);

//       const link = document.createElement("a");
//       link.href = url;
//       link.download = "reports.pdf";
//       link.click();

//       window.URL.revokeObjectURL(url);

//     } catch (error) {
//       console.error("PDF export failed", error);
//     }
//   };

//   /* =============================
//      LOADING STATE
//   ============================== */
//   if (!user) {

//     return (
//       <div className="flex items-center justify-center h-screen">
//         <Loader2 className="animate-spin w-8 h-8" />
//       </div>
//     );
//   }

//   if (!rbac) {

//     return (
//       <div className="flex items-center justify-center py-40 text-center">
//         Role not configured for Reports
//       </div>
//     );
//   }

//   if (reportsLoading) {

//     return (
//       <div className="flex items-center justify-center py-40">
//         <Loader2 className="animate-spin w-8 h-8" />
//       </div>
//     );
//   }

//   if (reportsError) {

//     return (
//       <div className="text-center py-40 text-red-500">
//         Failed to load reports data
//       </div>
//     );
//   }

//   /* =============================
//      RENDER
//   ============================== */

//   return (

//     <div className="min-h-screen bg-muted/40">

//       <div className="border-b bg-background px-8 py-6">
//         <h1 className="text-3xl font-bold">
//           Reports & Analytics
//         </h1>
//         <p className="text-muted-foreground">
//           Enterprise Workforce Intelligence Dashboard
//         </p>
//       </div>

//       <div className="max-w-7xl mx-auto px-8 py-8 space-y-8">

//         <ReportsHeader
//           filters={filters}
//           setFilters={setFilters}
//           onExportCSV={handleExportCSV}
//           onExportPDF={handleExportPDF}
//           canExport={rbac.canExport}
//         />

//         <Tabs defaultValue={rbac.tabs[0]}>

//           <TabsList className="mb-8">

//             {rbac.tabs.map(tab => (
//               <TabsTrigger key={tab} value={tab}>
//                 {tab}
//               </TabsTrigger>
//             ))}

//           </TabsList>

//           {rbac.tabs.includes("executive") && (

//             <TabsContent value="executive">

//               <ExecutiveInsights data={reportsData?.summary} />
//               <KPISection data={reportsData?.summary} />

//             </TabsContent>

//           )}

//           {rbac.tabs.includes("workforce") && (

//             <TabsContent value="workforce">

//               <WorkforceCharts data={reportsData?.workforceTrend} filters={filters} />

//               <AttendanceCharts data={reportsData?.attendanceTrend} filters={filters} />

//               <DepartmentChart data={reportsData?.departmentDistribution} />

//               <LeavePieChart data={reportsData?.leaveBreakdown} />

//               <WorkforceHealthMeter data={reportsData?.summary} />

//               <DepartmentBudgetOverview filters={filters} />

//               <DepartmentWorkingHours data={reportsData?.departmentWorkingHours} />

//             </TabsContent>

//           )}

//           {rbac.tabs.includes("productivity") && (

//             <TabsContent value="productivity">

//               <ProductivityKPI />

//               <LiveWorkforceStatus />

//               <div className="grid xl:grid-cols-2 gap-6">

//                 <AppUsageChart />

//                 <ProductivityHeatmap
//                   selectedDepartment={selectedDept}
//                   onDepartmentChange={setSelectedDept}
//                 />

//               </div>

//             </TabsContent>

//           )}

//           {rbac.tabs.includes("performance") && (

//             <TabsContent value="performance">

//               <PerformanceInsights
//                 data={insightsData}
//                 loading={insightsLoading}
//               />

//               <PerformanceSection
//                 hook={performanceHook}
//                 filters={performanceFilters}
//                 setFilters={setPerformanceFilters}
//               />

//             </TabsContent>

//           )}

//         </Tabs>

//       </div>

//     </div>

//   );
// }

// import { useState, useEffect, useMemo } from "react";
// import { Loader2 } from "lucide-react";

// import { useAuth } from "@/contexts/AuthContext";
// import { REPORTS_RBAC } from "@/constants/reportsRBAC";

// import api from "@/services/apiClient";

// import ReportsHeader from "@/components/reports/ReportsHeader";
// import ExecutiveInsights from "@/components/reports/ExecutiveInsights";
// import KPISection from "@/components/reports/KPISection";
// import WorkforceCharts from "@/components/reports/WorkforceCharts";
// import AttendanceCharts from "@/components/reports/AttendanceCharts";
// import DepartmentChart from "@/components/reports/DepartmentChart";
// import LeavePieChart from "@/components/reports/LeavePieChart";
// import WorkforceHealthMeter from "@/components/reports/WorkforceHealthMeter";
// import DepartmentWorkingHours from "@/components/reports/DepartmentWorkingHours";
// import DepartmentBudgetOverview from "@/components/reports/DepartmentBudgetOverview";

// import PerformanceInsights from "@/components/reports/PerformanceInsights";
// import PerformanceSection from "@/components/reports/PerformanceSection";

// import ProductivityKPI from "@/components/reports/ProductivityKPI";
// import LiveWorkforceStatus from "@/components/reports/LiveWorkforceStatus";
// import ProductivityHeatmap from "@/components/reports/ProductivityHeatmap";
// import AppUsageChart from "@/components/reports/AppUsageChart";

// import useReports from "@/hooks/useReports";
// import useEmployeePerformance from "@/hooks/useEmployeePerformance";
// import usePerformanceInsights from "@/hooks/usePerformanceInsights";

// import {
//   Tabs,
//   TabsList,
//   TabsTrigger,
//   TabsContent,
// } from "@/components/ui/tabs";

// export default function ReportsPage() {

//   const { user } = useAuth();

//   /* ==============================
//      ROLE NORMALIZATION
//   =============================== */

//   const rawRole =
//     typeof user?.role === "string"
//       ? user.role
//       : user?.role?.name || "";

//   const roleKey = rawRole?.toUpperCase().replace(/\s+/g, "_");

//   const rbac = useMemo(
//     () => REPORTS_RBAC[roleKey] ?? null,
//     [roleKey]
//   );

//   /* ==============================
//      GLOBAL FILTERS
//   =============================== */

//   const [filters, setFilters] = useState({
//     period: "3m",
//     startDate: "",
//     endDate: "",
//     department: "all",
//     role: "all",
//     page: 1,
//   });

//   /* ==============================
//      REPORT DATA
//   =============================== */

//   const {
//     data: reportsData,
//     loading: reportsLoading,
//     error: reportsError,
//   } = useReports(filters);

//   const {
//     data: insightsData,
//     loading: insightsLoading,
//   } = usePerformanceInsights(filters);

//   /* ==============================
//      PERFORMANCE FILTERS
//   =============================== */

//   const [performanceFilters, setPerformanceFilters] =
//     useState({
//       role: "all",
//       department: "all",
//       search: "",
//       page: 1,
//       limit: 10,
//     });

//   useEffect(() => {
//     setPerformanceFilters((prev) => ({
//       ...prev,
//       role: filters.role,
//       department: filters.department,
//       page: 1,
//     }));
//   }, [filters.role, filters.department]);

//   const performanceHook =
//     useEmployeePerformance(performanceFilters);

//   /* ==============================
//      PRODUCTIVITY STATE
//   =============================== */

//   const [selectedDept, setSelectedDept] =
//     useState("all");

//   /* ==============================
//      EXPORT FUNCTIONS
//   =============================== */

//   const handleExport = async (type) => {

//     if (!rbac?.canExport) return;

//     try {

//       const res = await api.get("/reports/export", {
//         params: { ...filters, type },
//         responseType: "blob",
//       });

//       const blob = new Blob([res.data]);
//       const url = window.URL.createObjectURL(blob);

//       const link = document.createElement("a");
//       link.href = url;
//       link.download =
//         type === "csv"
//           ? "reports.csv"
//           : "reports.pdf";

//       link.click();
//       window.URL.revokeObjectURL(url);

//     } catch (error) {

//       console.error("Export failed:", error);

//     }
//   };

//   /* ==============================
//      GUARDS
//   =============================== */

//   if (!user) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <Loader2 className="animate-spin w-8 h-8" />
//       </div>
//     );
//   }

//   if (!rbac) {
//     return (
//       <div className="flex items-center justify-center py-40 text-center text-muted-foreground">
//         Role not configured for Reports
//       </div>
//     );
//   }

//   if (reportsLoading) {
//     return (
//       <div className="flex items-center justify-center py-40">
//         <Loader2 className="animate-spin w-8 h-8" />
//       </div>
//     );
//   }

//   if (reportsError) {
//     return (
//       <div className="text-center py-40 text-red-500">
//         Failed to load reports data
//       </div>
//     );
//   }

//   /* ==============================
//      RENDER
//   =============================== */

//   return (
//     <div className="min-h-screen bg-muted/40">

//       {/* Page Header */}

//       <div className="border-b bg-background px-8 py-6">
//         <h1 className="text-3xl font-bold">
//           Reports & Analytics
//         </h1>

//         <p className="text-muted-foreground">
//           Enterprise Workforce Intelligence Dashboard
//         </p>
//       </div>

//       <div className="max-w-7xl mx-auto px-8 py-8 space-y-8">

//         {/* Filters + Export */}

//         <ReportsHeader
//           filters={filters}
//           setFilters={setFilters}
//           onExportCSV={() => handleExport("csv")}
//           onExportPDF={() => handleExport("pdf")}
//           canExport={rbac.canExport}
//         />

//         {/* Tabs */}

//         <Tabs
//           defaultValue={rbac.tabs[0]}
//           className="space-y-6"
//         >

//           <TabsList className="grid grid-cols-4 w-full max-w-xl">

//             {rbac.tabs.map((tab) => (
//               <TabsTrigger key={tab} value={tab}>
//                 {tab}
//               </TabsTrigger>
//             ))}

//           </TabsList>

//           {/* EXECUTIVE */}

//           {rbac.tabs.includes("executive") && (

//             <TabsContent value="executive" className="space-y-8">

//               <ExecutiveInsights
//                 data={reportsData?.summary}
//               />

//               <KPISection
//                 data={reportsData?.summary}
//               />

//             </TabsContent>

//           )}

//           {/* WORKFORCE */}

//           {rbac.tabs.includes("workforce") && (

//             <TabsContent value="workforce" className="space-y-8">

//               <WorkforceCharts
//                 data={reportsData?.workforceTrend}
//                 filters={filters}
//               />

//               <AttendanceCharts
//                 data={reportsData?.attendanceTrend}
//                 filters={filters}
//               />

//               <div className="grid lg:grid-cols-3 gap-6">

//                 <DepartmentChart
//                   data={
//                     reportsData?.departmentDistribution
//                   }
//                 />

//                 <LeavePieChart
//                   data={reportsData?.leaveBreakdown}
//                 />

//                 <WorkforceHealthMeter
//                   data={reportsData?.summary}
//                 />

//               </div>

//               <DepartmentBudgetOverview
//                 filters={filters}
//               />

//               <DepartmentWorkingHours
//                 data={
//                   reportsData?.departmentWorkingHours
//                 }
//               />

//             </TabsContent>

//           )}

//           {/* PRODUCTIVITY */}

//           {rbac.tabs.includes("productivity") && (

//             <TabsContent value="productivity" className="space-y-8">

//               <ProductivityKPI />

//               <LiveWorkforceStatus />

//               <div className="grid lg:grid-cols-2 gap-6">

//                 <AppUsageChart />

//                 <ProductivityHeatmap
//                   selectedDepartment={selectedDept}
//                   onDepartmentChange={setSelectedDept}
//                 />

//               </div>

//             </TabsContent>

//           )}

//           {/* PERFORMANCE */}

//           {rbac.tabs.includes("performance") && (

//             <TabsContent value="performance" className="space-y-8">

//               <PerformanceInsights
//                 data={insightsData}
//                 loading={insightsLoading}
//               />

//               <PerformanceSection
//                 hook={performanceHook}
//                 filters={performanceFilters}
//                 setFilters={setPerformanceFilters}
//               />

//             </TabsContent>

//           )}

//         </Tabs>

//       </div>

//     </div>
//   );
// }

//final
// import { useState, useEffect, useMemo, useCallback } from "react";
// import { Loader2 } from "lucide-react";

// import { useAuth } from "@/contexts/AuthContext";
// import { REPORTS_RBAC } from "@/constants/reportsRBAC";

// import api from "@/services/apiClient";

// import ReportsHeader from "@/components/reports/ReportsHeader";

// import ExecutiveInsights from "@/components/reports/ExecutiveInsights";
// import KPISection from "@/components/reports/KPISection";

// import WorkforceCharts from "@/components/reports/WorkforceCharts";
// import AttendanceCharts from "@/components/reports/AttendanceCharts";
// import DepartmentChart from "@/components/reports/DepartmentChart";
// import LeavePieChart from "@/components/reports/LeavePieChart";
// import WorkforceHealthMeter from "@/components/reports/WorkforceHealthMeter";
// import DepartmentWorkingHours from "@/components/reports/DepartmentWorkingHours";
// import DepartmentBudgetOverview from "@/components/reports/DepartmentBudgetOverview";

// import PerformanceInsights from "@/components/reports/PerformanceInsights";
// import PerformanceSection from "@/components/reports/PerformanceSection";

// import ProductivityKPI from "@/components/reports/ProductivityKPI";
// import LiveWorkforceStatus from "@/components/reports/LiveWorkforceStatus";
// import ProductivityHeatmap from "@/components/reports/ProductivityHeatmap";
// import AppUsageChart from "@/components/reports/AppUsageChart";

// import useReports from "@/hooks/useReports";
// import useEmployeePerformance from "@/hooks/useEmployeePerformance";
// import usePerformanceInsights from "@/hooks/usePerformanceInsights";

// import {
//   Tabs,
//   TabsList,
//   TabsTrigger,
//   TabsContent,
// } from "@/components/ui/tabs";

// export default function ReportsPage() {

//   const { user } = useAuth();

//   /* =========================================================
//      ROLE NORMALIZATION
//   ========================================================= */

//   const roleKey = useMemo(() => {

//     const rawRole =
//       typeof user?.role === "string"
//         ? user.role
//         : user?.role?.name || "";

//     return rawRole.toUpperCase().replace(/\s+/g, "_");

//   }, [user]);

//   const rbac = useMemo(
//     () => REPORTS_RBAC[roleKey] ?? null,
//     [roleKey]
//   );

//   /* =========================================================
//      GLOBAL FILTERS
//   ========================================================= */

//   const [filters, setFilters] = useState({
//     period: "3m",
//     startDate: "",
//     endDate: "",
//     department: "all",
//     role: "all",
//     page: 1,
//   });

//   /* =========================================================
//      MEMOIZED FILTERS (PREVENT API SPAM)
//   ========================================================= */

//   const stableFilters = useMemo(
//     () => ({ ...filters }),
//     [
//       filters.period,
//       filters.startDate,
//       filters.endDate,
//       filters.department,
//       filters.role,
//       filters.page,
//     ]
//   );

//   /* =========================================================
//      REPORT DATA
//   ========================================================= */

//   const {
//     data: reportsData,
//     loading: reportsLoading,
//     error: reportsError,
//   } = useReports(stableFilters);

//   const {
//     data: insightsData,
//     loading: insightsLoading,
//   } = usePerformanceInsights(stableFilters);

//   /* =========================================================
//      PERFORMANCE FILTERS
//   ========================================================= */

//   const [performanceFilters, setPerformanceFilters] =
//     useState({
//       role: "all",
//       department: "all",
//       search: "",
//       page: 1,
//       limit: 10,
//     });

//   useEffect(() => {

//     setPerformanceFilters((prev) => ({
//       ...prev,
//       role: filters.role,
//       department: filters.department,
//       page: 1,
//     }));

//   }, [filters.role, filters.department]);

//   const performanceHook =
//     useEmployeePerformance(performanceFilters);

//   /* =========================================================
//      PRODUCTIVITY STATE
//   ========================================================= */

//   const [selectedDept, setSelectedDept] =
//     useState("all");

//   /* =========================================================
//      EXPORT HANDLER
//   ========================================================= */

//   const handleExport = useCallback(async (type) => {

//     if (!rbac?.canExport) return;

//     try {

//       const res = await api.get("/reports/export", {
//         params: { ...filters, type },
//         responseType: "blob",
//       });

//       const blob = new Blob([res.data]);

//       const url = window.URL.createObjectURL(blob);

//       const link = document.createElement("a");

//       link.href = url;
//       link.download =
//         type === "csv"
//           ? "reports.csv"
//           : "reports.pdf";

//       link.click();

//       window.URL.revokeObjectURL(url);

//     } catch (error) {

//       console.error("Export failed:", error);

//     }

//   }, [filters, rbac]);

//   /* =========================================================
//      GUARDS
//   ========================================================= */

//   if (!user) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <Loader2 className="animate-spin w-8 h-8" />
//       </div>
//     );
//   }

//   if (!rbac) {
//     return (
//       <div className="flex items-center justify-center py-40 text-muted-foreground">
//         Role not configured for Reports
//       </div>
//     );
//   }

//   if (reportsLoading) {
//     return (
//       <div className="flex items-center justify-center py-40">
//         <Loader2 className="animate-spin w-8 h-8" />
//       </div>
//     );
//   }

//   if (reportsError) {
//     return (
//       <div className="text-center py-40 text-red-500">
//         Failed to load reports data
//       </div>
//     );
//   }

//   /* =========================================================
//      DEFAULT TAB
//   ========================================================= */

//   const defaultTab = rbac.tabs?.[0] || "executive";

//   /* =========================================================
//      RENDER
//   ========================================================= */

//   return (

//     <div className="min-h-screen bg-muted/40">

//       {/* PAGE HEADER */}

//       <div className="border-b bg-background px-8 py-6">

//         <h1 className="text-3xl font-bold">
//           Reports & Analytics
//         </h1>

//         <p className="text-muted-foreground">
//           Enterprise Workforce Intelligence Dashboard
//         </p>

//       </div>

//       <div className="max-w-7xl mx-auto px-8 py-8 space-y-8">

//         {/* FILTERS */}

//         <ReportsHeader
//           filters={filters}
//           setFilters={setFilters}
//           onExportCSV={() => handleExport("csv")}
//           onExportPDF={() => handleExport("pdf")}
//           canExport={rbac.canExport}
//         />

//         {/* TABS */}

//         <Tabs
//           defaultValue={defaultTab}
//           className="space-y-6"
//         >

//           <TabsList className="grid grid-cols-4 w-full max-w-xl">

//             {rbac.tabs.map((tab) => (
//               <TabsTrigger key={tab} value={tab}>
//                 {tab}
//               </TabsTrigger>
//             ))}

//           </TabsList>

//           {/* EXECUTIVE */}

//           <TabsContent value="executive" className="space-y-8">

//             <ExecutiveInsights
//               data={reportsData?.summary}
//             />

//             <KPISection
//               data={reportsData?.summary}
//             />

//           </TabsContent>

//           {/* WORKFORCE */}

//           <TabsContent value="workforce" className="space-y-8">

//             <WorkforceCharts
//               data={reportsData?.workforceTrend}
//               filters={filters}
//             />

//             <AttendanceCharts
//               data={reportsData?.attendanceTrend}
//               filters={filters}
//             />

//             <div className="grid lg:grid-cols-3 gap-6">

//               <DepartmentChart
//                 data={reportsData?.departmentDistribution}
//               />

//               <LeavePieChart
//                 data={reportsData?.leaveBreakdown}
//               />

//               <WorkforceHealthMeter
//                 data={reportsData?.summary}
//               />

//             </div>

//             <DepartmentBudgetOverview
//               filters={filters}
//             />

//             <DepartmentWorkingHours
//               data={reportsData?.departmentWorkingHours}
//             />

//           </TabsContent>

//           {/* PRODUCTIVITY */}

//           <TabsContent value="productivity" className="space-y-8">

//             <ProductivityKPI />

//             <LiveWorkforceStatus />

//             <div className="grid lg:grid-cols-2 gap-6">

//               <AppUsageChart />

//               <ProductivityHeatmap
//                 selectedDepartment={selectedDept}
//                 onDepartmentChange={setSelectedDept}
//               />

//             </div>

//           </TabsContent>

//           {/* PERFORMANCE */}

//           <TabsContent value="performance" className="space-y-8">

//             <PerformanceInsights
//               data={insightsData}
//               loading={insightsLoading}
//             />

//             <PerformanceSection
//               hook={performanceHook}
//               filters={performanceFilters}
//               setFilters={setPerformanceFilters}
//             />

//           </TabsContent>

//         </Tabs>

//       </div>

//     </div>

//   );

// }

import { useState, useEffect, useMemo } from "react";
import { Loader2 } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { REPORTS_RBAC } from "@/constants/reportsRBAC";

import api from "@/services/apiClient";

import ReportsHeader from "@/components/reports/ReportsHeader";
import ExecutiveInsights from "@/components/reports/ExecutiveInsights";
import KPISection from "@/components/reports/KPISection";
import WorkforceCharts from "@/components/reports/WorkforceCharts";
import AttendanceCharts from "@/components/reports/AttendanceCharts";
import DepartmentChart from "@/components/reports/DepartmentChart";
import LeavePieChart from "@/components/reports/LeavePieChart";
import WorkforceHealthMeter from "@/components/reports/WorkforceHealthMeter";
import DepartmentWorkingHours from "@/components/reports/DepartmentWorkingHours";
import DepartmentBudgetOverview from "@/components/reports/DepartmentBudgetOverview";

import PerformanceInsights from "@/components/reports/PerformanceInsights";
import PerformanceSection from "@/components/reports/PerformanceSection";

import ProductivityKPI from "@/components/reports/ProductivityKPI";
import LiveWorkforceStatus from "@/components/reports/LiveWorkforceStatus";
import ProductivityHeatmap from "@/components/reports/ProductivityHeatmap";
import AppUsageChart from "@/components/reports/AppUsageChart";

import useReports from "@/hooks/useReports";
import useEmployeePerformance from "@/hooks/useEmployeePerformance";
import usePerformanceInsights from "@/hooks/usePerformanceInsights";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

export default function ReportsPage() {

  const { user } = useAuth();

  /* ==============================
     ROLE NORMALIZATION
  ============================== */

  const rawRole =
    typeof user?.role === "string"
      ? user.role
      : user?.role?.name || "";

  const roleKey = rawRole?.toUpperCase().replace(/\s+/g, "_");

  const rbac = useMemo(
    () => REPORTS_RBAC[roleKey] ?? null,
    [roleKey]
  );

  /* ==============================
     GLOBAL FILTERS
  ============================== */

  const [filters, setFilters] = useState({
    period: "3m",
    startDate: "",
    endDate: "",
    department: "all",
    role: "all",
    page: 1,
  });

  /* ==============================
     PERFORMANCE FILTERS
  ============================== */

  const [performanceFilters, setPerformanceFilters] =
    useState({
      role: "all",
      department: "all",
      search: "",
      page: 1,
      limit: 10,
    });

  /* ==============================
     SYNC FILTERS
  ============================== */

  useEffect(() => {
    setPerformanceFilters((prev) => ({
      ...prev,
      role: filters.role,
      department: filters.department,
      page: 1,
    }));
  }, [filters.role, filters.department]);

  /* ==============================
     REPORT DATA HOOKS
     (ALWAYS CALLED — NEVER CONDITIONAL)
  ============================== */

  const {
    data: reportsData,
    loading: reportsLoading,
    error: reportsError,
  } = useReports(filters);

  const {
    data: insightsData,
    loading: insightsLoading,
  } = usePerformanceInsights(filters);

  const performanceHook =
    useEmployeePerformance(performanceFilters);

  /* ==============================
     PRODUCTIVITY STATE
  ============================== */

  const [selectedDept, setSelectedDept] =
    useState("all");

  /* ==============================
     EXPORT FUNCTION
  ============================== */

  const handleExport = async (type) => {

    if (!rbac?.canExport) return;

    try {

      const res = await api.get("/reports/export", {
        params: { ...filters, type },
        responseType: "blob",
      });

      const blob = new Blob([res.data]);
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download =
        type === "csv"
          ? "reports.csv"
          : "reports.pdf";

      link.click();
      window.URL.revokeObjectURL(url);

    } catch (error) {

      console.error("Export failed:", error);

    }

  };

  /* ==============================
     GUARDS
  ============================== */

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  if (!rbac) {
    return (
      <div className="flex items-center justify-center py-40 text-muted-foreground">
        Role not configured for Reports
      </div>
    );
  }

  if (reportsLoading) {
    return (
      <div className="flex items-center justify-center py-40">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  if (reportsError) {
    return (
      <div className="text-center py-40 text-red-500">
        Failed to load reports data
      </div>
    );
  }

  /* ==============================
     RENDER
  ============================== */

  return (
    <div className="min-h-screen bg-muted/40">

      {/* HEADER */}

      <div className="border-b bg-background px-8 py-6">

        <h1 className="text-3xl font-bold">
          Reports & Analytics
        </h1>

        <p className="text-muted-foreground">
          Enterprise Workforce Intelligence Dashboard
        </p>

      </div>

      <div className="max-w-7xl mx-auto px-8 py-8 space-y-8">

        {/* FILTERS */}

        <ReportsHeader
          filters={filters}
          setFilters={setFilters}
          onExportCSV={() => handleExport("csv")}
          onExportPDF={() => handleExport("pdf")}
          canExport={rbac.canExport}
        />

        {/* TABS */}

        <Tabs
          defaultValue={rbac.tabs[0]}
          className="space-y-6"
        >

          <TabsList className="grid grid-cols-4 w-full max-w-xl">

            {rbac.tabs.map((tab) => (
              <TabsTrigger key={tab} value={tab}>
                {tab}
              </TabsTrigger>
            ))}

          </TabsList>

          {/* EXECUTIVE */}

          {rbac.tabs.includes("executive") && (

            <TabsContent value="executive" className="space-y-8">

              <ExecutiveInsights
                data={reportsData?.summary}
              />

              <KPISection
                data={reportsData?.summary}
              />

            </TabsContent>

          )}

          {/* WORKFORCE */}

          {rbac.tabs.includes("workforce") && (

            <TabsContent value="workforce" className="space-y-8">

              <WorkforceCharts
                data={reportsData?.workforceTrend}
                filters={filters}
              />

              <AttendanceCharts
                data={reportsData?.attendanceTrend}
                filters={filters}
              />

              <div className="grid lg:grid-cols-3 gap-6">

                <DepartmentChart
                  data={
                    reportsData?.departmentDistribution
                  }
                />

                <LeavePieChart
                  data={reportsData?.leaveBreakdown}
                />

                <WorkforceHealthMeter
                  data={reportsData?.summary}
                />

              </div>

              <DepartmentBudgetOverview
                filters={filters}
              />

              <DepartmentWorkingHours
                data={
                  reportsData?.departmentWorkingHours
                }
              />

            </TabsContent>

          )}

          {/* PRODUCTIVITY */}

          {rbac.tabs.includes("productivity") && (

            <TabsContent value="productivity" className="space-y-8">

              <ProductivityKPI />

              <LiveWorkforceStatus />

              <div className="grid lg:grid-cols-2 gap-6">

                <AppUsageChart />

                <ProductivityHeatmap
                  selectedDepartment={selectedDept}
                  onDepartmentChange={setSelectedDept}
                />

              </div>

            </TabsContent>

          )}

          {/* PERFORMANCE */}

          {rbac.tabs.includes("performance") && (

            <TabsContent value="performance" className="space-y-8">

              <PerformanceInsights
                data={insightsData}
                loading={insightsLoading}
              />

              <PerformanceSection
                hook={performanceHook}
                filters={performanceFilters}
                setFilters={setPerformanceFilters}
              />

            </TabsContent>

          )}

        </Tabs>

      </div>

    </div>
  );
}
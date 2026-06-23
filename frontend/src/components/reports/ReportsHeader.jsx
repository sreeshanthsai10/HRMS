// // import { useEffect } from "react";
// // import { Input } from "@/components/ui/input";
// // import { Button } from "@/components/ui/button";
// // import {
// //   Select,
// //   SelectTrigger,
// //   SelectContent,
// //   SelectItem,
// //   SelectValue,
// // } from "@/components/ui/select";
// // import { Card, CardContent } from "@/components/ui/card";
// // import { Label } from "@/components/ui/label";

// // export default function ReportsHeader({
// //   filters = {},
// //   setFilters,
// // }) {
// //   const today = new Date().toISOString().split("T")[0];

// //   const departments = [
// //     "Engineering",
// //     "Sales",
// //     "Marketing",
// //     "HR",
// //     "Finance",
// //     "Operations",
// //   ];

// //   const roles = [
// //     { label: "All Roles", value: "all" },
// //     { label: "CEO", value: "CEO" },
// //     { label: "Country Manager", value: "COUNTRY_MANAGER" },
// //     { label: "HR Manager", value: "HR_MANAGER" },
// //     { label: "HR Officer", value: "HR_OFFICER" },
// //     { label: "Department Manager", value: "DEPARTMENT_MANAGER" },
// //     { label: "Direct Manager", value: "DIRECT_MANAGER" },
// //     { label: "Payroll Officer", value: "PAYROLL_OFFICER" },
// //     { label: "Project Manager", value: "PROJECT_MANAGER" },
// //     { label: "Operations Manager", value: "OPERATIONS_MANAGER" },
// //     { label: "Camp Boss", value: "CAMP_BOSS" },
// //     { label: "Admin", value: "ADMIN" },
// //     { label: "Employee", value: "EMPLOYEE" },
// //   ];

// //   /* =========================
// //      PRESET PERIOD HANDLER
// //   ========================== */
// //   useEffect(() => {
// //     if (!filters.period || filters.period === "custom") return;

// //     const now = new Date();
// //     let start = new Date();

// //     if (filters.period === "3m") {
// //       start.setMonth(now.getMonth() - 3);
// //     } else if (filters.period === "6m") {
// //       start.setMonth(now.getMonth() - 6);
// //     } else if (filters.period === "year") {
// //       start = new Date(now.getFullYear(), 0, 1);
// //     }

// //     setFilters((prev) => ({
// //       ...prev,
// //       startDate: start.toISOString().split("T")[0],
// //       endDate: now.toISOString().split("T")[0],
// //       page: 1,
// //     }));
// //   }, [filters.period]);

// //   /* =========================
// //      RESET FILTERS
// //   ========================== */
// //   const handleReset = () => {
// //     const now = new Date();
// //     const start = new Date();
// //     start.setMonth(now.getMonth() - 3);

// //     setFilters({
// //       period: "3m",
// //       startDate: start.toISOString().split("T")[0],
// //       endDate: now.toISOString().split("T")[0],
// //       department: "all",
// //       role: "all",
// //       page: 1,
// //     });
// //   };

// //   const handleChange = (key, value) => {
// //     setFilters((prev) => ({
// //       ...prev,
// //       [key]: value,
// //       page: 1,
// //     }));
// //   };

// //   return (
// //     <Card className="rounded-2xl shadow-sm">
// //       <CardContent className="p-6">
// //         <div className="flex flex-wrap gap-6 items-end">

// //           {/* PERIOD */}
// //           <div className="flex flex-col gap-2 w-[200px]">
// //             <Label>Period</Label>
// //             <Select
// //               value={filters.period}
// //               onValueChange={(value) =>
// //                 handleChange("period", value)
// //               }
// //             >
// //               <SelectTrigger>
// //                 <SelectValue placeholder="Select Period" />
// //               </SelectTrigger>
// //               <SelectContent>
// //                 <SelectItem value="3m">Last 3 Months</SelectItem>
// //                 <SelectItem value="6m">Last 6 Months</SelectItem>
// //                 <SelectItem value="year">This Year</SelectItem>
// //                 <SelectItem value="custom">Custom Range</SelectItem>
// //               </SelectContent>
// //             </Select>
// //           </div>

// //           {/* CUSTOM RANGE */}
// //           {filters.period === "custom" && (
// //             <>
// //               <div className="flex flex-col gap-2 w-[180px]">
// //                 <Label>From</Label>
// //                 <Input
// //                   type="date"
// //                   max={today}
// //                   value={filters.startDate || ""}
// //                   onChange={(e) =>
// //                     handleChange("startDate", e.target.value)
// //                   }
// //                 />
// //               </div>

// //               <div className="flex flex-col gap-2 w-[180px]">
// //                 <Label>To</Label>
// //                 <Input
// //                   type="date"
// //                   max={today}
// //                   value={filters.endDate || ""}
// //                   onChange={(e) =>
// //                     handleChange("endDate", e.target.value)
// //                   }
// //                 />
// //               </div>
// //             </>
// //           )}

// //           {/* DEPARTMENT */}
// //           <div className="flex flex-col gap-2 w-[200px]">
// //             <Label>Department</Label>
// //             <Select
// //               value={filters.department}
// //               onValueChange={(value) =>
// //                 handleChange("department", value)
// //               }
// //             >
// //               <SelectTrigger>
// //                 <SelectValue placeholder="All Departments" />
// //               </SelectTrigger>
// //               <SelectContent>
// //                 <SelectItem value="all">
// //                   All Departments
// //                 </SelectItem>
// //                 {departments.map((dept) => (
// //                   <SelectItem key={dept} value={dept}>
// //                     {dept}
// //                   </SelectItem>
// //                 ))}
// //               </SelectContent>
// //             </Select>
// //           </div>

// //           {/* ROLE */}
// //           <div className="flex flex-col gap-2 w-[200px]">
// //             <Label>Role</Label>
// //             <Select
// //               value={filters.role}
// //               onValueChange={(value) =>
// //                 handleChange("role", value)
// //               }
// //             >
// //               <SelectTrigger>
// //                 <SelectValue placeholder="All Roles" />
// //               </SelectTrigger>
// //               <SelectContent>
// //                 {roles.map((role) => (
// //                   <SelectItem
// //                     key={role.value}
// //                     value={role.value}
// //                   >
// //                     {role.label}
// //                   </SelectItem>
// //                 ))}
// //               </SelectContent>
// //             </Select>
// //           </div>

// //           {/* RESET */}
// //           <div className="flex items-end">
// //             <Button
// //               variant="secondary"
// //               onClick={handleReset}
// //             >
// //               Reset
// //             </Button>
// //           </div>
                
// //       {/* EXPORT BUTTONS */}
// //       <div className="flex gap-4">
// //         <button
// //           onClick={handleExportCSV}
// //           className="px-4 py-2 bg-emerald-600 text-white rounded-lg"
// //         >
// //           Export CSV
// //         </button>

// //         <button
// //           onClick={handleExportPDF}
// //           className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
// //         >
// //           Export PDF
// //         </button>
// //       </div>
// //         </div>
// //       </CardContent>
// //     </Card>
// //   );
// // }

// import { useEffect, useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectTrigger,
//   SelectContent,
//   SelectItem,
//   SelectValue,
// } from "@/components/ui/select";
// import { Card, CardContent } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Download } from "lucide-react";
// import api from "@/services/apiClient";

// export default function ReportsHeader({
//   filters = {},
//   setFilters,
// }) {
//   const [exporting, setExporting] = useState(false);
//   const today = new Date().toISOString().split("T")[0];

//   const departments = [
//     "Engineering",
//     "Sales",
//     "Marketing",
//     "HR",
//     "IT",
//     "Finance",
//     "Operations",
//   ];

//   const roles = [
//     { label: "All Roles", value: "all" },
//     { label: "CEO", value: "CEO" },
//     { label: "Country Manager", value: "COUNTRY_MANAGER" },
//     { label: "HR Manager", value: "HR_MANAGER" },
//     { label: "HR Officer", value: "HR_OFFICER" },
//     { label: "Department Manager", value: "DEPARTMENT_MANAGER" },
//     { label: "Direct Manager", value: "DIRECT_MANAGER" },
//     { label: "Payroll Officer", value: "PAYROLL_OFFICER" },
//     { label: "Project Manager", value: "PROJECT_MANAGER" },
//     { label: "Operations Manager", value: "OPERATIONS_MANAGER" },
//     { label: "Camp Boss", value: "CAMP_BOSS" },
//     { label: "Admin", value: "ADMIN" },
//     { label: "Employee", value: "EMPLOYEE" },
//   ];

//   /* =========================
//      PRESET PERIOD HANDLER
//   ========================== */
//  useEffect(() => {
//     if (!filters.period || filters.period === "custom") return;

//     const now = new Date();
//     let start = new Date();

//     if (filters.period === "3m") {
//       start.setMonth(now.getMonth() - 3);
//     } else if (filters.period === "6m") {
//       start.setMonth(now.getMonth() - 6);
//     } else if (filters.period === "year") {
//       start = new Date(now.getFullYear(), 0, 1);
//     }

//     setFilters((prev) => ({
//       ...prev,
//       startDate: start.toISOString().split("T")[0],
//       endDate: now.toISOString().split("T")[0],
//       page: 1,
//     }));
//   }, [filters.period]);

//   /* =========================
//      FILTER CHANGE HANDLER
//   ========================== */
//   const handleChange = (key, value) => {
//     setFilters((prev) => ({
//       ...prev,
//       [key]: value,
//       page: 1,
//     }));
//   };

//   /* =========================
//      RESET
//   ========================== */
//   const handleReset = () => {
//     const now = new Date();
//     const start = new Date();
//     start.setMonth(now.getMonth() - 3);

//     setFilters({
//       period: "3m",
//       startDate: start.toISOString().split("T")[0],
//       endDate: now.toISOString().split("T")[0],
//       department: "all",
//       role: "all",
//       page: 1,
//     });
//   };


//   /* =========================
//      EXPORT HANDLER
//   ========================== */
//   const handleExport = async (type) => {
//     try {
//       setExporting(true);

//       const response = await api.get(
//         "/reports/export",
//         {
//           params: {
//             ...filters,
//             type,
//           },
//           responseType: "blob",
//         }
//       );

//       const blob = new Blob([response.data]);
//       const url = window.URL.createObjectURL(blob);

//       const link = document.createElement("a");
//       link.href = url;
//       link.download =
//         type === "pdf"
//           ? "reports.pdf"
//           : "reports.csv";

//       document.body.appendChild(link);
//       link.click();
//       link.remove();

//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("Export error:", error);
//     } finally {
//       setExporting(false);
//     }
//   };

//   return (
//     <Card className="rounded-2xl shadow-sm">
//       <CardContent className="p-6">

//         <div className="flex justify-between items-end flex-wrap gap-6">

//           {/* LEFT: FILTERS */}
//           <div className="flex flex-wrap gap-6 items-end">

//             {/* PERIOD */}
//             <div className="flex flex-col gap-2 w-[200px]">
//               <Label>Period</Label>
//               <Select
//                 value={filters.period}
//                 onValueChange={(value) =>
//                   handleChange("period", value)
//                 }
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select Period" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="3m">Last 3 Months</SelectItem>
//                   <SelectItem value="6m">Last 6 Months</SelectItem>
//                   <SelectItem value="year">This Year</SelectItem>
//                   <SelectItem value="custom">Custom Range</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* DEPARTMENT */}
//             <div className="flex flex-col gap-2 w-[200px]">
//               <Label>Department</Label>
//               <Select
//                 value={filters.department}
//                 onValueChange={(value) =>
//                   handleChange("department", value)
//                 }
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="All Departments" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">
//                     All Departments
//                   </SelectItem>
//                   {departments.map((dept) => (
//                     <SelectItem key={dept} value={dept}>
//                       {dept}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* ROLE */}
//             <div className="flex flex-col gap-2 w-[200px]">
//               <Label>Role</Label>
//               <Select
//                 value={filters.role}
//                 onValueChange={(value) =>
//                   handleChange("role", value)
//                 }
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="All Roles" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {roles.map((role) => (
//                     <SelectItem
//                       key={role.value}
//                       value={role.value}
//                     >
//                       {role.label}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             <Button
//               variant="secondary"
//               onClick={handleReset}
//             >
//               Reset
//             </Button>

//           </div>

//           {/* RIGHT: EXPORT */}
//           <div className="flex gap-3">
//             <Button
//               variant="outline"
//               disabled={exporting}
//               onClick={() => handleExport("csv")}
//             >
//               <Download size={16} className="mr-2" />
//               Export CSV
//             </Button>

//             <Button
//               disabled={exporting}
//               onClick={() => handleExport("pdf")}
//             >
//               <Download size={16} className="mr-2" />
//               Export PDF
//             </Button>
//           </div>

//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// import { useEffect } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectTrigger,
//   SelectContent,
//   SelectItem,
//   SelectValue,
// } from "@/components/ui/select";
// import { Card, CardContent } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Download } from "lucide-react";

// export default function ReportsHeader({
//   filters = {},
//   setFilters,
//   onExportCSV,
//   onExportPDF,
//   canExport = false,
// }) {

//   const today = new Date().toISOString().split("T")[0];

//   const departments = [
//     "Engineering",
//     "Sales",
//     "Marketing",
//     "HR",
//     "IT",
//     "Finance",
//     "Operations",
//   ];

//   const roles = [
//     { label: "All Roles", value: "all" },
//     { label: "CEO", value: "CEO" },
//     { label: "Country Manager", value: "COUNTRY_MANAGER" },
//     { label: "HR Manager", value: "HR_MANAGER" },
//     { label: "HR Officer", value: "HR_OFFICER" },
//     { label: "Department Manager", value: "DEPARTMENT_MANAGER" },
//     { label: "Direct Manager", value: "DIRECT_MANAGER" },
//     { label: "Payroll Officer", value: "PAYROLL_OFFICER" },
//     { label: "Project Manager", value: "PROJECT_MANAGER" },
//     { label: "Operations Manager", value: "OPERATIONS_MANAGER" },
//     { label: "Camp Boss", value: "CAMP_BOSS" },
//     { label: "Admin", value: "ADMIN" },
//     { label: "Employee", value: "EMPLOYEE" },
//   ];

//   /* =========================
//      PRESET PERIOD HANDLER
//   ========================== */
//   useEffect(() => {
//     if (!filters.period || filters.period === "custom") return;

//     const now = new Date();
//     let start = new Date();

//     if (filters.period === "3m") {
//       start.setMonth(now.getMonth() - 3);
//     }

//     if (filters.period === "6m") {
//       start.setMonth(now.getMonth() - 6);
//     }

//     if (filters.period === "year") {
//       start = new Date(now.getFullYear(), 0, 1);
//     }

//     setFilters((prev) => ({
//       ...prev,
//       startDate: start.toISOString().split("T")[0],
//       endDate: now.toISOString().split("T")[0],
//       page: 1,
//     }));

//   }, [filters.period, setFilters]);

//   /* =========================
//      FILTER CHANGE HANDLER
//   ========================== */
//   const handleChange = (key, value) => {
//     setFilters((prev) => ({
//       ...prev,
//       [key]: value,
//       page: 1,
//     }));
//   };

//   /* =========================
//      RESET FILTERS
//   ========================== */
//   const handleReset = () => {
//     const now = new Date();
//     const start = new Date();
//     start.setMonth(now.getMonth() - 3);

//     setFilters({
//       period: "3m",
//       startDate: start.toISOString().split("T")[0],
//       endDate: now.toISOString().split("T")[0],
//       department: "all",
//       role: "all",
//       page: 1,
//     });
//   };

//   return (
//     <Card className="rounded-2xl shadow-sm">
//       <CardContent className="p-6">

//         <div className="flex justify-between items-end flex-wrap gap-6">

//           {/* LEFT SIDE — FILTERS */}
//           <div className="flex flex-wrap gap-6 items-end">

//             {/* PERIOD */}
//             <div className="flex flex-col gap-2 w-[200px]">
//               <Label>Period</Label>
//               <Select
//                 value={filters.period}
//                 onValueChange={(value) =>
//                   handleChange("period", value)
//                 }
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select Period" />
//                 </SelectTrigger>

//                 <SelectContent>
//                   <SelectItem value="3m">Last 3 Months</SelectItem>
//                   <SelectItem value="6m">Last 6 Months</SelectItem>
//                   <SelectItem value="year">This Year</SelectItem>
//                   <SelectItem value="custom">Custom Range</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* CUSTOM DATE RANGE */}
//             {filters.period === "custom" && (
//               <>
//                 <div className="flex flex-col gap-2 w-[180px]">
//                   <Label>From</Label>
//                   <Input
//                     type="date"
//                     max={today}
//                     value={filters.startDate || ""}
//                     onChange={(e) =>
//                       handleChange("startDate", e.target.value)
//                     }
//                   />
//                 </div>

//                 <div className="flex flex-col gap-2 w-[180px]">
//                   <Label>To</Label>
//                   <Input
//                     type="date"
//                     max={today}
//                     value={filters.endDate || ""}
//                     onChange={(e) =>
//                       handleChange("endDate", e.target.value)
//                     }
//                   />
//                 </div>
//               </>
//             )}

//             {/* DEPARTMENT */}
//             <div className="flex flex-col gap-2 w-[200px]">
//               <Label>Department</Label>
//               <Select
//                 value={filters.department}
//                 onValueChange={(value) =>
//                   handleChange("department", value)
//                 }
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="All Departments" />
//                 </SelectTrigger>

//                 <SelectContent>
//                   <SelectItem value="all">
//                     All Departments
//                   </SelectItem>

//                   {departments.map((dept) => (
//                     <SelectItem key={dept} value={dept}>
//                       {dept}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* ROLE */}
//             <div className="flex flex-col gap-2 w-[200px]">
//               <Label>Role</Label>

//               <Select
//                 value={filters.role}
//                 onValueChange={(value) =>
//                   handleChange("role", value)
//                 }
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="All Roles" />
//                 </SelectTrigger>

//                 <SelectContent>
//                   {roles.map((role) => (
//                     <SelectItem
//                       key={role.value}
//                       value={role.value}
//                     >
//                       {role.label}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* RESET */}
//             <Button
//               variant="secondary"
//               onClick={handleReset}
//             >
//               Reset
//             </Button>

//           </div>

//           {/* RIGHT SIDE — EXPORT */}
//           {canExport && (
//             <div className="flex gap-3">

//               <Button
//                 variant="outline"
//                 onClick={onExportCSV}
//               >
//                 <Download size={16} className="mr-2" />
//                 Export CSV
//               </Button>

//               <Button
//                 onClick={onExportPDF}
//               >
//                 <Download size={16} className="mr-2" />
//                 Export PDF
//               </Button>

//             </div>
//           )}

//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// import { useEffect, useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectTrigger,
//   SelectContent,
//   SelectItem,
//   SelectValue,
// } from "@/components/ui/select";
// import { Card, CardContent } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Download, RotateCcw } from "lucide-react";

// export default function ReportsHeader({
//   filters = {},
//   setFilters,
//   onExportCSV,
//   onExportPDF,
//   canExport = false,
// }) {

//   const [exporting, setExporting] = useState(false);

//   const today = new Date().toISOString().split("T")[0];

//   const departments = [
//     "Engineering",
//     "Sales",
//     "Marketing",
//     "HR",
//     "IT",
//     "Finance",
//     "Operations",
//   ];

//   const roles = [
//     { label: "All Roles", value: "all" },
//     { label: "CEO", value: "CEO" },
//     { label: "Country Manager", value: "COUNTRY_MANAGER" },
//     { label: "HR Manager", value: "HR_MANAGER" },
//     { label: "HR Officer", value: "HR_OFFICER" },
//     { label: "Department Manager", value: "DEPARTMENT_MANAGER" },
//     { label: "Direct Manager", value: "DIRECT_MANAGER" },
//     { label: "Payroll Officer", value: "PAYROLL_OFFICER" },
//     { label: "Project Manager", value: "PROJECT_MANAGER" },
//     { label: "Operations Manager", value: "OPERATIONS_MANAGER" },
//     { label: "Camp Boss", value: "CAMP_BOSS" },
//     { label: "Admin", value: "ADMIN" },
//     { label: "Employee", value: "EMPLOYEE" },
//   ];

//   /* =============================
//      AUTO DATE RANGE
//   ============================== */

//   useEffect(() => {

//     if (!filters.period || filters.period === "custom") return;

//     const now = new Date();
//     let start = new Date();

//     if (filters.period === "3m") start.setMonth(now.getMonth() - 3);
//     if (filters.period === "6m") start.setMonth(now.getMonth() - 6);
//     if (filters.period === "year") start = new Date(now.getFullYear(), 0, 1);

//     setFilters((prev) => ({
//       ...prev,
//       startDate: start.toISOString().split("T")[0],
//       endDate: now.toISOString().split("T")[0],
//       page: 1,
//     }));

//   }, [filters.period, setFilters]);

//   /* =============================
//      FILTER CHANGE
//   ============================== */

//   const updateFilter = (key, value) => {
//     setFilters((prev) => ({
//       ...prev,
//       [key]: value,
//       page: 1,
//     }));
//   };

//   /* =============================
//      RESET FILTERS
//   ============================== */

//   const handleReset = () => {

//     const now = new Date();
//     const start = new Date();
//     start.setMonth(now.getMonth() - 3);

//     setFilters({
//       period: "3m",
//       startDate: start.toISOString().split("T")[0],
//       endDate: now.toISOString().split("T")[0],
//       department: "all",
//       role: "all",
//       page: 1,
//     });

//   };

//   /* =============================
//      EXPORT WRAPPER
//   ============================== */

//   const handleExport = async (type) => {

//     try {

//       setExporting(true);

//       if (type === "csv") {
//         await onExportCSV?.();
//       } else {
//         await onExportPDF?.();
//       }

//     } finally {

//       setExporting(false);

//     }

//   };

//   /* =============================
//      RENDER
//   ============================== */

//   return (

//     <Card className="rounded-2xl shadow-sm">

//       <CardContent className="p-6">

//         <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-1 gap-6 items-end">

//           {/* PERIOD */}

//           <div className="flex flex-col gap-2">
//             <Label>Period</Label>

//             <Select
//               value={filters.period}
//               onValueChange={(value) =>
//                 updateFilter("period", value)
//               }
//             >

//               <SelectTrigger>
//                 <SelectValue placeholder="Select Period" />
//               </SelectTrigger>

//               <SelectContent>
//                 <SelectItem value="3m">Last 3 Months</SelectItem>
//                 <SelectItem value="6m">Last 6 Months</SelectItem>
//                 <SelectItem value="year">This Year</SelectItem>
//                 <SelectItem value="custom">Custom Range</SelectItem>
//               </SelectContent>

//             </Select>
//           </div>

//           {/* CUSTOM RANGE */}

//           {filters.period === "custom" && (
//             <>
//               <div className="flex flex-col gap-2">
//                 <Label>From</Label>
//                 <Input
//                   type="date"
//                   max={today}
//                   value={filters.startDate || ""}
//                   onChange={(e) =>
//                     updateFilter("startDate", e.target.value)
//                   }
//                 />
//               </div>

//               <div className="flex flex-col gap-2">
//                 <Label>To</Label>
//                 <Input
//                   type="date"
//                   max={today}
//                   value={filters.endDate || ""}
//                   onChange={(e) =>
//                     updateFilter("endDate", e.target.value)
//                   }
//                 />
//               </div>
//             </>
//           )}

//           {/* DEPARTMENT */}

//           <div className="flex flex-col gap-2">
//             <Label>Department</Label>

//             <Select
//               value={filters.department}
//               onValueChange={(value) =>
//                 updateFilter("department", value)
//               }
//             >

//               <SelectTrigger>
//                 <SelectValue placeholder="All Departments" />
//               </SelectTrigger>

//               <SelectContent>

//                 <SelectItem value="all">
//                   All Departments
//                 </SelectItem>

//                 {departments.map((dept) => (
//                   <SelectItem key={dept} value={dept}>
//                     {dept}
//                   </SelectItem>
//                 ))}

//               </SelectContent>

//             </Select>
//           </div>

//           {/* ROLE */}

//           <div className="flex flex-col gap-2">
//             <Label>Role</Label>

//             <Select
//               value={filters.role}
//               onValueChange={(value) =>
//                 updateFilter("role", value)
//               }
//             >

//               <SelectTrigger>
//                 <SelectValue placeholder="All Roles" />
//               </SelectTrigger>

//               <SelectContent>

//                 {roles.map((role) => (
//                   <SelectItem
//                     key={role.value}
//                     value={role.value}
//                   >
//                     {role.label}
//                   </SelectItem>
//                 ))}

//               </SelectContent>

//             </Select>
//           </div>

//           {/* RESET */}

//           <Button
//             variant="secondary"
//             onClick={handleReset}
//             className="flex items-center gap-2"
//           >
//             <RotateCcw size={16} />
//             Reset
//           </Button>

//           {/* EXPORT */}

//           {canExport && (

//             <div className="flex gap-3">

//               <Button
//                 variant="outline"
//                 disabled={exporting}
//                 onClick={() => handleExport("csv")}
//               >
//                 <Download size={16} className="mr-2" />
//                 CSV
//               </Button>

//               <Button
//                 disabled={exporting}
//                 onClick={() => handleExport("pdf")}
//               >
//                 <Download size={16} className="mr-2" />
//                 PDF
//               </Button>

//             </div>

//           )}

//         </div>

//       </CardContent>

//     </Card>

//   );
// }

//final

import { useEffect, useMemo, useCallback, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Download, RotateCcw } from "lucide-react";

/* =========================================================
   REPORTS HEADER
========================================================= */

export default function ReportsHeader({
  filters = {},
  setFilters,
  onExportCSV,
  onExportPDF,
  canExport = false,
}) {

  const [exporting, setExporting] = useState(false);

  const today = useMemo(
    () => new Date().toISOString().split("T")[0],
    []
  );

  /* =========================================================
     STATIC DATA (MEMOIZED)
  ========================================================= */

  const departments = useMemo(
    () => [
      "Engineering",
      "Sales",
      "Marketing",
      "HR",
      "IT",
      "Finance",
      "Operations",
    ],
    []
  );

  const roles = useMemo(
    () => [
      { label: "All Roles", value: "all" },
      { label: "CEO", value: "CEO" },
      { label: "Country Manager", value: "COUNTRY_MANAGER" },
      { label: "HR Manager", value: "HR_MANAGER" },
      { label: "HR Officer", value: "HR_OFFICER" },
      { label: "Department Manager", value: "DEPARTMENT_MANAGER" },
      { label: "Direct Manager", value: "DIRECT_MANAGER" },
      { label: "Payroll Officer", value: "PAYROLL_OFFICER" },
      { label: "Project Manager", value: "PROJECT_MANAGER" },
      { label: "Operations Manager", value: "OPERATIONS_MANAGER" },
      { label: "Camp Boss", value: "CAMP_BOSS" },
      { label: "Admin", value: "ADMIN" },
      { label: "Employee", value: "EMPLOYEE" },
    ],
    []
  );

  /* =========================================================
     PERIOD AUTO DATE RANGE
  ========================================================= */

  useEffect(() => {

    if (!filters.period || filters.period === "custom") return;

    const now = new Date();
    let start = new Date();

    if (filters.period === "3m") start.setMonth(now.getMonth() - 3);
    if (filters.period === "6m") start.setMonth(now.getMonth() - 6);
    if (filters.period === "year") start = new Date(now.getFullYear(), 0, 1);

    const startDate = start.toISOString().split("T")[0];
    const endDate = now.toISOString().split("T")[0];

    if (
      filters.startDate === startDate &&
      filters.endDate === endDate
    ) return;

    setFilters(prev => ({
      ...prev,
      startDate,
      endDate,
      page: 1
    }));

  }, [filters.period, filters.startDate, filters.endDate, setFilters]);

  /* =========================================================
     FILTER UPDATE
  ========================================================= */

  const updateFilter = useCallback((key, value) => {

    setFilters(prev => {

      if (prev[key] === value) return prev;

      return {
        ...prev,
        [key]: value,
        page: 1
      };

    });

  }, [setFilters]);

  /* =========================================================
     RESET FILTERS
  ========================================================= */

  const handleReset = useCallback(() => {

    const now = new Date();
    const start = new Date();
    start.setMonth(now.getMonth() - 3);

    setFilters({
      period: "3m",
      startDate: start.toISOString().split("T")[0],
      endDate: now.toISOString().split("T")[0],
      department: "all",
      role: "all",
      page: 1
    });

  }, [setFilters]);

  /* =========================================================
     EXPORT HANDLER
  ========================================================= */

  const handleExport = async (type) => {

    if (exporting) return;

    try {

      setExporting(true);

      if (type === "csv") {
        await onExportCSV?.();
      } else {
        await onExportPDF?.();
      }

    } finally {

      setExporting(false);

    }

  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (

    <Card className="rounded-2xl shadow-sm">

      <CardContent className="p-6">

        <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-1 gap-6 items-end">

          {/* PERIOD */}

          <div className="flex flex-col gap-2">

            <Label>Period</Label>

            <Select
              value={filters.period}
              onValueChange={(value) =>
                updateFilter("period", value)
              }
            >

              <SelectTrigger>
                <SelectValue placeholder="Select Period" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="3m">Last 3 Months</SelectItem>
                <SelectItem value="6m">Last 6 Months</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>

            </Select>

          </div>

          {/* CUSTOM RANGE */}

          {filters.period === "custom" && (
            <>
              <div className="flex flex-col gap-2">

                <Label>From</Label>

                <Input
                  type="date"
                  max={today}
                  value={filters.startDate || ""}
                  onChange={(e) =>
                    updateFilter("startDate", e.target.value)
                  }
                />

              </div>

              <div className="flex flex-col gap-2">

                <Label>To</Label>

                <Input
                  type="date"
                  max={today}
                  value={filters.endDate || ""}
                  onChange={(e) =>
                    updateFilter("endDate", e.target.value)
                  }
                />

              </div>
            </>
          )}

          {/* DEPARTMENT */}

          <div className="flex flex-col gap-2">

            <Label>Department</Label>

            <Select
              value={filters.department}
              onValueChange={(value) =>
                updateFilter("department", value)
              }
            >

              <SelectTrigger>
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>

              <SelectContent>

                <SelectItem value="all">
                  All Departments
                </SelectItem>

                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}

              </SelectContent>

            </Select>

          </div>

          {/* ROLE */}

          <div className="flex flex-col gap-2">

            <Label>Role</Label>

            <Select
              value={filters.role}
              onValueChange={(value) =>
                updateFilter("role", value)
              }
            >

              <SelectTrigger>
                <SelectValue placeholder="All Roles" />
              </SelectTrigger>

              <SelectContent>

                {roles.map((role) => (
                  <SelectItem
                    key={role.value}
                    value={role.value}
                  >
                    {role.label}
                  </SelectItem>
                ))}

              </SelectContent>

            </Select>

          </div>

          {/* RESET */}

          <Button
            variant="secondary"
            onClick={handleReset}
            className="flex items-center gap-2"
          >
            <RotateCcw size={16} />
            Reset
          </Button>

          {/* EXPORT */}

          {canExport && (

            <div className="flex gap-3">

              <Button
                variant="outline"
                disabled={exporting}
                onClick={() => handleExport("csv")}
              >
                <Download size={16} className="mr-2" />
                CSV
              </Button>

              <Button
                disabled={exporting}
                onClick={() => handleExport("pdf")}
              >
                <Download size={16} className="mr-2" />
                PDF
              </Button>

            </div>

          )}

        </div>

      </CardContent>

    </Card>

  );

}
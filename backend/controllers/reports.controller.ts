// import { Request, Response } from "express";
// import Employee from "../models/Employee.model";
// import Attendance from "../models/Attendance.model";
// import Leave from "../models/leave.model";
// import User from "../models/User.model";

// /* =========================================================
//    HELPER: Build Employee Filter
// ========================================================= */
// const buildEmployeeFilter = (query: any) => {
//   const { department, role } = query;
//   const filter: any = {};

//   if (department && department !== "all") {
//     filter.department = department;
//   }

//   if (role && role !== "all") {
//     filter.designation = role;
//   }

//   return filter;
// };

// /* =========================================================
//    HELPER: Get Employees Linked To ACTIVE Users
// ========================================================= */
// const getFilteredEmployees = async (query: any) => {
//   const filter = buildEmployeeFilter(query);

//   const activeUsers = await User.find({ isActive: true })
//     .select("_id employeeId")
//     .lean();

//   const activeEmployeeIds = activeUsers
//     .map((u: any) => u.employeeId)
//     .filter(Boolean);

//   const employees = await Employee.find({
//     ...filter,
//     _id: { $in: activeEmployeeIds },
//   })
//     .select(
//       "department salary.basic joiningDate firstName lastName designation"
//     )
//     .lean();

//   const userIds = activeUsers.map((u: any) => u._id);

//   return { employees, userIds };
// };

// /* =========================================================
//    SUMMARY (KPI)
// ========================================================= */
// export const getSummary = async (req: Request, res: Response) => {
//   try {
//     const { startDate, endDate } = req.query as any;
//     const { employees, userIds } = await getFilteredEmployees(req.query);

//     const headcount = employees.length;

//     const totalPayroll = employees.reduce(
//       (sum: number, e: any) => sum + (e.salary?.basic || 0),
//       0
//     );

//     const match: any = { userId: { $in: userIds } };

//     if (startDate && endDate) {
//       match.date = { $gte: startDate, $lte: endDate };
//     }

//     const attendanceAgg = await Attendance.aggregate([
//       { $match: match },
//       {
//         $group: {
//           _id: null,
//           totalHours: { $sum: { $ifNull: ["$totalHours", 0] } },
//           totalDays: { $sum: 1 },
//           presentDays: {
//             $sum: {
//               $cond: [
//                 { $in: ["$status", ["Present", "Late", "Half Day"]] },
//                 1,
//                 0,
//               ],
//             },
//           },
//         },
//       },
//     ]);

//     const totalHours = attendanceAgg[0]?.totalHours || 0;
//     const totalDays = attendanceAgg[0]?.totalDays || 0;
//     const presentDays = attendanceAgg[0]?.presentDays || 0;

//     res.json({
//       success: true,
//       data: {
//         headcount,
//         activeEmployees: headcount,
//         attritionRate: 0,
//         avgAttendance:
//           totalDays > 0
//             ? Number(((presentDays / totalDays) * 100).toFixed(1))
//             : 0,
//         totalPayroll,
//         totalWorkingHours: Number(totalHours.toFixed(1)),
//         avgWorkingHours:
//           totalDays > 0
//             ? Number((totalHours / totalDays).toFixed(1))
//             : 0,
//         openPositions: 5,
//       },
//     });
//   } catch (error) {
//     console.error("getSummary error:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// /* =========================================================
//    WORKFORCE TREND
// ========================================================= */
// export const getWorkforceData = async (req: Request, res: Response) => {
//   try {
//     const { startDate, endDate } = req.query as any;

//     const start = startDate
//       ? new Date(startDate)
//       : new Date(new Date().setMonth(new Date().getMonth() - 12));

//     const end = endDate ? new Date(endDate) : new Date();

//     const monthlyData: any[] = [];
//     const current = new Date(start);

//     while (current <= end) {
//       const monthEnd = new Date(current);
//       monthEnd.setMonth(monthEnd.getMonth() + 1);
//       monthEnd.setDate(0);

//       const count = await User.aggregate([
//         { $match: { isActive: true } },
//         {
//           $lookup: {
//             from: "employees",
//             localField: "employeeId",
//             foreignField: "_id",
//             as: "employee",
//           },
//         },
//         { $unwind: "$employee" },
//         {
//           $match: {
//             "employee.joiningDate": { $lte: monthEnd },
//           },
//         },
//         { $count: "total" },
//       ]);

//       monthlyData.push({
//         month: current.toLocaleString("default", {
//           month: "short",
//           year: "numeric",
//         }),
//         headcount: count[0]?.total || 0,
//       });

//       current.setMonth(current.getMonth() + 1);
//     }

//     res.json({ success: true, data: monthlyData });
//   } catch (error) {
//     console.error("getWorkforceData error:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// /* =========================================================
//    ATTENDANCE TREND
// ========================================================= */
// export const getAttendanceData = async (req: Request, res: Response) => {
//   try {
//     const { startDate, endDate } = req.query as any;
//     const { userIds } = await getFilteredEmployees(req.query);

//     const match: any = { userId: { $in: userIds } };

//     if (startDate && endDate) {
//       match.date = { $gte: startDate, $lte: endDate };
//     }

//     const attendance = await Attendance.aggregate([
//       { $match: match },
//       {
//         $group: {
//           _id: {
//             year: { $substr: ["$date", 0, 4] },
//             month: { $substr: ["$date", 5, 2] },
//           },
//           totalDays: { $sum: 1 },
//           presentDays: {
//             $sum: {
//               $cond: [
//                 { $in: ["$status", ["Present", "Late", "Half Day"]] },
//                 1,
//                 0,
//               ],
//             },
//           },
//         },
//       },
//       { $sort: { "_id.year": 1, "_id.month": 1 } },
//     ]);

//     const monthNames = [
//       "Jan","Feb","Mar","Apr","May","Jun",
//       "Jul","Aug","Sep","Oct","Nov","Dec",
//     ];

//     const formatted = attendance.map((item: any) => ({
//       month: `${monthNames[parseInt(item._id.month) - 1]} ${item._id.year}`,
//       attendance:
//         item.totalDays > 0
//           ? Number(((item.presentDays / item.totalDays) * 100).toFixed(1))
//           : 0,
//     }));

//     res.json({ success: true, data: formatted });
//   } catch (error) {
//     console.error("getAttendanceData error:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// /* =========================================================
//    DEPARTMENT DISTRIBUTION
// ========================================================= */
// export const getDepartmentData = async (req: Request, res: Response) => {
//   try {
//     const { employees } = await getFilteredEmployees(req.query);

//     const grouped: any = {};

//     employees.forEach((emp: any) => {
//       if (!emp.department) return;
//       if (!grouped[emp.department]) grouped[emp.department] = 0;
//       grouped[emp.department]++;
//     });

//     const result = Object.keys(grouped).map(dep => ({
//       department: dep,
//       employees: grouped[dep],
//     }));

//     res.json({ success: true, data: result });
//   } catch (error) {
//     console.error("getDepartmentData error:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// /* =========================================================
//    EMPLOYEE PERFORMANCE
// ========================================================= */
// export const getEmployeePerformance = async (req: Request, res: Response) => {
//   try {
//     const { search, page = 1, limit = 10 } = req.query as any;
//     const { employees } = await getFilteredEmployees(req.query);

//     let filtered = employees;

//     if (search) {
//       filtered = filtered.filter((e: any) =>
//         `${e.firstName} ${e.lastName}`
//           .toLowerCase()
//           .includes(search.toLowerCase())
//       );
//     }

//     const skip = (Number(page) - 1) * Number(limit);
//     const paginated = filtered.slice(skip, skip + Number(limit));

//     const formatted = paginated.map((emp: any) => ({
//       ...emp,
//       attendance: 85,
//       leaves: 2,
//       lateMarks: 1,
//       compliance: 90,
//       performanceScore: 75,
//       grade: "B",
//     }));

//     res.json({
//       success: true,
//       data: formatted,
//       pagination: {
//         total: filtered.length,
//         page: Number(page),
//         pages: Math.ceil(filtered.length / Number(limit)),
//       },
//     });
//   } catch (error) {
//     console.error("getEmployeePerformance error:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// /* =========================================================
//    DEPARTMENT WORKING HOURS
// ========================================================= */
// export const getDepartmentWorkingHours = async (req: Request, res: Response) => {
//   try {
//     const { startDate, endDate } = req.query as any;
//     const { userIds } = await getFilteredEmployees(req.query);

//     const match: any = { userId: { $in: userIds } };

//     if (startDate && endDate) {
//       match.date = { $gte: startDate, $lte: endDate };
//     }

//     const result = await Attendance.aggregate([
//       { $match: match },
//       {
//         $lookup: {
//           from: "employees",
//           localField: "userId",
//           foreignField: "userId",
//           as: "employee",
//         },
//       },
//       { $unwind: "$employee" },
//       {
//         $group: {
//           _id: "$employee.department",
//           totalHours: { $sum: { $ifNull: ["$totalHours", 0] } },
//           totalRecords: { $sum: 1 },
//         },
//       },
//       {
//         $project: {
//           department: "$_id",
//           totalHours: { $round: ["$totalHours", 1] },
//           avgHoursPerDay: {
//             $round: [
//               { $cond: [{ $eq: ["$totalRecords", 0] }, 0, { $divide: ["$totalHours", "$totalRecords"] }] },
//               1,
//             ],
//           },
//         },
//       },
//     ]);

//     res.json({ success: true, data: result });
//   } catch (error) {
//     console.error("getDepartmentWorkingHours error:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// /* =========================================================
//    EXPORT DATA (CSV / PDF)
// ========================================================= */
// export const getExportData = async (req: Request, res: Response) => {
//   try {
//     const { startDate, endDate } = req.query as any;
//     const { employees, userIds } = await getFilteredEmployees(req.query);

//     const match: any = { userId: { $in: userIds } };

//     if (startDate && endDate) {
//       match.date = { $gte: startDate, $lte: endDate };
//     }

//     const attendanceAgg = await Attendance.aggregate([
//       { $match: match },
//       {
//         $group: {
//           _id: "$userId",
//           totalHours: { $sum: { $ifNull: ["$totalHours", 0] } },
//           totalDays: { $sum: 1 },
//         },
//       },
//     ]);

//     const attendanceMap: any = {};
//     attendanceAgg.forEach((a: any) => {
//       attendanceMap[a._id] = a;
//     });

//     const exportData = employees.map((emp: any, index: number) => {
//       const userId = userIds[index];
//       const att = attendanceMap[userId] || {};

//       return {
//         Name: `${emp.firstName} ${emp.lastName}`,
//         Department: emp.department,
//         Role: emp.designation,
//         TotalWorkingHours: att.totalHours || 0,
//         TotalDays: att.totalDays || 0,
//       };
//     });

//     res.json({ success: true, data: exportData });
//   } catch (error) {
//     console.error("getExportData error:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// /* =========================================================
//    PERFORMANCE INSIGHTS
// ========================================================= */
// export const getPerformanceInsights = async (req: Request, res: Response) => {
//   try {
//     const { startDate, endDate } = req.query as any;
//     const { employees, userIds } = await getFilteredEmployees(req.query);

//     if (!employees.length) {
//       return res.json({
//         success: true,
//         data: {
//           topPerformers: [],
//           atRiskEmployees: [],
//         },
//       });
//     }

//     const match: any = { userId: { $in: userIds } };

//     if (startDate && endDate) {
//       match.date = { $gte: startDate, $lte: endDate };
//     }

//     const attendanceAgg = await Attendance.aggregate([
//       { $match: match },
//       {
//         $group: {
//           _id: "$userId",
//           totalDays: { $sum: 1 },
//           presentDays: {
//             $sum: {
//               $cond: [
//                 { $in: ["$status", ["Present", "Late", "Half Day"]] },
//                 1,
//                 0,
//               ],
//             },
//           },
//           lateMarks: {
//             $sum: {
//               $cond: [{ $eq: ["$status", "Late"] }, 1, 0],
//             },
//           },
//         },
//       },
//     ]);

//     const attendanceMap: any = {};
//     attendanceAgg.forEach((a: any) => {
//       attendanceMap[a._id] = a;
//     });

//     const scoredEmployees = employees.map((emp: any, index: number) => {
//       const userId = userIds[index];
//       const att = attendanceMap[userId] || {};

//       const totalDays = att.totalDays || 0;
//       const presentDays = att.presentDays || 0;
//       const lateMarks = att.lateMarks || 0;

//       const attendancePercent =
//         totalDays > 0 ? (presentDays / totalDays) * 100 : 0;

//       const score =
//         attendancePercent * 0.4 +
//         (100 - lateMarks * 5) * 0.3 +
//         60 * 0.3;

//       return {
//         name: `${emp.firstName} ${emp.lastName}`,
//         department: emp.department,
//         role: emp.designation,
//         score: Math.round(score),
//         attendance: Math.round(attendancePercent),
//         lateMarks,
//       };
//     });

//     const sorted = scoredEmployees.sort((a, b) => b.score - a.score);

//     res.json({
//       success: true,
//       data: {
//         topPerformers: sorted.slice(0, 5),
//         atRiskEmployees: sorted.slice(-5).reverse(),
//       },
//     });
//   } catch (error) {
//     console.error("getPerformanceInsights error:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };
// export const getLeaveData = async (req: Request, res: Response) => {
//   try {
//     const activeUsers = await User.find({ isActive: true })
//       .select("_id")
//       .lean();

//     const activeUserIds = activeUsers.map((u: any) => u._id);

//     const data = await Leave.aggregate([
//       { $match: { status: "Approved", userId: { $in: activeUserIds } } },
//       {
//         $group: {
//           _id: "$leaveType",
//           value: { $sum: 1 },
//         },
//       },
//     ]);

//     const formatted = data.map((d: any) => ({
//       name: d._id,
//       value: d.value,
//     }));

//     res.json({ success: true, data: formatted });
//   } catch (error) {
//     console.error("getLeaveData error:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// /* =========================================================
//    DEPARTMENT BUDGETS
// ========================================================= */
// export const getDepartmentBudgets = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const result = await Employee.aggregate([
//       {
//         $lookup: {
//           from: "users",
//           localField: "_id",
//           foreignField: "employeeId",
//           as: "user",
//         },
//       },
//       { $unwind: "$user" },
//       { $match: { "user.isActive": true } },

    
//       { $match: { department: { $ne: null } } },

//       {
//         $group: {
//           _id: "$department",
//           employee_count: { $sum: 1 },
//           total_salary: {
//             $sum: { $ifNull: ["$salary.basic", 0] },
//           },
//         },
//       },
//       {
//         $project: {
//           _id: 0,
//           id: "$_id",
//           name: "$_id",
//           employee_count: 1,
//           total_salary: 1,
//           budget: {
//             $multiply: ["$employee_count", 60000],
//           },
//         },
//       },
//       { $sort: { employee_count: -1 } },
//     ]);

//     res.json({ success: true, data: result });
//   } catch (error) {
//     console.error("getDepartmentBudgets error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };


//final

import { Request, Response } from "express";
import Employee from "../models/Employee.model";
import Attendance from "../models/Attendance.model";
import Leave from "../models/leave.model";
import User from "../models/User.model";

/* =========================================================
   HELPER: Build Employee Filter
========================================================= */
const buildEmployeeFilter = (query: any) => {
  const { department, role } = query;
  const filter: any = {};

  if (department && department !== "all") {
    filter.department = department;
  }

  if (role && role !== "all") {
    filter.designation = role;
  }

  return filter;
};

/* =========================================================
   HELPER: Get Employees Linked To ACTIVE Users
========================================================= */
const getFilteredEmployees = async (query: any) => {
  const filter = buildEmployeeFilter(query);

  const activeUsers = await User.find({ isActive: true })
    .select("_id employeeId")
    .lean();

  const activeEmployeeIds = activeUsers
    .map((u: any) => u.employeeId)
    .filter(Boolean);

  const employees = await Employee.find({
    ...filter,
    _id: { $in: activeEmployeeIds },
  })
    .select(
      "department salary.basic joiningDate firstName lastName designation"
    )
    .lean();

  const userIds = activeUsers.map((u: any) => u._id);

  return { employees, userIds };
};

/* =========================================================
   SUMMARY (KPI)
========================================================= */
export const getSummary = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query as any;
    const { employees, userIds } = await getFilteredEmployees(req.query);

    const headcount = employees.length;

    const totalPayroll = employees.reduce(
      (sum: number, e: any) => sum + (e.salary?.basic || 0),
      0
    );

    const match: any = { userId: { $in: userIds } };

    if (startDate && endDate) {
      match.date = { $gte: startDate, $lte: endDate };
    }

    const attendanceAgg = await Attendance.aggregate([
      { $match: match },
      {
        $group: {
          _id: null,
          totalHours: { $sum: { $ifNull: ["$totalHours", 0] } },
          totalDays: { $sum: 1 },
          presentDays: {
            $sum: {
              $cond: [
                { $in: ["$status", ["Present", "Late", "Half Day"]] },
                1,
                0,
              ],
            },
          },
        },
      },
    ]);

    const totalHours = attendanceAgg[0]?.totalHours || 0;
    const totalDays = attendanceAgg[0]?.totalDays || 0;
    const presentDays = attendanceAgg[0]?.presentDays || 0;

    res.json({
      success: true,
      data: {
        headcount,
        activeEmployees: headcount,
        attritionRate: 0,
        avgAttendance:
          totalDays > 0
            ? Number(((presentDays / totalDays) * 100).toFixed(1))
            : 0,
        totalPayroll,
        totalWorkingHours: Number(totalHours.toFixed(1)),
        avgWorkingHours:
          totalDays > 0
            ? Number((totalHours / totalDays).toFixed(1))
            : 0,
        openPositions: 5,
      },
    });
  } catch (error) {
    console.error("getSummary error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* =========================================================
   WORKFORCE TREND
========================================================= */
export const getWorkforceData = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query as any;

    const start = startDate
      ? new Date(startDate)
      : new Date(new Date().setMonth(new Date().getMonth() - 12));

    const end = endDate ? new Date(endDate) : new Date();

    const monthlyData: any[] = [];
    const current = new Date(start);

    while (current <= end) {
      const monthEnd = new Date(current);
      monthEnd.setMonth(monthEnd.getMonth() + 1);
      monthEnd.setDate(0);

      const count = await User.aggregate([
        { $match: { isActive: true } },
        {
          $lookup: {
            from: "employees",
            localField: "employeeId",
            foreignField: "_id",
            as: "employee",
          },
        },
        { $unwind: "$employee" },
        {
          $match: {
            "employee.joiningDate": { $lte: monthEnd },
          },
        },
        { $count: "total" },
      ]);

      monthlyData.push({
        month: current.toLocaleString("default", {
          month: "short",
          year: "numeric",
        }),
        headcount: count[0]?.total || 0,
      });

      current.setMonth(current.getMonth() + 1);
    }

    res.json({ success: true, data: monthlyData });
  } catch (error) {
    console.error("getWorkforceData error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* =========================================================
   ATTENDANCE TREND
========================================================= */
export const getAttendanceData = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query as any;
    const { userIds } = await getFilteredEmployees(req.query);

    const match: any = { userId: { $in: userIds } };

    if (startDate && endDate) {
      match.date = { $gte: startDate, $lte: endDate };
    }

    const attendance = await Attendance.aggregate([
      { $match: match },
      {
        $group: {
          _id: {
            year: { $substr: ["$date", 0, 4] },
            month: { $substr: ["$date", 5, 2] },
          },
          totalDays: { $sum: 1 },
          presentDays: {
            $sum: {
              $cond: [
                { $in: ["$status", ["Present", "Late", "Half Day"]] },
                1,
                0,
              ],
            },
          },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    const monthNames = [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec",
    ];

    const formatted = attendance.map((item: any) => ({
      month: `${monthNames[parseInt(item._id.month) - 1]} ${item._id.year}`,
      attendance:
        item.totalDays > 0
          ? Number(((item.presentDays / item.totalDays) * 100).toFixed(1))
          : 0,
    }));

    res.json({ success: true, data: formatted });
  } catch (error) {
    console.error("getAttendanceData error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* =========================================================
   DEPARTMENT DISTRIBUTION
========================================================= */
export const getDepartmentData = async (req: Request, res: Response) => {
  try {
    const { employees } = await getFilteredEmployees(req.query);

    const grouped: any = {};

    employees.forEach((emp: any) => {
      if (!emp.department) return;
      if (!grouped[emp.department]) grouped[emp.department] = 0;
      grouped[emp.department]++;
    });

    const result = Object.keys(grouped).map(dep => ({
      department: dep,
      employees: grouped[dep],
    }));

    res.json({ success: true, data: result });
  } catch (error) {
    console.error("getDepartmentData error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* =========================================================
   EMPLOYEE PERFORMANCE
========================================================= */
export const getEmployeePerformance = async (req: Request, res: Response) => {
  try {
    const { search, page = 1, limit = 10 } = req.query as any;
    const { employees } = await getFilteredEmployees(req.query);

    let filtered = employees;

    if (search) {
      filtered = filtered.filter((e: any) =>
        `${e.firstName} ${e.lastName}`
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    const skip = (Number(page) - 1) * Number(limit);
    const paginated = filtered.slice(skip, skip + Number(limit));

    const formatted = paginated.map((emp: any) => ({
      ...emp,
      attendance: 85,
      leaves: 2,
      lateMarks: 1,
      compliance: 90,
      performanceScore: 75,
      grade: "B",
    }));

    res.json({
      success: true,
      data: formatted,
      pagination: {
        total: filtered.length,
        page: Number(page),
        pages: Math.ceil(filtered.length / Number(limit)),
      },
    });
  } catch (error) {
    console.error("getEmployeePerformance error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* =========================================================
   DEPARTMENT WORKING HOURS
========================================================= */
export const getDepartmentWorkingHours = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query as any;
    const { userIds } = await getFilteredEmployees(req.query);

    const match: any = { userId: { $in: userIds } };

    if (startDate && endDate) {
      match.date = { $gte: startDate, $lte: endDate };
    }

    const result = await Attendance.aggregate([
      { $match: match },
      {
        $lookup: {
          from: "employees",
          localField: "userId",
          foreignField: "userId",
          as: "employee",
        },
      },
      { $unwind: "$employee" },
      {
        $group: {
          _id: "$employee.department",
          totalHours: { $sum: { $ifNull: ["$totalHours", 0] } },
          totalRecords: { $sum: 1 },
        },
      },
      {
        $project: {
          department: "$_id",
          totalHours: { $round: ["$totalHours", 1] },
          avgHoursPerDay: {
            $round: [
              { $cond: [{ $eq: ["$totalRecords", 0] }, 0, { $divide: ["$totalHours", "$totalRecords"] }] },
              1,
            ],
          },
        },
      },
    ]);

    res.json({ success: true, data: result });
  } catch (error) {
    console.error("getDepartmentWorkingHours error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* =========================================================
   EXPORT DATA (CSV / PDF)
========================================================= */
export const getExportData = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query as any;
    const { employees, userIds } = await getFilteredEmployees(req.query);

    const match: any = { userId: { $in: userIds } };

    if (startDate && endDate) {
      match.date = { $gte: startDate, $lte: endDate };
    }

    const attendanceAgg = await Attendance.aggregate([
      { $match: match },
      {
        $group: {
          _id: "$userId",
          totalHours: { $sum: { $ifNull: ["$totalHours", 0] } },
          totalDays: { $sum: 1 },
        },
      },
    ]);

    const attendanceMap: any = {};
    attendanceAgg.forEach((a: any) => {
      attendanceMap[a._id] = a;
    });

    const exportData = employees.map((emp: any, index: number) => {
      const userId = userIds[index];
      const att = attendanceMap[userId] || {};

      return {
        Name: `${emp.firstName} ${emp.lastName}`,
        Department: emp.department,
        Role: emp.designation,
        TotalWorkingHours: att.totalHours || 0,
        TotalDays: att.totalDays || 0,
      };
    });

    res.json({ success: true, data: exportData });
  } catch (error) {
    console.error("getExportData error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* =========================================================
   PERFORMANCE INSIGHTS
========================================================= */
export const getPerformanceInsights = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query as any;
    const { employees, userIds } = await getFilteredEmployees(req.query);

    if (!employees.length) {
      return res.json({
        success: true,
        data: {
          topPerformers: [],
          atRiskEmployees: [],
        },
      });
    }

    const match: any = { userId: { $in: userIds } };

    if (startDate && endDate) {
      match.date = { $gte: startDate, $lte: endDate };
    }

    const attendanceAgg = await Attendance.aggregate([
      { $match: match },
      {
        $group: {
          _id: "$userId",
          totalDays: { $sum: 1 },
          presentDays: {
            $sum: {
              $cond: [
                { $in: ["$status", ["Present", "Late", "Half Day"]] },
                1,
                0,
              ],
            },
          },
          lateMarks: {
            $sum: {
              $cond: [{ $eq: ["$status", "Late"] }, 1, 0],
            },
          },
        },
      },
    ]);

    const attendanceMap: any = {};
    attendanceAgg.forEach((a: any) => {
      attendanceMap[a._id] = a;
    });

    const scoredEmployees = employees.map((emp: any, index: number) => {
      const userId = userIds[index];
      const att = attendanceMap[userId] || {};

      const totalDays = att.totalDays || 0;
      const presentDays = att.presentDays || 0;
      const lateMarks = att.lateMarks || 0;

      const attendancePercent =
        totalDays > 0 ? (presentDays / totalDays) * 100 : 0;

      const score =
        attendancePercent * 0.4 +
        (100 - lateMarks * 5) * 0.3 +
        60 * 0.3;

      return {
        name: `${emp.firstName} ${emp.lastName}`,
        department: emp.department,
        role: emp.designation,
        score: Math.round(score),
        attendance: Math.round(attendancePercent),
        lateMarks,
      };
    });

    const sorted = scoredEmployees.sort((a, b) => b.score - a.score);

    res.json({
      success: true,
      data: {
        topPerformers: sorted.slice(0, 5),
        atRiskEmployees: sorted.slice(-5).reverse(),
      },
    });
  } catch (error) {
    console.error("getPerformanceInsights error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
export const getLeaveData = async (req: Request, res: Response) => {
  try {
    const activeUsers = await User.find({ isActive: true })
      .select("_id")
      .lean();

    const activeUserIds = activeUsers.map((u: any) => u._id);

    const data = await Leave.aggregate([
      { $match: { status: "Approved", userId: { $in: activeUserIds } } },
      {
        $group: {
          _id: "$leaveType",
          value: { $sum: 1 },
        },
      },
    ]);

    const formatted = data.map((d: any) => ({
      name: d._id,
      value: d.value,
    }));

    res.json({ success: true, data: formatted });
  } catch (error) {
    console.error("getLeaveData error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* =========================================================
   DEPARTMENT BUDGETS
========================================================= */
export const getDepartmentBudgets = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await Employee.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "employeeId",
          as: "user",
        },
      },
      { $unwind: "$user" },
      { $match: { "user.isActive": true } },

    
      { $match: { department: { $ne: null } } },

      {
        $group: {
          _id: "$department",
          employee_count: { $sum: 1 },
          total_salary: {
            $sum: { $ifNull: ["$salary.basic", 0] },
          },
        },
      },
      {
        $project: {
          _id: 0,
          id: "$_id",
          name: "$_id",
          employee_count: 1,
          total_salary: 1,
          budget: {
            $multiply: ["$employee_count", 60000],
          },
        },
      },
      { $sort: { employee_count: -1 } },
    ]);

    res.json({ success: true, data: result });
  } catch (error) {
    console.error("getDepartmentBudgets error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// import Employee from "../models/Employee.model";

// export const fetchSummary = async (filters: any) => {
//   const { department } = filters;

//   const match: any = {};

//   if (department && department !== "all") {
//     match.department = department;
//   }

//   const headcount = await Employee.countDocuments(match);

//   const activeEmployees = await Employee.countDocuments({
//     ...match,
//     status: "active",
//   });

//   const payroll = await Employee.aggregate([
//     { $match: match },
//     { $group: { _id: null, total: { $sum: "$salary" } } },
//   ]);

//   return {
//     headcount,
//     activeEmployees,
//     attritionRate: 5, // placeholder for now
//     avgAttendance: 94, // placeholder for now
//     totalPayroll: payroll[0]?.total || 0,
//     openPositions: 12, // placeholder
//   };
// };


// import Employee from "../models/Employee.model"
// import Attendance from "../models/Attendance.model"
// import User from "../models/User.model"
// import Requisition from "../models/Requisition.model"

// export const fetchSummary = async (filters: any) => {

//   const { department, startDate, endDate } = filters

//   const employeeMatch: any = {}

//   if (department && department !== "all") {
//     employeeMatch.department = department
//   }

//   /* =================================
//      ACTIVE USERS
//   ================================= */

//   const activeUsers = await User.find({ isActive: true })
//     .select("_id employeeId")
//     .lean()

//   const userIds = activeUsers.map(u => u._id)
//   const employeeIds = activeUsers.map(u => u.employeeId)

//   /* =================================
//      EMPLOYEE DATA
//   ================================= */

//   const employees = await Employee.find({
//     ...employeeMatch,
//     _id: { $in: employeeIds }
//   }).lean()

//   const headcount = employees.length

//   const totalPayroll = employees.reduce(
//     (sum, e: any) => sum + (e.salary?.basic || 0),
//     0
//   )

//   /* =================================
//      ATTENDANCE DATA
//   ================================= */

//   const attendanceMatch: any = {
//     userId: { $in: userIds }
//   }

//   if (startDate && endDate) {
//     attendanceMatch.date = {
//       $gte: new Date(startDate),
//       $lte: new Date(endDate)
//     }
//   }

//   const attendanceAgg = await Attendance.aggregate([
//     { $match: attendanceMatch },
//     {
//       $group: {
//         _id: null,
//         totalHours: { $sum: { $ifNull: ["$totalHours", 0] } },
//         totalDays: { $sum: 1 },
//         presentDays: {
//           $sum: {
//             $cond: [
//               { $in: ["$status", ["Present", "Late", "Half Day"]] },
//               1,
//               0
//             ]
//           }
//         }
//       }
//     }
//   ])

//   const totalHours = attendanceAgg[0]?.totalHours || 0
//   const totalDays = attendanceAgg[0]?.totalDays || 0
//   const presentDays = attendanceAgg[0]?.presentDays || 0

//   const avgAttendance =
//     totalDays > 0
//       ? Number(((presentDays / totalDays) * 100).toFixed(1))
//       : 0

//   const avgWorkingHours =
//     totalDays > 0
//       ? Number((totalHours / totalDays).toFixed(1))
//       : 0

//   /* =================================
//      OPEN POSITIONS
//   ================================= */

//   const openPositions = await Requisition.countDocuments({
//     status: "Open"
//   })

//   return {
//     headcount,
//     activeEmployees: headcount,
//     attritionRate: 0,
//     avgAttendance,
//     totalPayroll,
//     totalWorkingHours: totalHours,
//     avgWorkingHours,
//     openPositions
//   }
// }


//Final

import Employee from "../models/Employee.model";
import Attendance from "../models/Attendance.model";
import User from "../models/User.model";
import Requisition from "../models/Requisition.model";

export const fetchSummary = async (filters: any) => {

  const { department, startDate, endDate } = filters;

  /* =====================================================
     EMPLOYEE FILTER
  ===================================================== */

  const employeeMatch: any = {};

  if (department && department !== "all") {
    employeeMatch.department = department;
  }

  /* =====================================================
     FETCH ACTIVE USERS
     (Only select needed fields to reduce payload)
  ===================================================== */

  const activeUsers = await User.find(
    { isActive: true },
    { _id: 1, employeeId: 1 }
  ).lean();

  const userIds = activeUsers.map((u: any) => u._id);

  const employeeIds = activeUsers
    .map((u: any) => u.employeeId)
    .filter(Boolean);

  /* =====================================================
     FETCH EMPLOYEES + PAYROLL
  ===================================================== */

  const employees = await Employee.find(
    {
      ...employeeMatch,
      _id: { $in: employeeIds }
    },
    {
      salary: 1,
      department: 1
    }
  ).lean();

  const headcount = employees.length;

  const totalPayroll = employees.reduce(
    (sum: number, e: any) =>
      sum + (e?.salary?.basic || 0),
    0
  );

  /* =====================================================
     ATTENDANCE FILTER
  ===================================================== */

  const attendanceMatch: any = {
    userId: { $in: userIds }
  };

  if (startDate && endDate) {
    attendanceMatch.date = {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    };
  }

  /* =====================================================
     ATTENDANCE AGGREGATION
     (Single pipeline for performance)
  ===================================================== */

  const attendanceAgg = await Attendance.aggregate([
    { $match: attendanceMatch },

    {
      $group: {
        _id: null,

        totalHours: {
          $sum: { $ifNull: ["$totalHours", 0] }
        },

        totalDays: { $sum: 1 },

        presentDays: {
          $sum: {
            $cond: [
              { $in: ["$status", ["Present", "Late", "Half Day"]] },
              1,
              0
            ]
          }
        }
      }
    }
  ]);

  const attendanceData = attendanceAgg[0] || {};

  const totalHours = attendanceData.totalHours || 0;
  const totalDays = attendanceData.totalDays || 0;
  const presentDays = attendanceData.presentDays || 0;

  const avgAttendance =
    totalDays > 0
      ? Number(((presentDays / totalDays) * 100).toFixed(1))
      : 0;

  const avgWorkingHours =
    totalDays > 0
      ? Number((totalHours / totalDays).toFixed(1))
      : 0;

  /* =====================================================
     OPEN POSITIONS
  ===================================================== */

  const openPositions = await Requisition.countDocuments({
    status: "Open"
  });

  /* =====================================================
     FINAL SUMMARY
  ===================================================== */

  return {
    headcount,
    activeEmployees: headcount,
    attritionRate: 0,
    avgAttendance,
    totalPayroll,
    totalWorkingHours: Number(totalHours.toFixed(1)),
    avgWorkingHours,
    openPositions
  };
};
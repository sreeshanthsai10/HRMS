// // // import { ROLES } from "./roles";

// // // export const REPORTS_RBAC = {

// // //   [ROLES.CEO]: {
// // //     tabs: ["executive","workforce","productivity","performance"],
// // //     scope: "Organization",
// // //     level: "Full",
// // //     canExport: true
// // //   },

// // //   [ROLES.HR_MANAGER]: {
// // //     tabs: ["executive","workforce","productivity","performance"],
// // //     scope: "Organization",
// // //     level: "Full",
// // //     canExport: true
// // //   },

// // //   [ROLES.HR_OFFICER]: {
// // //     tabs: ["workforce","performance"],
// // //     scope: "Organization",
// // //     level: "Partial",
// // //     canExport: false
// // //   },

// // //   [ROLES.DEPARTMENT_MANAGER]: {
// // //     tabs: ["workforce","performance"],
// // //     scope: "Department",
// // //     level: "Department Only",
// // //     canExport: false
// // //   },

// // //   [ROLES.DIRECT_MANAGER]: {
// // //     tabs: ["workforce","productivity"],
// // //     scope: "Team",
// // //     level: "Team Only",
// // //     canExport: false
// // //   },

// // //   [ROLES.PROJECT_MANAGER]: {
// // //     tabs: ["productivity"],
// // //     scope: "Project",
// // //     level: "Project Only",
// // //     canExport: false
// // //   },

// // //   [ROLES.EMPLOYEE]: {
// // //     tabs: ["self"],
// // //     scope: "Self",
// // //     level: "Self Only",
// // //     canExport: false
// // //   },

// // //   [ROLES.PAYROLL_OFFICER]: {
// // //     tabs: ["workforce"],
// // //     scope: "Organization",
// // //     level: "Payroll Linked",
// // //     canExport: false
// // //   },

// // //   [ROLES.ADMIN]: {
// // //     tabs: ["executive","workforce","productivity","performance"],
// // //     scope: "Organization",
// // //     level: "System Override",
// // //     canExport: true
// // //   }

// // // };
// // import { ROLES } from "./roles";

// // export const REPORTS_RBAC = {
// //   [ROLES.CEO]: {
// //     tabs: ["executive","workforce","productivity","performance"],
// //     scope: "Organization",
// //     canExport: true
// //   },

// //   [ROLES.HR_MANAGER]: {
// //     tabs: ["executive","workforce","productivity","performance"],
// //     scope: "Organization",
// //     canExport: true
// //   },

// //   [ROLES.HR_OFFICER]: {
// //     tabs: ["workforce","performance"],
// //     scope: "Organization",
// //     canExport: false
// //   },

// //   [ROLES.DEPARTMENT_MANAGER]: {
// //     tabs: ["workforce","performance"],
// //     scope: "Department",
// //     canExport: false
// //   },

// //   [ROLES.DIRECT_MANAGER]: {
// //     tabs: ["workforce","productivity"],
// //     scope: "Team",
// //     canExport: false
// //   },

// //   [ROLES.PROJECT_MANAGER]: {
// //     tabs: ["productivity"],
// //     scope: "Project",
// //     canExport: false
// //   },

// //   [ROLES.EMPLOYEE]: {
// //     tabs: ["self"],
// //     scope: "Self",
// //     canExport: false
// //   }
// // };

// import { ROLES } from "./roles";

// export const REPORTS_RBAC = {

//   [ROLES.CEO]: {
//     tabs: ["executive","workforce","productivity","performance"],
//     scope: "organization",
//     canExport: true
//   },

//   [ROLES.COUNTRY_MANAGER]: {
//     tabs: ["executive","workforce","productivity","performance"],
//     scope: "organization",
//     canExport: true
//   },

//   [ROLES.HR_MANAGER]: {
//     tabs: ["executive","workforce","productivity","performance"],
//     scope: "organization",
//     canExport: true
//   },

//   [ROLES.HR_OFFICER]: {
//     tabs: ["workforce","performance"],
//     scope: "organization",
//     canExport: false
//   },

//   [ROLES.DEPARTMENT_MANAGER]: {
//     tabs: ["workforce","performance"],
//     scope: "department",
//     canExport: false
//   },

//   [ROLES.DIRECT_MANAGER]: {
//     tabs: ["workforce","productivity"],
//     scope: "team",
//     canExport: false
//   },

//   [ROLES.PROJECT_MANAGER]: {
//     tabs: ["productivity"],
//     scope: "team",
//     canExport: false
//   },

//   [ROLES.OPERATIONS_MANAGER]: {
//     tabs: ["workforce","productivity"],
//     scope: "team",
//     canExport: false
//   },

//   [ROLES.CAMP_BOSS]: {
//     tabs: ["workforce"],
//     scope: "camp",
//     canExport: false
//   },

//   [ROLES.PAYROLL_OFFICER]: {
//     tabs: ["workforce"],
//     scope: "organization",
//     canExport: false
//   },

//   [ROLES.ADMIN]: {
//     tabs: ["executive","workforce","productivity","performance"],
//     scope: "organization",
//     canExport: true
//   },

//   [ROLES.EMPLOYEE]: {
//     tabs: ["self"],
//     scope: "self",
//     canExport: false
//   }

// };

//final
import { ROLES } from "./roles";

/*
=========================================================
VALID REPORT TABS
=========================================================
*/

export const REPORT_TABS = [
  "executive",
  "workforce",
  "productivity",
  "performance",
  "self"
];

/*
=========================================================
RBAC CONFIGURATION
=========================================================
*/

export const REPORTS_RBAC = {

  [ROLES.CEO]: {
    tabs: ["executive","workforce","productivity","performance"],
    scope: "organization",
    canExport: true
  },

  [ROLES.COUNTRY_MANAGER]: {
    tabs: ["executive","workforce","productivity","performance"],
    scope: "organization",
    canExport: true
  },

  [ROLES.ADMIN]: {
    tabs: ["executive","workforce","productivity","performance"],
    scope: "organization",
    canExport: true
  },

  [ROLES.HR_MANAGER]: {
    tabs: ["executive","workforce","productivity","performance"],
    scope: "organization",
    canExport: true
  },

  [ROLES.HR_OFFICER]: {
    tabs: ["workforce","performance"],
    scope: "organization",
    canExport: false
  },

  [ROLES.DEPARTMENT_MANAGER]: {
    tabs: ["workforce","performance"],
    scope: "department",
    canExport: false
  },

  [ROLES.DIRECT_MANAGER]: {
    tabs: ["workforce","productivity","performance"],
    scope: "team",
    canExport: false
  },

  [ROLES.PROJECT_MANAGER]: {
    tabs: ["productivity","performance"],
    scope: "team",
    canExport: false
  },

  [ROLES.OPERATIONS_MANAGER]: {
    tabs: ["workforce","productivity"],
    scope: "team",
    canExport: false
  },

  [ROLES.CAMP_BOSS]: {
    tabs: ["workforce"],
    scope: "camp",
    canExport: false
  },

  [ROLES.PAYROLL_OFFICER]: {
    tabs: ["workforce"],
    scope: "organization",
    canExport: false
  },

  [ROLES.EMPLOYEE]: {
    tabs: ["self"],
    scope: "self",
    canExport: false
  }

};

/*
=========================================================
SAFE RBAC GETTER
Prevents dashboard crash if role missing
=========================================================
*/

export function getReportsRBAC(role) {

  if (!role) return null;

  const normalized = role
    .toUpperCase()
    .replace(/\s+/g, "_");

  const config = REPORTS_RBAC[normalized];

  if (!config) {
    console.warn(
      `Reports RBAC missing for role: ${normalized}`
    );
    return null;
  }

  return config;

}

/*
=========================================================
CHECK TAB ACCESS
=========================================================
*/

export function canAccessReportTab(role, tab) {

  const config = getReportsRBAC(role);

  if (!config) return false;

  return config.tabs.includes(tab);

}

/*
=========================================================
CHECK EXPORT PERMISSION
=========================================================
*/

export function canExportReports(role) {

  const config = getReportsRBAC(role);

  if (!config) return false;

  return config.canExport === true;

}
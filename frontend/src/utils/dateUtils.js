// // Get last 12 months (default fallback)
// export const getLast12Months = () => {
//   const months = [];
//   const today = new Date();

//   for (let i = 11; i >= 0; i--) {
//     const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
//     months.push({
//       label: d.toLocaleString("default", {
//         month: "short",
//         year: "numeric",
//       }),
//       value: d.toISOString().split("T")[0],
//     });
//   }

//   return months;
// };


// export const getMonthsBetween = (startDate, endDate) => {
//   if (!startDate || !endDate) return [];

//   const start = new Date(startDate);
//   const end = new Date(endDate);

//   const months = [];
//   const current = new Date(start);

//   while (current <= end) {
//     months.push({
//       label: current.toLocaleString("default", {
//         month: "short",
//         year: "numeric",
//       }),
//       value: current.toISOString().split("T")[0],
//     });

//     current.setMonth(current.getMonth() + 1);
//   }

//   return months;
// };


//final

/*
=========================================================
DATE UTILITIES
Used by Reports Dashboard Charts
=========================================================
*/

const MONTH_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
});

/*
=========================================================
FORMAT MONTH LABEL
=========================================================
*/

export function formatMonth(date) {

  if (!(date instanceof Date) || isNaN(date)) {
    return "";
  }

  return MONTH_FORMATTER.format(date);

}

/*
=========================================================
GET LAST 12 MONTHS
Used as default chart range
=========================================================
*/

export function getLast12Months() {

  const months = [];
  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth();

  for (let i = 11; i >= 0; i--) {

    const d = new Date(year, month - i, 1);

    months.push({
      label: formatMonth(d),
      value: d.toISOString().slice(0, 10),
    });

  }

  return months;

}

/*
=========================================================
GET MONTH RANGE BETWEEN TWO DATES
=========================================================
*/

export function getMonthsBetween(startDate, endDate) {

  if (!startDate || !endDate) return [];

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start) || isNaN(end)) return [];

  const months = [];

  let current = new Date(
    start.getFullYear(),
    start.getMonth(),
    1
  );

  const endMonth = new Date(
    end.getFullYear(),
    end.getMonth(),
    1
  );

  while (current <= endMonth) {

    months.push({
      label: formatMonth(current),
      value: current.toISOString().slice(0, 10),
    });

    current = new Date(
      current.getFullYear(),
      current.getMonth() + 1,
      1
    );

  }

  return months;

}

/*
=========================================================
GET CURRENT MONTH RANGE
=========================================================
*/

export function getCurrentMonthRange() {

  const now = new Date();

  const start = new Date(
    now.getFullYear(),
    now.getMonth(),
    1
  );

  const end = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0
  );

  return {
    startDate: start.toISOString().slice(0, 10),
    endDate: end.toISOString().slice(0, 10),
  };

}

/*
=========================================================
GET LAST N MONTHS
Useful for reports filters
=========================================================
*/

export function getLastNMonths(n = 3) {

  const months = [];
  const today = new Date();

  for (let i = n - 1; i >= 0; i--) {

    const d = new Date(
      today.getFullYear(),
      today.getMonth() - i,
      1
    );

    months.push({
      label: formatMonth(d),
      value: d.toISOString().slice(0, 10),
    });

  }

  return months;

}
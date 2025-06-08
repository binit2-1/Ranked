import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

const today = new Date();
const startOfYear = new Date(today.getFullYear(), 0, 1);
const endOfYear = new Date(today.getFullYear(), 11, 31);

function shiftDate(date, numDays) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

function getRange(count) {
  return Array.from({ length: count }, (_, i) => i);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate mock data for every day in the year
function generateYearMockData() {
  const daysInYear = Math.ceil((endOfYear - startOfYear) / (1000 * 60 * 60 * 24)) + 1;
  return getRange(daysInYear).map(index => {
    const date = shiftDate(startOfYear, index);
    return {
      date: date.toISOString().slice(0, 10),
      count: getRandomInt(0, 5),
    };
  });
}

// ---
// BACKEND INTEGRATION TIPS:
// 1. The backend should provide an array of objects for the current year, where each object is:
//    { date: 'YYYY-MM-DD', count: <number of matches played on that day> }
// 2. The frontend expects this array as the 'values' prop for CalendarHeatmap.
// 3. The color intensity is determined by the 'count' field (see classForValue below).
// 4. If a day is missing from the array, it will be treated as 0 matches (color-fuchsia-0).
// 5. To integrate, replace 'generateYearMockData()' with a prop or API call that fetches the real data for the logged-in user.
// 6. Example API response:
//    [ { date: '2025-01-01', count: 2 }, { date: '2025-01-02', count: 0 }, ... ]
// 7. The backend should ensure all days in the year are present, or the frontend should fill missing days with count: 0.
// ---

export default function Heatmap({ data }) {
  // If 'data' is not provided, fallback to mock data for development
  const yearMockData = data || generateYearMockData();
  return (
    <div style={{ width: "100%", maxWidth: 1100, margin: "0 auto", fontFamily: 'inherit', color: '#fff', background: 'transparent', overflow: 'hidden' }}>
      <CalendarHeatmap
        startDate={startOfYear}
        endDate={endOfYear}
        values={yearMockData}
        classForValue={value => {
          const todayStr = new Date().toISOString().slice(0, 10);
          if (!value || value.count === 0) {
            // Future days
            if (value && value.date > todayStr) return "color-fuchsia-future";
            return "color-fuchsia-0";
          }
          if (value.date > todayStr) return "color-fuchsia-future";
          if (value.count >= 8) return "color-fuchsia-5";
          if (value.count >= 5) return "color-fuchsia-4";
          if (value.count >= 3) return "color-fuchsia-3";
          if (value.count >= 2) return "color-fuchsia-2";
          return "color-fuchsia-1";
        }}
        tooltipDataAttrs={value => {
          if (!value || !value.date) return null;
          const todayStr = new Date().toISOString().slice(0, 10);
          if (value.date > todayStr) {
            return {
              'data-tooltip': `Day yet to come (${value.date})`,
            };
          }
          if (value.count) {
            return {
              'data-tooltip': `${value.count} matches on ${value.date}`,
            };
          }
          return {
            'data-tooltip': `No matches on ${value.date}`,
          };
        }}
        showWeekdayLabels={true}
        horizontal={true}
        gutterSize={2}
        squareSize={13}
        onClick={value => value && alert(`Clicked on value with count: ${value.count}`)}
      />
    </div>
  );
}

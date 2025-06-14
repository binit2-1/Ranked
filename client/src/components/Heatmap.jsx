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
  // Find the max matches played in a single day for relative coloring
  const maxCount = Math.max(...yearMockData.map(d => d.count || 0));
  return (
    <div style={{ width: "100%", maxWidth: 1100, margin: "0 auto", fontFamily: 'inherit', color: '#fff', background: 'transparent', overflow: 'hidden' }}>
      <h2 style={{ fontWeight: 700, fontSize: '1.5rem', marginBottom: '1.5rem', letterSpacing: '-0.01em', fontFamily: 'inherit', color: 'inherit', textAlign: 'center' }}>
        Daily Activity
      </h2>
      <CalendarHeatmap
        startDate={startOfYear}
        endDate={endOfYear}
        values={yearMockData}
        classForValue={value => {
          const todayStr = new Date().toISOString().slice(0, 10);
          if (!value || value.count === 0) {
            if (value && value.date > todayStr) return "color-fuchsia-future";
            return "color-fuchsia-0";
          }
          if (value.date > todayStr) return "color-fuchsia-future";
          // Relative coloring based on percentage of maxCount
          const percent = value.count / (maxCount || 1);
          if (percent >= 0.8) return "color-fuchsia-5";
          if (percent >= 0.6) return "color-fuchsia-4";
          if (percent >= 0.4) return "color-fuchsia-3";
          if (percent >= 0.2) return "color-fuchsia-2";
          return "color-fuchsia-1";
        }}
        titleForValue={value => {
          if (!value || !value.date) return '';
          const todayStr = new Date().toISOString().slice(0, 10);
          const friendly = new Date(value.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          });

          if (value.date > todayStr) {
            return `Day yet to come (${friendly})`;
          }

          const count = value.count || 0;
          const label = count === 1 ? 'match' : 'matches';
          return `${count} ${label} on ${friendly}`;
        }}
        showWeekdayLabels={true}
        horizontal={true}
        gutterSize={2}
        squareSize={13}
        onClick={value => value && alert(`Clicked on value with count: ${value.count}`)}
      />
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: '2.5rem',
        width: '100%',
        maxWidth: 1100,
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: '0.95rem',
        color: '#fff',
        fontFamily: 'inherit',
      }}>
        {/* Left: Color scale legend */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontWeight: 500, marginRight: 4 }}>Less</span>
          <span style={{ width: 18, height: 18, background: '#fdf4ff', borderRadius: 4, display: 'inline-block', border: '1px solid #a21caf' }}></span>
          <span style={{ width: 18, height: 18, background: '#f5d0fe', borderRadius: 4, display: 'inline-block', border: '1px solid #a21caf' }}></span>
          <span style={{ width: 18, height: 18, background: '#e879f9', borderRadius: 4, display: 'inline-block', border: '1px solid #a21caf' }}></span>
          <span style={{ width: 18, height: 18, background: '#c026d3', borderRadius: 4, display: 'inline-block', border: '1px solid #a21caf' }}></span>
          <span style={{ width: 18, height: 18, background: '#a21caf', borderRadius: 4, display: 'inline-block', border: '1px solid #a21caf' }}></span>
          <span style={{ width: 18, height: 18, background: '#701a75', borderRadius: 4, display: 'inline-block', border: '1px solid #a21caf', marginRight: 8 }}></span>
          <span style={{ fontWeight: 500 }}>More</span>
        </div>
        {/* Right: Future day info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ width: 18, height: 18, background: '#44444a', borderRadius: 4, display: 'inline-block', border: '1px solid #a21caf' }}></span>
          <span>Future day</span>
        </div>
      </div>
    </div>
  );
}

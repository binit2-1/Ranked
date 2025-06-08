import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

const today = new Date();

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

export default function Heatmap({ values, startDate, endDate }) {
  // If no values provided, generate random demo data
  const randomValues = values || getRange(200).map(index => ({
    date: shiftDate(today, -index),
    count: getRandomInt(0, 5),
  }));
  const start = startDate || shiftDate(today, -150);
  const end = endDate || today;
  return (
    <div>
      <CalendarHeatmap
        startDate={start}
        endDate={end}
        values={randomValues}
        classForValue={value => {
          if (!value || value.count === 0) {
            return "color-fuchsia-0";
          }
          if (value.count >= 8) return "color-fuchsia-5";
          if (value.count >= 5) return "color-fuchsia-4";
          if (value.count >= 3) return "color-fuchsia-3";
          if (value.count >= 2) return "color-fuchsia-2";
          return "color-fuchsia-1";
        }}
        tooltipDataAttrs={value => {
          if (!value || !value.date) return null;
          return {
            'data-tooltip': value.count
              ? `${value.count} matches on ${value.date instanceof Date ? value.date.toISOString().slice(0, 10) : value.date}`
              : `No matches on ${value.date instanceof Date ? value.date.toISOString().slice(0, 10) : value.date}`,
          };
        }}
        showWeekdayLabels={true}
        onClick={value => value && alert(`Clicked on value with count: ${value.count}`)}
      />
    </div>
  );
}

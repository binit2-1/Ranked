import axios from "../lib/axios";
import React, { useEffect } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

const currentDate = new Date();
const oneYearBack = new Date();
oneYearBack.setFullYear(currentDate.getFullYear() - 1);

export default function Heatmap() {
  const [data , setData] = React.useState(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get('/userActivity');
      if (response.data.success) {
        setData(response.data.activity);
        // console.log('User activity data fetched successfully:', response.data.activity);
      }
    } catch (error) {
      console.error('Error fetching user activity:', error?.response?.data || error.message);
    }
  };
  fetchData();
}, []);

  
  return (
    <div style={{ width: "100%", maxWidth: 1100, margin: "0 auto", fontFamily: 'inherit', color: '#fff', background: 'transparent', overflow: 'hidden' }}>
      <h2 style={{ fontWeight: 700, fontSize: '1.5rem', marginBottom: '1.5rem', letterSpacing: '-0.01em', fontFamily: 'inherit', color: 'inherit', textAlign: 'center' }}>
        Daily Activity
      </h2>
      {data &&
        <CalendarHeatmap
          startDate={oneYearBack}
          endDate={currentDate}
          values={data}
          classForValue={value => {
            const todayStr = new Date().toISOString().slice(0, 10);
            if (!value || value.count === 0) {
              if (value && value.date > todayStr) return "color-fuchsia-future";
              return "color-fuchsia-0";
            }
            if (value.date > todayStr) return "color-fuchsia-future";
            // Relative coloring based on percentage of maxCount
            const percent = parseInt(value.count) 
            if (percent >= 8) return "color-fuchsia-5";
            if (percent >= 4) return "color-fuchsia-4";
            if (percent >= 2) return "color-fuchsia-3";
            if (percent >= 0) return "color-fuchsia-2";
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
        />
      }
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

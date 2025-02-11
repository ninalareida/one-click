import React from 'react';
import Shift from './Shift.tsx';

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const ShiftPlan = () => {
  return (
    <div className="schedule">
      {days.map((day) => (
        <div key={day} className="day">
          <h2>{day}</h2>
          <div className="shifts">
            <Shift />
            <Shift />
            <Shift />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShiftPlan;

import React from 'react';
import { ShiftProps } from '../types/component.types';

const Shift = (props: ShiftProps) => {
  return (
    <div className="shift">
      <p className="employee-name">{props.name}</p>
      <p className="shift-type">{props.shiftType}</p>
    </div>
  );
};

export default Shift;
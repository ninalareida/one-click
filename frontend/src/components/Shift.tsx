import React from 'react';
import { ShiftProps } from '../types/component.types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faMoon, faMugSaucer, faSun } from '@fortawesome/free-solid-svg-icons';

const Shift = (props: ShiftProps) => {


  const getIconForShiftType = () => {
    switch(props.shiftType) {
      case 'early':
        return faMugSaucer;
      case 'middle':
        return faSun ;
      case 'late':
        return faMoon;
      default:
        return faClock;
    }
  };
  return (
    <div className="shift" data-type={props.shiftType}>
      <FontAwesomeIcon icon={getIconForShiftType()} className="shift-icon" />
      <p className="employee-name">{props.name}</p>
      <p className="shift-type">{props.shiftType}</p>
    </div>
  );
};


export default Shift;
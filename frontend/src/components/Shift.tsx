import React from 'react';
import { ShiftProps } from '../types/component.types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faMoon, faMugSaucer, faSun } from '@fortawesome/free-solid-svg-icons';

// Das Shift Component dient der Anzeige jeder Schicht mit dem jeweiligen Namen und Schichttyp.
const Shift = (props: ShiftProps) => {
  console.log('Shift props:', props);

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
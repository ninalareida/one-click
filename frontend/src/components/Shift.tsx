import React from 'react';
import { ShiftProps } from '../types/component.types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faMoon, faMugSaucer, faSun } from '@fortawesome/free-solid-svg-icons';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { motion } from 'framer-motion';

// Das Shift Component dient der Anzeige jeder Schicht mit dem jeweiligen Namen und Schichttyp.
const Shift = (props: ShiftProps) => {
  // Make shift draggable
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: props.id.toString(), // Ensure ID is a string for drag context
  });

  // Make shift droppable
  const { setNodeRef: dropRef } = useDroppable({
    id: props.id.toString(),
  });

  const getIconForShiftType = () => {
    switch (props.shiftType) {
      case 'early':
        return faMugSaucer;
      case 'middle':
        return faSun;
      case 'late':
        return faMoon;
      default:
        return faClock;
    }
  };

  return (
    <motion.div
      ref={(node) => {
        setNodeRef(node);
        dropRef(node);
      }}
      {...listeners}
      {...attributes}
      className={`shift ${isDragging ? 'dragging' : ''}`}
      data-type={props.shiftType}
      style={{
        zIndex: isDragging ? 999 : 'auto',
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      animate={{
        x: transform ? transform.x : 0, 
        y: transform ? transform.y : 0, 
        scale: isDragging ? 1.15 : 1,
        opacity: isDragging ? 0.9 : 1, 
      }}
      transition={{ 
        type: "spring", 
        stiffness: 400,
        damping: 15,
        mass: 0.5
      }}
    >
      <FontAwesomeIcon icon={getIconForShiftType()} className="shift-icon" />
      <p className="employee-name">{props.name}</p>
      <p className="shift-type">{props.shiftType}</p>
    </motion.div>
  );
};

export default Shift;

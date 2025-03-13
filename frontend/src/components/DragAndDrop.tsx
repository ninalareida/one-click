import React from 'react';
import { useDraggable } from '@dnd-kit/core';

type DragAndDropProps = {
  id: string;
  name: string;
  shiftType: string;
};

const DragAndDrop = ({ id, name, shiftType }: DragAndDropProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });

  // Inline styles to control the dragging appearance
  const style: React.CSSProperties = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    padding: '8px',
    marginBottom: '8px',
    backgroundColor: '#f0f0f0',
    cursor: 'grab',
    position: 'relative',
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}  // These listeners are needed to handle the drag behavior
      {...attributes} // These attributes help with drag accessibility
    >
      <p>{name} ({shiftType})</p>
    </div>
  );
};

export default DragAndDrop;

import React, { useState, useEffect } from 'react';
import { ShiftPlanProps } from '../types/component.types';
import { ShiftData } from '../types/api.types';
import ShiftService from '../services/api.ts';
import Shift from './Shift.tsx';

const ShiftPlan = (props: ShiftPlanProps) => {
  const [shifts, setShifts] = useState<ShiftData[]>([]);
  const [days, setDays] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Hole verfügbare Tage
        const daysData = await ShiftService.getDays();
        setDays(daysData.days);
        
        // Hole Schichtdaten
        const shiftsData = await ShiftService.getAllShifts();
        setShifts(shiftsData.shifts);
        
        setLoading(false);
      } catch (err) {
        const errorMessage = err instanceof Error 
          ? err.message 
          : 'Fehler beim Laden der Daten. Bitte versuchen Sie es später erneut.';
        
        setError(errorMessage);
        setLoading(false);
        console.error('Fehler beim Laden der Daten:', err);
      }
    };

    fetchData();
  }, []);

  // Filterfunktion für Schichten nach Tag
  const getShiftsForDay = (day: string): ShiftData[] => {
    return shifts.filter(shift => shift.day === day);
  };

  if (loading) {
    return <div className="loading">Daten werden geladen...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="schedule">
      {days.map((day: string) => (
        <div key={day} className="day">
          <h2>{day}</h2>
          <div className="shifts">
            {getShiftsForDay(day).length > 0 ? (
              getShiftsForDay(day).map((shift: ShiftData) => (
                <React.Fragment key={shift.id}>
                  <Shift 
                    name={shift.name}
                    shiftType={shift.shiftType}
                  />
                </React.Fragment>
              ))
            ) : (
              <p className="no-shifts">Keine Schichten für diesen Tag.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShiftPlan;
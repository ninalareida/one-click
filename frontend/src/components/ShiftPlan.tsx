import React, { useState, useEffect } from 'react';
import { ShiftPlanProps } from '../types/component.types';
import { ShiftData } from '../types/api.types';
import ShiftService from '../services/shiftService.ts';
import OpenAiService from '../services/openAiService.ts';
import Shift from './Shift.tsx';
import AIGenerateButton from './AiButton.tsx';

// Das ShiftPlan Component dient der Anzeige der Schichten der Woche.
const ShiftPlan = (props: ShiftPlanProps) => {

  // States initialisieren
  const [shifts, setShifts] = useState<ShiftData[]>([]);
  const [days, setDays] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [generatingPlan, setGeneratingPlan] = useState(false);

  // useEffect-Hook holt Schichtdaten und verfügbare Tage beim ersten Laden ab
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
      } catch (err) {
        setError('Fehler beim Laden der Daten.');
        console.error('Fehler:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  
  //Schichtplangenerierung
  const handleGenerateAIPlan = async () => {
    try {
      setGeneratingPlan(true);
      setError(null);

      const response = await OpenAiService.generateAIShiftPlan();

      if (response.success && response.data) {
        const parsedData = typeof response.data === 'string'
          ? JSON.parse(response.data)
          : response.data;

        setShifts(parsedData); // Update shifts only once here
      } else {
        setError('Fehler bei der KI-Schichtplangenerierung.');
      }
    } catch (err) {
      setError('Fehler bei der KI-Schichtplangenerierung.');
      console.error('Fehler:', err);
    } finally {
      setGeneratingPlan(false);
    }
  };

  const getShiftsForDay = (day: string): ShiftData[] => {
    return shifts.filter(shift => shift.day === day);
  };

  // Anzeige einer Lade-Nachricht, während die Daten abgerufen werden
  if (loading) {
    return <div className="loading">Daten werden geladen...</div>;
  }

  // Anzeige einer Fehlermeldung
  if (error) {
    return <div className="error">{error}</div>;
  }

  // Anzeige der Schichten für jeden Tag
  return (
    <div className="schedule-container">
      <div className="ai-button-container">
        <AIGenerateButton
          onClick={handleGenerateAIPlan}
          isLoading={generatingPlan}
          className="ai-generate-button"
        />
      </div>
      <div className="schedule">
        {days.map((day) => (
          <div key={day} className="day">
            <h2>{day}</h2>
            <div className="shifts">
              {getShiftsForDay(day).map((shift) => (
                <Shift key={shift.id} name={shift.name} shiftType={shift.shiftType} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShiftPlan;
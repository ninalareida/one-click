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

        setLoading(false);
      } catch (err) {
        // Fehlerbehandlung: Überprüfen, ob der Fehler eine Instanz von Error ist
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

  // Anzeige einer Lade-Nachricht, während die Daten abgerufen werden
  if (loading) {
    return <div className="loading">Daten werden geladen...</div>;
  }

  // Anzeige einer Lade-Nachricht, während die Daten abgerufen werden
  if (error) {
    return <div className="error">{error}</div>;
  }

  //Schichtplangenerierung
  const handleGenerateAIPlan = async () => {
    try {
      setGeneratingPlan(true);
      setError(null);

      const response = await OpenAiService.generateAIShiftPlan()

      if (response.success && response.data) {
        let newShifts;

        try {
          const parsedData = typeof response.data === 'string'
            ? JSON.parse(response.data)
            : response.data;

          newShifts = parsedData;
        } catch (parseError) {
          console.error('Fehler beim Parsen der KI-Antwort:', parseError);
          setError('Die KI-Antwort konnte nicht verarbeitet werden.');
          setGeneratingPlan(false);
          return;
        }

        setShifts(newShifts);
      } else {
        setError('Fehler bei der KI-Schichtplangenerierung.');
      }

      setGeneratingPlan(false);
    } catch (err) {
      const errorMessage = err instanceof Error
        ? err.message
        : 'Fehler bei der KI-Schichtplangenerierung. Bitte versuchen Sie es später erneut.';

      setError(errorMessage);
      setGeneratingPlan(false);
      console.error('Fehler bei der KI-Schichtplangenerierung:', err);
    }
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
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
          onShiftsGenerated={handleGenerateAIPlan}
          onError={handleError}
          className="ai-generate-button"
        />
      </div>
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
    </div>
  );

};

export default ShiftPlan;
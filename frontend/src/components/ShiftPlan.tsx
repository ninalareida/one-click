import React, { useState, useEffect } from 'react';
import { ShiftPlanProps } from '../types/component.types';
import { ShiftData } from '../types/api.types';
import ShiftService from '../services/shiftService.ts';
import OpenAiService from '../services/openAiService.ts';
import Shift from './Shift.tsx';
import AIGenerateButton from './AiButton.tsx';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { useDroppable } from '@dnd-kit/core';

const Day = ({ day, children }: { day: string; children: React.ReactNode }) => {
  const { setNodeRef, isOver } = useDroppable({ id: day });

  return (
    <div ref={setNodeRef} className={`day ${isOver ? 'highlight' : ''}`}>
      <h2>{day}</h2>
      <div className="shifts">{children}</div>
    </div>
  );
};

// Das ShiftPlan Component dient der Anzeige der Schichten der Woche.
const ShiftPlan = ({ week }: ShiftPlanProps) => {

  // States initialisieren
  const [shifts, setShifts] = useState<ShiftData[]>([]);
  const [nextWeekShifts, setNextWeekShifts] = useState<ShiftData[] | null>(null);
  const [days, setDays] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  //const [loadingWeek, setLoadingWeek] = useState<string | null>(null);
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);

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

  // Schichtplangenerierung
  const handleGenerateAIPlan = async (targetWeek: 'Next Week' | 'Current Week') => {
    try {
      setIsGenerating(true);
      const response = await OpenAiService.generateAIShiftPlan();

      if (response.success && response.data) {
        const parsedData = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;

        if (targetWeek === 'Next Week') {
          setNextWeekShifts(parsedData);
        } else {
          setShifts(parsedData);
        }

        // Show confirmation message when AI shift plan is successfully generated
        setConfirmationMessage(`AI shift plan for ${targetWeek} has been successfully generated!`);

        // Hide message after 10 seconds
        setTimeout(() => setConfirmationMessage(null), 10000);
      } else {
        setError('Fehler bei der KI-Schichtplangenerierung.');
      }
    } catch (err) {
      setError('Fehler bei der KI-Schichtplangenerierung.');
      console.error('Fehler:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const getShiftsForWeek = () => {
    if (week === 'Current Week') return shifts;
    return nextWeekShifts || shifts;
  };

  const handleDrop = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const draggedShiftId = active.id.toString();
    const targetShiftId = over.id.toString();

    if (draggedShiftId === targetShiftId) return;

    console.log(`Swapping shift names: ${draggedShiftId} ↔ ${targetShiftId}`);

    const swapShiftNames = (shiftsList: ShiftData[] | null) => {
      if (!shiftsList) return shiftsList;

      return shiftsList.map((shift) => {
        if (shift.id.toString() === draggedShiftId) {
          const targetShift = shiftsList.find((s) => s.id.toString() === targetShiftId);
          return targetShift ? { ...shift, name: targetShift.name } : shift;
        }
        if (shift.id.toString() === targetShiftId) {
          const draggedShift = shiftsList.find((s) => s.id.toString() === draggedShiftId);
          return draggedShift ? { ...shift, name: draggedShift.name } : shift;
        }
        return shift;
      });
    };

    if (week === 'Current Week') {
      setShifts((prev) => swapShiftNames(prev) || []);
    } else {
      setNextWeekShifts((prev) => swapShiftNames(prev) || []);
    }
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
    <DndContext onDragEnd={handleDrop}>
      <div className="schedule-container">
        {confirmationMessage && (
          <div className="confirmation-message">{confirmationMessage}</div>
        )}
        {week === 'Current Week' && (
          <div className="ai-button-container">
            <AIGenerateButton label="Regenerate Current Week with AI" onClick={() => handleGenerateAIPlan('Current Week')} />
            { /** <AIGenerateButton label="Generate Next Week with AI" onClick={() => handleGenerateAIPlan('Next Week')} /> */ }
          </div>
        )}
        {week === 'Next Week' && (
          <div className="button-container">
            <AIGenerateButton label={nextWeekShifts ? 'Regenerate Next Week with AI' : 'Generate Next Week with AI'} onClick={() => handleGenerateAIPlan('Next Week')} />
          </div>
        )}
        <div className="schedule">
          {days.map((day) => (
            <Day key={day} day={day}>
              <div className="shifts">
                {getShiftsForWeek()
                  .filter((shift) => shift.day === day)
                  .map((shift) => (
                    <Shift key={shift.id} id={shift.id} day={shift.day} name={shift.name} shiftType={shift.shiftType} />
                  ))}
              </div>
            </Day>
          ))}
        </div>
      </div>
    </DndContext>
  );
};

export default ShiftPlan;

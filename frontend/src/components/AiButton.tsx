import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagicWandSparkles } from '@fortawesome/free-solid-svg-icons';
import OpenAiService from '../services/openAiService.ts';

interface AIGenerateButtonProps {
  onShiftsGenerated: (shifts: any) => void;
  onError: (error: string) => void;
  className?: string;
}

const AIGenerateButton = (props: AIGenerateButtonProps) => {
  const { onShiftsGenerated, onError, className = '' } = props;
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleGenerate = async () => {
    try {
      setIsGenerating(true);
      
      const response = await OpenAiService.generateAIShiftPlan();
      // response von chat gpt hat noch sätze drin die halt kein JSON sind
      //deswegen gibt es immer fehler meldung 
      console.log(response);
      
      if (response.success && response.data) {
        try {
          const parsedData = typeof response.data === 'string' 
            ? JSON.parse(response.data) 
            : response.data;
            
          onShiftsGenerated(parsedData);
        } catch (parseError) {
          console.error('Fehler beim Parsen der KI-Antwort:', parseError);
          onError('Die KI-Antwort konnte nicht verarbeitet werden.');
        }
      } else {
        onError('Fehler bei der KI-Schichtplangenerierung.');
      }
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Fehler bei der KI-Schichtplangenerierung. Bitte versuchen Sie es später erneut.';
      
      onError(errorMessage);
      console.error('Fehler bei der KI-Schichtplangenerierung:', err);
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <div className="ai-button-container">
      <button 
        className={`ai-generate-button ${className}`}
        onClick={handleGenerate}
        disabled={isGenerating}
      >
        <FontAwesomeIcon icon={faMagicWandSparkles} className="ai-icon" />
        {isGenerating ? 'Generiere Schichtplan...' : 'KI-Schichtplan generieren'}
      </button>
    </div>
  );
};

export default AIGenerateButton;
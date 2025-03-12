import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagicWandSparkles, faSpinner } from '@fortawesome/free-solid-svg-icons';

interface AIGenerateButtonProps {
  label: string;
  onClick: () => Promise<void>;
  isLoading: boolean;
  className?: string;

}

const AIGenerateButton = ({ label, onClick, isLoading }: AIGenerateButtonProps) => {
  return (
    <div className="ai-button-container">
      <button 
        className="ai-generate-button" 
        onClick={onClick} 
        disabled={isLoading}
      >
        <FontAwesomeIcon 
          icon={isLoading ? faSpinner : faMagicWandSparkles} 
          className={`ai-icon ${isLoading ? 'spinner' : ''}`} 
        />
        {isLoading ? 'Loading...' : label}
      </button>
    </div>
  );
};

export default AIGenerateButton;
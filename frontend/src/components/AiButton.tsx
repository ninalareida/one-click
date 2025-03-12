import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagicWandSparkles, faSpinner } from '@fortawesome/free-solid-svg-icons';

interface AIGenerateButtonProps {
  onClick: () => void;
  isLoading: boolean;
  className?: string;
}

const AIGenerateButton = ({ onClick, isLoading, className = '' }: AIGenerateButtonProps) => {
  return (
    <div className="ai-button-container">
      <button 
        className={`ai-generate-button ${className}`} 
        onClick={onClick} 
        disabled={isLoading}
      >
        {isLoading ? (
          <FontAwesomeIcon icon={faSpinner} spin className="spinner-icon" />
        ) : (
          <FontAwesomeIcon icon={faMagicWandSparkles} className="ai-icon" />
        )}
        {isLoading ? ' Generiere Schichtplan...' : ' KI-Schichtplan generieren'}
      </button>
    </div>
  );
};

export default AIGenerateButton;
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagicWandSparkles, faSpinner } from '@fortawesome/free-solid-svg-icons';

interface AIGenerateButtonProps {
  label: string;
  onClick: () => Promise<void>;
  className?: string;

}

const AIGenerateButton = ({ label, onClick, className }: AIGenerateButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await onClick(); // Execute the passed function (AI generation)
    } finally {
      setIsLoading(false); // Ensure loading stops even if there's an error
    }
  };

  return (
    <div className={`ai-button-container ${className}`}>
      <button 
        className="ai-generate-button" 
        onClick={handleClick} 
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
import React, { useState } from 'react';
import { HeaderProps } from '../types/component.types';
import logoImage from "../assets/logo.svg";

// Das Header Component wird verwendet, um den Namen der Webanwendung anzuzeigen.
const Header = (props: HeaderProps) => {
  const [selectedWeek, setSelectedWeek] = useState('Week 1');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const weeks = ['Week 1', 'Week 2', 'Week 3'];

  const handleWeekSelect = (week: string) => {
    setSelectedWeek(week);
    setDropdownVisible(false); // Hide dropdown after selection
  };

  return (
    <header className="header">
      <img src={logoImage} alt="Logo" className="logo" />
      <div className="week-selector">
        <span className="selected-week">{selectedWeek}</span>
        <button 
          className="weeks-button" 
          onClick={() => setDropdownVisible(!dropdownVisible)}
        >
          Weeks ▼
        </button>
        {dropdownVisible && (
          <ul className="dropdown">
            {weeks.map((week) => (
              <li 
                key={week} 
                className="dropdown-item"
                onClick={() => handleWeekSelect(week)}
              >
                {week}
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
};

export default Header;
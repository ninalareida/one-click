import React, { useState } from 'react';
import { HeaderProps } from '../types/component.types';
import logoImage from "../assets/logo.svg";

// Das Header Component wird verwendet, um den Namen der Webanwendung anzuzeigen.
const Header = ({ selectedWeek, setSelectedWeek }: HeaderProps) => {
  const weeks = ['Current Week', 'Next Week'];
  const [dropdownVisible, setDropdownVisible] = React.useState(false);

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
            {weeks.map(week => (
              <li 
                key={week} 
                className="dropdown-item"
                onClick={() => {
                  setSelectedWeek(week as 'Current Week' | 'Next Week');
                  setDropdownVisible(false);
                }}
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
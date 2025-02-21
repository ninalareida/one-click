import React from 'react';
import { HeaderProps } from '../types/component.types';

// Das Header Component wird verwendet, um den Namen der Webanwendung anzuzeigen.
const Header = (props: HeaderProps) => {
  return (
    <header className="header">
      One Click
    </header>
  );
};

export default Header;
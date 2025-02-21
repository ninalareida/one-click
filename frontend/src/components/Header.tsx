import React from 'react';
import { HeaderProps } from '../types/component.types';
import logoImage from "../assets/logo.svg";


const Header = (props: HeaderProps) => {
  return (
    <header className="header">
     <img src={logoImage} alt="Logo" className="logo" />
  
    </header>
  );
};

export default Header;
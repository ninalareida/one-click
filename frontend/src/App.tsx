import React, { useState } from 'react';
import Header from "./components/Header.tsx";
import ShiftPlan from "./components/ShiftPlan.tsx";
import "./styles.css";

const App = () => {
  const [selectedWeek, setSelectedWeek] = useState<'Current Week' | 'Next Week'>('Current Week');

  return (
    <div>
      <Header selectedWeek={selectedWeek} setSelectedWeek={setSelectedWeek} />
      <ShiftPlan week={selectedWeek} />
    </div>
  );
};


export default App;

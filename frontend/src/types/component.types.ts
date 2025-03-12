
export interface ShiftProps {
  name: string;
  shiftType: string;
}

export interface HeaderProps {
  selectedWeek: 'Current Week' | 'Next Week';
  setSelectedWeek: (week: 'Current Week' | 'Next Week') => void;
}

export interface ShiftPlanProps {
  week: 'Current Week' | 'Next Week';
}
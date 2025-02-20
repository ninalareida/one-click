// API-Typdefinitionen für Schichten
export interface ShiftData {
    id: number;
    day: string;
    name: string;
    shiftType: string;
  }
  
  export interface ShiftsResponse {
    shifts: ShiftData[];
  }
  
  export interface DaysResponse {
    days: string[];
  }
  
  // API-Typdefinitionen für Mitarbeiter
  export interface Employee {
    id: number;
    name: string;
    position: string;
    department: string;
  }
  
  export interface EmployeesResponse {
    employees: Employee[];
  }
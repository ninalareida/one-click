import axios from 'axios';
import { ShiftData, ShiftsResponse, DaysResponse, Employee, EmployeesResponse } from '../types/api.types';

// Basis-URL für die API
const API_URL = 'http://localhost:5000/api';

// Service für den Zugriff auf die Schichten-API
const ShiftService = {
  // Alle Schichten abrufen
  getAllShifts: async (): Promise<ShiftsResponse> => {
    try {
      const response = await axios.get<ShiftsResponse>(`${API_URL}/shifts`);
      return response.data;
    } catch (error) {
      console.error('Fehler beim Abrufen der Schichten:', error);
      throw error;
    }
  },
  
  // Eine neue Schicht hinzufügen
  addShift: async (shiftData: Omit<ShiftData, "id">): Promise<ShiftData> => {
    try {
      const response = await axios.post<ShiftData>(`${API_URL}/shifts`, shiftData);
      return response.data;
    } catch (error) {
      console.error('Fehler beim Hinzufügen der Schicht:', error);
      throw error;
    }
  },
  
  // Verfügbare Tage abrufen (vereinfachte Version)
  getDays: async (): Promise<DaysResponse> => {
    // Da wir momentan noch keinen Backend-Endpunkt haben,
    // geben wir direkt die Standard-Wochentage zurück
    return Promise.resolve({
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    });
  }
};

// Service für den Zugriff auf die Mitarbeiter-API
export const EmployeeService = {
  // Alle Mitarbeiter abrufen
  getAllEmployees: async (): Promise<EmployeesResponse> => {
    try {
      const response = await axios.get<EmployeesResponse>(`${API_URL}/employees`);
      return response.data;
    } catch (error) {
      console.error('Fehler beim Abrufen der Mitarbeiter:', error);
      throw error;
    }
  },

  // Einen neuen Mitarbeiter hinzufügen
  addEmployee: async (employeeData: Omit<Employee, "id">): Promise<Employee> => {
    try {
      const response = await axios.post<Employee>(`${API_URL}/employees`, employeeData);
      return response.data;
    } catch (error) {
      console.error('Fehler beim Hinzufügen des Mitarbeiters:', error);
      throw error;
    }
  }
};

export default ShiftService;
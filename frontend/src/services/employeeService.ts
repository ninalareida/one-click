import axios from "axios";
import { EmployeesResponse, Employee } from "../types/api.types";


const API_URL = 'http://localhost:5000/api';

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

  export default EmployeeService;
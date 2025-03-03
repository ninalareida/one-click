import axios from "axios";
import { ShiftData, ShiftsResponse, DaysResponse, Employee, EmployeesResponse } from '../types/api.types';

const API_URL = 'http://localhost:5000/api';

//OpenAi Request Schichtplan
export const OpenAiService = {
    generateAIShiftPlan: async (): Promise<any> => {
        try {
            const response = await axios.get<any>(`${API_URL}/ai-shift-plan`);
            return response.data;
        } catch (error) {
            console.error('Fehler beim Generieren des KI-Schichtplans:', error);
            throw error;
        }
    }
}
export default OpenAiService;
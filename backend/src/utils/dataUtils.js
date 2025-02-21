import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname-Äquivalent für ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Pfad zum data-Verzeichnis (zwei Verzeichnisse höher als utils)
const dataDir = path.join(__dirname, '../../data');
const shiftsFilePath = path.join(dataDir, 'shifts.json');
const employeesFilePath = path.join(dataDir, 'employees.json');

// Prüfen, ob die JSON-Dateien existieren, falls nicht, erstelle sie mit leeren Arrays
export const initializeDataFiles = () => {
  // Prüfen und erstellen des data-Verzeichnisses
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
    console.log('Verzeichnis "data" wurde erstellt');
  }

  // Prüfen und erstellen der shifts.json
  if (!fs.existsSync(shiftsFilePath)) {
    const emptyShifts = { shifts: [] };
    fs.writeFileSync(shiftsFilePath, JSON.stringify(emptyShifts, null, 2));
    console.log('Datei "shifts.json" wurde erstellt');
  }

  // Prüfen und erstellen der employees.json
  if (!fs.existsSync(employeesFilePath)) {
    const emptyEmployees = { employees: [] };
    fs.writeFileSync(employeesFilePath, JSON.stringify(emptyEmployees, null, 2));
    console.log('Datei "employees.json" wurde erstellt');
  }
};

export { dataDir, shiftsFilePath, employeesFilePath };
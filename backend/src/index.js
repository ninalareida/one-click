import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname-Äquivalent für ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//express framework initialisieren
const app = express();

//port definieren
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Pfad zum data-Verzeichnis
const dataDir = path.join(__dirname, '../data');
const shiftsFilePath = path.join(dataDir, 'shifts.json');
const employeesFilePath = path.join(dataDir, 'employees.json');

// API-Endpunkte für Schichten
app.get('/api/shifts', (req, res) => {
    try {
      const data = JSON.parse(fs.readFileSync(shiftsFilePath));
      res.json(data);
    } catch (error) {
      console.error('Fehler beim Lesen der Schichtdaten:', error);
      res.status(500).json({ message: 'Fehler beim Abrufen der Schichtdaten' });
    }
  });
  
  app.post('/api/shifts', (req, res) => {
    try {
      const newShift = req.body;
      const data = JSON.parse(fs.readFileSync(shiftsFilePath));
      
      data.shifts.push(newShift);
      
      fs.writeFileSync(shiftsFilePath, JSON.stringify(data, null, 2));
      res.status(201).json(newShift);
    } catch (error) {
      console.error('Fehler beim Speichern der Schichtdaten:', error);
      res.status(500).json({ message: 'Fehler beim Speichern der Schichtdaten' });
    }
  });
  
  // API-Endpunkte für Mitarbeiter
  app.get('/api/employees', (req, res) => {
    try {
      const data = JSON.parse(fs.readFileSync(employeesFilePath));
      res.json(data);
    } catch (error) {
      console.error('Fehler beim Lesen der Mitarbeiterdaten:', error);
      res.status(500).json({ message: 'Fehler beim Abrufen der Mitarbeiterdaten' });
    }
  });
  
  app.post('/api/employees', (req, res) => {
    try {
      const newEmployee = req.body;
      const data = JSON.parse(fs.readFileSync(employeesFilePath));
      
      data.employees.push(newEmployee);
      
      fs.writeFileSync(employeesFilePath, JSON.stringify(data, null, 2));
      res.status(201).json(newEmployee);
    } catch (error) {
      console.error('Fehler beim Speichern der Mitarbeiterdaten:', error);
      res.status(500).json({ message: 'Fehler beim Speichern der Mitarbeiterdaten' });
    }
  });


  // Prüfen, ob die JSON-Dateien existieren, falls nicht, erstelle sie mit leeren Arrays
const initializeDataFiles = () => {
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
  
  // Initialisierung der Daten vor dem Serverstart
  initializeDataFiles();

  // Server starten
app.listen(PORT, () => {
    console.log(`Backend läuft auf Port ${PORT}`);
  });
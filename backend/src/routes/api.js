import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import AIService from '../controllers/aiService.js';

const router = express.Router();

// __dirname-Äquivalent für ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Pfad zum data-Verzeichnis (ein Verzeichnis höher als routes)
const dataDir = path.join(__dirname, '../../data');
const shiftsFilePath = path.join(dataDir, 'shifts.json');
const employeesFilePath = path.join(dataDir, 'employees.json');

// API-Endpunkte zum Abrufen der Schichten
router.get('/shifts', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(shiftsFilePath));
    res.json(data);
  } catch (error) {
    console.error('Fehler beim Lesen der Schichtdaten:', error);
    res.status(500).json({ message: 'Fehler beim Abrufen der Schichtdaten' });
  }
});

// API-Endpunkt zum Speichern einer Schicht
router.post('/shifts', (req, res) => {
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

// API-Endpunkte zum Abrufen der Mitarbeiter
router.get('/employees', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(employeesFilePath));
    res.json(data);
  } catch (error) {
    console.error('Fehler beim Lesen der Mitarbeiterdaten:', error);
    res.status(500).json({ message: 'Fehler beim Abrufen der Mitarbeiterdaten' });
  }
});

// API-Endpunkt zum Speichern eines Mitarbeiters
router.post('/employees', (req, res) => {
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


// Neuer Route für KI-generierte Schichtpläne
router.get('/ai-shift-plan', async (req, res) => {
  try {
    const aiGeneratedPlan = await AIService.generateShiftPlan();
    res.json({ success: true, data: aiGeneratedPlan });
  } catch (error) {
    console.error('Fehler beim Generieren des KI-Schichtplans:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Fehler bei der KI-Schichtplan-Generierung',
      error: error.message 
    });
  }
});

export default router;
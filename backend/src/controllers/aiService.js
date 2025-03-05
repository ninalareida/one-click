import OpenAI from "openai";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Für die Umgebungsvariablen später
import dotenv from 'dotenv';
dotenv.config();

// Pfade zu deinen Datendateien
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, '../../data');
const shiftsFilePath = path.join(dataDir, 'shifts.json');
const employeesFilePath = path.join(dataDir, 'employees.json');

// OpenAI Client initialisieren - später mit Umgebungsvariable ersetzen
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

// Dienst für KI-generierte Schichtpläne
const AIService = {
  // Generiert einen Schichtplan basierend auf vorhandenen Daten
  generateShiftPlan: async () => {
    try {
      // Daten aus den JSON-Dateien laden
      const shiftsData = JSON.parse(fs.readFileSync(shiftsFilePath));
      const employeesData = JSON.parse(fs.readFileSync(employeesFilePath));
      
      // Prompt für die KI erstellen
      const prompt = `
        Basierend auf folgenden Mitarbeiterdaten:
        ${JSON.stringify(employeesData, null, 2)}

        Und bisherigen Schichten:
        ${JSON.stringify(shiftsData, null, 2)}

        Erstelle einen Schichtplan für die kommende Woche. 
        Berücksichtige, dass:
        - Jeder Tag (Monday-Friday) drei Schichten haben sollte: Früh, Mittel, Spät
        - Kein Mitarbeiter sollte mehr als 5 Schichten pro Woche haben
        - Erstelle einen ausgewogenen Plan

        Gib die Antwort ausschließlich als JSON-Array zurück, ohne Codeblöcke, Markdown oder Erklärungen. Nur reines JSON, wie im folgenden Beispiel:

        [
          {
            "id": 1,
            "day": "Monday",
            "name": "Max Mustermann",
            "shiftType": "early"
          }
        ]
        `;
      
      // API-Anfrage an OpenAI
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { "role": "system", "content": "Du bist ein Experte für Schichtplanung." },
          { "role": "user", "content": prompt }
        ],
        temperature: 0.7, // Für etwas Kreativität, aber nicht zu viel
      });
      
      // Antwort extrahieren und JSON parsen
      const aiResponse = completion.choices[0].message.content;
      
      // Hier könntest du die Antwort vor dem Zurückgeben validieren/formatieren
      
      return aiResponse;
    } catch (error) {
      console.error('Fehler bei der KI-Schichtplangenerierung:', error);
      throw error;
    }
  }
};

export default AIService;
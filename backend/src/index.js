import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/api.js';
import { initializeDataFiles } from './utils/dataUtils.js';

// Express-Anwendung initialisieren
const app = express();

// Port definieren
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routen einbinden
app.use('/api', apiRoutes);

// Initialisierung der Daten vor dem Serverstart
initializeDataFiles();

// Server starten
app.listen(PORT, () => {
  console.log(`Backend läuft auf Port ${PORT}`);
});
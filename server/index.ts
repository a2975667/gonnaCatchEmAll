import express, { Request, Response } from 'express';
import pokemonRoutes from './src/routes/pokemonRoutes';
import pokemonSpawnRoutes from './src/routes/pokemonSpawnRoutes';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 3007;
const clientBuildPath = path.join(__dirname, '../client/build');

app.use(express.static(clientBuildPath));

app.use(cors());
app.use(express.json());

app.get('/api/', (req:Request, res:Response) => {
  res.send('Homepage of my Pokedex API.');
});

app.use("/api/pokemon", pokemonRoutes);
app.use("/api/pokemon-spawns", pokemonSpawnRoutes);

app.get('*', (req, res) => {
    const indexFile = path.join(clientBuildPath, 'index.html');
    if (!fs.existsSync(indexFile)) {
      res.status(503).send('Client build missing. Run the client build before serving static assets.');
      return;
    }
    res.sendFile(indexFile);
});

app.listen(PORT, () => {
  console.log(`Pokedex is running on http://localhost:${PORT}`);
});

import express, { Request, Response } from 'express';
import pokemonRoutes from './src/routes/pokemonRoutes';
import pokemonSpawnRoutes from './src/routes/pokemonSpawnRoutes';
import cors from 'cors';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3007;

app.use(express.static(path.join(__dirname, '../client/build')));

app.use(cors());
app.use(express.json());

app.get('/api/', (req:Request, res:Response) => {
  res.send('Homepage of my Pokedex API.');
});

app.use("/api/pokemon", pokemonRoutes);
app.use("/api/pokemon-spawns", pokemonSpawnRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Pokedex is running on http://localhost:${PORT}`);
});

import express, { Request, Response } from 'express';
import pokemonRoutes from './src/routes/pokemonRoutes';
import pokemonSpawnRoutes from './src/routes/pokemonSpawnRoutes';

const app = express();
const PORT = process.env.PORT || 3007;

app.use(express.json());

app.get('/api/', (req:Request, res:Response) => {
  res.send('Homepage of my Pokedex API.');
});

app.use("/api/pokemon", pokemonRoutes);
app.use("/api/pokemon-spawns", pokemonSpawnRoutes);

app.listen(PORT, () => {
  console.log(`Pokedex is running on http://localhost:${PORT}`);
});

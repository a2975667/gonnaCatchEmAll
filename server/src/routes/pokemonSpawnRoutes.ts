import { Router, Request, Response } from "express";
import { getAllPokemonSpawns, getPokemonSpawnByPokemonID, addPokemonSpawn, deletePokemonSpawnbyID, updatePokemonSpawn, getPokemonSpawnBySpawnID } from "../services/database";
import { PokemonSpawn } from "../models/pokemonSpawn";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const allPokemonSpawns: PokemonSpawn[] = await getAllPokemonSpawns();
    res.status(200).json(allPokemonSpawns);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Pokémon spawns" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const pokemonSpawn = await getPokemonSpawnBySpawnID(id);
    if (pokemonSpawn) {
      res.status(200).json(pokemonSpawn);
    } else {
      res.status(404).json({ message: `No Pokémon spawn found with ID ${id}` });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching Pokémon spawn" });
  }
});

router.get("/pokemon/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const pokemonSpawns = await getPokemonSpawnByPokemonID(id);
    res.status(200).json(pokemonSpawns);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Pokémon spawns" });
  }
});


router.post("/", async (req: Request, res: Response) => {
  const newSpawn: Omit<PokemonSpawn, 'spawnID'> = req.body;  // Do not expect spawnID in the request body
  try {
    const spawn = await addPokemonSpawn(newSpawn);
    res.status(201).json(spawn);
  } catch (error) {
    res.status(500).json({ message: "Error adding Pokémon spawn" });
  }
});


router.put("/:id", async (req: Request, res: Response) => {
  const updatedSpawn: PokemonSpawn = req.body;
  try {
    await updatePokemonSpawn(updatedSpawn);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: "Error updating Pokémon spawn" });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    await deletePokemonSpawnbyID(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: "Error deleting Pokémon spawn" });
  }
});

export default router;
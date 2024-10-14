import { Router, Request, Response } from "express";
import { getAllPokemon, getPokemonByID, getPokemonByPokemonName } from "../services/database";
import { Pokemon } from "../models/pokemon";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  // if there is no query parameter, return all Pokémon
  if (!req.query.search) {
    try {
      const allPokemon: Pokemon[] = await getAllPokemon();
      res.status(200).json(allPokemon);
    } catch (error) {
      res.status(500).json({ message: "Error fetching Pokémon" });
    }
  } else {
    const query = req.query.search as string;
    try {
      const pokemon = await getPokemonByPokemonName(query);
      res.status(200).json(pokemon);
    } catch (error) {
      res.status(500).json({ message: "Error fetching Pokémon" });
    }
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const pokemon = await getPokemonByID(id);
    if (pokemon) {
      res.status(200).json(pokemon);
    } else {
      res.status(404).json({ message: `No Pokémon found with ID ${id}` });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching Pokémon" });
  }
});

export default router;

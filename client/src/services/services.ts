import { pokemonData, pokemonSpawnData } from "./mockData";

export interface Pokemon {
    pokemonID: number;
    pokemonName: string;
    type1: string;
    type2?: string; // Optional
    total: number;
    hp: number;
    attack: number;
    defense: number;
    spAtk: number;
    spDef: number;
    speed: number;
    generation: number;
  }

export interface PokemonSpawn {
    spawnID: number;
    num: number;
    name: string;
    lat: number;
    lng: number;
    encounter_ms: number;
    disappear_ms: number;
  }

// all APIs related to Pokémon

export const searchPokemonData = (query: string): Promise<Pokemon[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate a backend search by filtering based on the query
      const filtered = pokemonData.filter((pokemon) =>
        pokemon.pokemonName.toLowerCase().includes(query.toLowerCase())
      );
      resolve(filtered);
    }, 500); // Simulate a 500ms delay
  });
};

// Simulate fetching Pokémon spawn data with delay
export const searchPokemonSpawnData = (query: number): Promise<PokemonSpawn[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate a backend search by filtering based on the query
      const filtered = pokemonSpawnData.filter((pokemon) =>
        pokemon.num === Number(query)
      );
      resolve(filtered);
    }, 500); // Simulate a 500ms delay
  });
}
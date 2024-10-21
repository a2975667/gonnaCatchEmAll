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

export const getPokemonByID = (id: number): Promise<Pokemon | undefined> => {
  return new Promise((resolve) => {
      setTimeout(() => {
          const pokemon = pokemonData.find((pokemon) => pokemon.pokemonID === id);
          resolve(pokemon);
      }, 500); // Simulate a 500ms delay
  });
}

// all APIs related to Pokémon Pokémon spawn data
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

export const addPokemonSpawn = (newSpawn: Omit<PokemonSpawn, 'spawnID'>): Promise<PokemonSpawn> => {
  return new Promise((resolve) => {
      setTimeout(() => {
          const newSpawnID = pokemonSpawnData.length + 1; // Auto-incremented ID
          const createdSpawn = { ...newSpawn, spawnID: newSpawnID };
          pokemonSpawnData.push(createdSpawn);
          resolve(createdSpawn); // Return the created spawn with ID
      }, 500); // Simulate a 500ms delay
  });
};

export const updatePokemonSpawn = (updatedSpawn: PokemonSpawn): Promise<void> => {
  return new Promise((resolve) => {
      setTimeout(() => {
          const index = pokemonSpawnData.findIndex((spawn) => spawn.spawnID === updatedSpawn.spawnID);
          if (index !== -1) {
              pokemonSpawnData[index] = updatedSpawn;
          }
          resolve();
      }, 500); // Simulate a 500ms delay
  });
}

export const deletePokemonSpawn = (spawnID: number): Promise<void> => {
  return new Promise((resolve) => {
      setTimeout(() => {
          const index = pokemonSpawnData.findIndex((spawn) => spawn.spawnID === spawnID);
          if (index !== -1) {
              pokemonSpawnData.splice(index, 1);
          }
          resolve();
      }, 500); // Simulate a 500ms delay
  });
}
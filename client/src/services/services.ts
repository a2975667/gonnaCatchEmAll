import axios from "axios";

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

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3007';
export const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// all APIs related to Pokémon

export const searchPokemonData = (query: string): Promise<Pokemon[]> => {
  return httpClient
    .get(`/pokemon`, {
      params: { search: query },
    })
    .then((response) => response.data);
};

export const getPokemonByID = (id: number): Promise<Pokemon | undefined> => {
    return httpClient
        .get(`/pokemon/${id}`)
        .then((response) => response.data);
    };

// all APIs related to Pokémon spawns

export const searchPokemonSpawnData = (
  query: number
): Promise<PokemonSpawn[]> => {
  return httpClient
    .get(`/pokemon-spawns/pokemon/${query}`)
    .then((response) => response.data);
};

export const addPokemonSpawn = (newSpawn: Omit<PokemonSpawn, 'spawnID'>): Promise<PokemonSpawn> => {
    return httpClient
        .post(`/pokemon-spawns`, newSpawn)
        .then((response) => response.data);
};

export const updatePokemonSpawn = (updatedSpawn: PokemonSpawn): Promise<void> => {
    return httpClient
        .put(`/pokemon-spawns/${updatedSpawn.spawnID}`, updatedSpawn)
        .then((response) => response.data);
};

export const deletePokemonSpawn = (spawnID: number): Promise<void> => {
    return httpClient
        .delete(`/pokemon-spawns/${spawnID}`)
        .then((response) => response.data);
};
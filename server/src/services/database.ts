import { Pokemon } from "../models/pokemon";
import { PokemonSpawn } from "../models/pokemonSpawn";
import pool from './connection';
import { RowDataPacket } from "mysql2";

export async function getAllPokemon(): Promise<Pokemon[]> {
  const [rows] = await pool.query('SELECT * FROM pokemon.pokemon LIMIT 20;');
  return rows as Pokemon[];
}

export async function getPokemonByPokemonName(pokemonName: string): Promise<Pokemon[]> {
  const queryName = pokemonName.toLowerCase();
  const sqlQuery = 'SELECT * FROM pokemon.pokemon WHERE pokemonName LIKE ?;';
  const [rows] = await pool.query(sqlQuery, [`%${queryName}%`]);
  return rows as Pokemon[];
}

export async function getPokemonByID(pokemonID: number): Promise<Pokemon | undefined> {
  const sqlQuery = 'SELECT * FROM pokemon.pokemon WHERE pokemonID = ?;';
  const [rows] = await pool.query<RowDataPacket[]>(sqlQuery, [pokemonID]);
  return rows[0] as Pokemon;
}

export async function getAllPokemonSpawns(): Promise<PokemonSpawn[]> {
  const sqlQuery = `
    SELECT spawnID, pokemonID AS num, pokemonName AS name, lat, lng, encounter_ms, disappear_ms
    FROM pokemon.pokemon_spawn
    ORDER BY encounter_ms DESC
    LIMIT 10;
  `;
  const [rows] = await pool.query(sqlQuery);
  return rows as PokemonSpawn[];  
}

export async function getPokemonSpawnBySpawnID(spawnID: number): Promise<PokemonSpawn | undefined> {
  const sqlQuery = `
    SELECT spawnID, pokemonID AS num, pokemonName AS name, lat, lng, encounter_ms, disappear_ms
    FROM pokemon.pokemon_spawn
    WHERE spawnID = ?;
  `;
  const [rows] = await pool.query<RowDataPacket[]>(sqlQuery, [spawnID]);
  return rows[0] as PokemonSpawn;
}

export async function getPokemonSpawnByPokemonID(pokemonID: number): Promise<PokemonSpawn[]> {
  const sqlQuery = `
    SELECT spawnID, pokemonID AS num, pokemonName AS name, lat, lng, encounter_ms, disappear_ms
    FROM pokemon.pokemon_spawn
    WHERE pokemonID = ?
    ORDER BY encounter_ms DESC
    LIMIT 10;
  `;
  const [rows] = await pool.query(sqlQuery, [pokemonID]);
  return rows as PokemonSpawn[];
}

export async function addPokemonSpawn(spawn: Omit<PokemonSpawn, 'spawnID'>): Promise<void> {
  const sqlQuery = `
    INSERT INTO pokemon.pokemon_spawn
      (pokemonID, pokemonName, lat, lng, encounter_ms, disappear_ms)
    VALUES (?, ?, ?, ?, ?, ?);
  `;
  await pool.query(sqlQuery, [
    spawn.num,
    spawn.name,
    spawn.lat,
    spawn.lng,
    spawn.encounter_ms,
    spawn.disappear_ms
  ]);
}

export async function updatePokemonSpawn(spawn: PokemonSpawn): Promise<void> {
  const sqlQuery = `
    UPDATE pokemon.pokemon_spawn
    SET pokemonID = ?, pokemonName = ?, lat = ?, lng = ?, encounter_ms = ?, disappear_ms = ?
    WHERE spawnID = ?;
  `;
  await pool.query(sqlQuery, [
    spawn.num,
    spawn.name,
    spawn.lat,
    spawn.lng,
    spawn.encounter_ms,
    spawn.disappear_ms,
    spawn.spawnID
  ]);
}

export async function deletePokemonSpawnbyID(spawnID: number): Promise<void> {
  const sqlQuery = 'DELETE FROM pokemon.pokemon_spawn WHERE spawnID = ?;';
  await pool.query(sqlQuery, [spawnID]);
}

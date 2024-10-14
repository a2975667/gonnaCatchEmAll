import React, { useState, useEffect } from "react";
import { Pokemon } from "../../services/services";
import { Link } from "react-router-dom";

interface PokemonListProps {
  pokemonData: Pokemon[];
}

const getPokemonImage = async (pokemonName: string): Promise<string | null> => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.sprites.front_default;
  } catch (error) {
    console.error("Failed to fetch Pokemon image:", error);
    return null;
  }
};

const PokemonList: React.FC<PokemonListProps> = ({ pokemonData }) => {
  const [pokemonImages, setPokemonImages] = useState<{
    [key: number]: string | null;
  }>({});

  useEffect(() => {
    const fetchImages = async () => {
      const images: { [key: number]: string | null } = {};
      for (const pokemon of pokemonData) {
        const imageUrl = await getPokemonImage(pokemon.pokemonName);
        images[pokemon.pokemonID] = imageUrl;
      }
      setPokemonImages(images); // Set the images once all have been fetched
    };

    fetchImages();
  }, [pokemonData]); // Runs whenever pokemonData changes

  return (
    <ul className="divide-y divide-gray-200">
      {pokemonData.map((pokemon) => (
        <li key={pokemon.pokemonID} className="flex py-4">
          <img
            className="h-13 w-13 rounded-full"
            src={
              pokemonImages[pokemon.pokemonID] ||
              "https://archives.bulbagarden.net/media/upload/thumb/0/00/Bag_Pok%C3%A9_Ball_SV_Sprite.png/80px-Bag_Pok%C3%A9_Ball_SV_Sprite.png"
            }
            alt={pokemon.pokemonName}
          />
          <div className="ml-3 py-5">
            <p className="text-xl font-medium text-gray-900">
              {pokemon.pokemonName}
            </p>
            <p className="text-xl text-gray-500">
              {pokemon.type1} {pokemon.type2 ? `/ ${pokemon.type2}` : ""}
            </p>
          </div>
          <div className="ml-auto py-8">
            <Link className="text-indigo-600 hover:text-indigo-900 flex items-center" to={`/searchPokemon/${pokemon.pokemonID}`}>
              See stats and Spawns
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PokemonList;

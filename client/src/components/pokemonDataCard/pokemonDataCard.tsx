import React, { useEffect } from "react";
import { Pokemon } from "../../services/services";

const getPokemonImage = async (pokemonName: string): Promise<string | null> => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.sprites.other["official-artwork"].front_default;
  } catch (error) {
    console.error("Failed to fetch Pokemon image:", error);
    return null;
  }
};

const PokemonDataCard: React.FC<{ pokemon: Pokemon }> = ({ pokemon }) => {

  const [pokemonImageURL, setPokemonImageURL] = React.useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      const imageUrl = await getPokemonImage(pokemon.pokemonName);
      setPokemonImageURL(imageUrl);
    };

    fetchImage();
  }, [pokemon.pokemonName]);

  const pokemonStats = [
    { label: 'Total Stats', value: pokemon.total },
    { label: 'HP', value: pokemon.hp },
    { label: 'Attack', value: pokemon.attack },
    { label: 'Defense', value: pokemon.defense },
    { label: 'Sp. Attack', value: pokemon.spAtk },
    { label: 'Sp. Defense', value: pokemon.spDef },
    { label: 'Speed', value: pokemon.speed },
    { label: 'Generation', value: pokemon.generation }
  ];

  // Split stats array into two halves
  const half = Math.ceil(pokemonStats.length / 2);
  const firstColumnStats = pokemonStats.slice(0, half);
  const secondColumnStats = pokemonStats.slice(half);

  return (
    <section>
      <div className="container px-6 m-auto">
        <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
          {/* Left side (3/12): Pokémon Image */}
          <div className="col-span-4 lg:col-span-4">
            {/* Placeholder for the Pokémon image */}
            <img
              src={pokemonImageURL || "https://archives.bulbagarden.net/media/upload/thumb/0/00/Bag_Pok%C3%A9_Ball_SV_Sprite.png/80px-Bag_Pok%C3%A9_Ball_SV_Sprite.png"}
              alt={pokemon.pokemonName}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Right side (9/12): Pokémon Details */}
          <div className="col-span-8 lg:col-span-8 lg:px-10 py-20">
            <div className="px-4 sm:px-0">
              <h3 className="text-xl font-semibold leading-7 text-gray-900">
              {pokemon.pokemonName}
              </h3>
            </div>

            {/* Pokémon Details List in Two Columns */}
            <div className="mt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* First Column */}
                <dl className="divide-y divide-gray-100">
                  {firstColumnStats.map((stat, index) => (
                    <div key={index} className="py-2 sm:grid sm:grid-cols-3 sm:gap-3">
                      <dt className="text-regular font-medium text-gray-900 px-2">{stat.label}</dt>
                      <dd className="mt-1 text-medium text-gray-700 sm:col-span-2">{stat.value}</dd>
                    </div>
                  ))}
                </dl>

                {/* Second Column */}
                <dl className="divide-y divide-gray-100">
                  {secondColumnStats.map((stat, index) => (
                    <div key={index} className="py-2 sm:grid sm:grid-cols-3 sm:gap-3">
                      <dt className="text-regular font-medium text-gray-900 px-2">{stat.label}</dt>
                      <dd className="mt-1 text-medium text-gray-700 sm:col-span-2">{stat.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PokemonDataCard;

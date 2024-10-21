import React from "react";
import { deletePokemonSpawn, PokemonSpawn } from "../../services/services";

// Helper function to format time from Unix timestamp
const formatDate = (timestamp: number) => {
    if (timestamp === -1) return "Unknown";
    const date = new Date(timestamp);
    return date.toLocaleString();
};

interface PokemonSpawnTimelineProps {
    spawns: PokemonSpawn[];
    pokemonNum: number;
    pokemonName: string;

    onDelete: (spawnID: number) => void;
}

const PokemonSpawnTimeline: React.FC<PokemonSpawnTimelineProps> = ({ spawns, pokemonName, pokemonNum, onDelete }) => {

    const handleDelete = async (spawnID: number) => {
        await deletePokemonSpawn(spawnID);
        onDelete(spawnID);
    };

    return (
        <div className="container mx-auto py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Spawn Timeline</h1>
                {/* Button to add a new spawn */}
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    + New
                </button>
            </div>

            {/* Timeline List */}
            <ul
                aria-label="Spawn history feed"
                role="feed"
                className="relative flex flex-col gap-12 py-12 pl-6 text-sm before:absolute before:top-0 before:left-6 before:h-full before:-translate-x-1/2 before:border before:border-dashed before:border-slate-200 after:absolute after:top-6 after:left-6 after:bottom-6 after:-translate-x-1/2 after:border after:border-slate-200"
            >
                {spawns.map((spawn) => (
                    <li
                        key={spawn.spawnID}
                        role="article"
                        className="relative pl-6 before:absolute before:left-0 before:top-2 before:z-10 before:h-2 before:w-2 before:-translate-x-1/2 before:rounded-full before:bg-emerald-500 before:ring-2 before:ring-white"
                    >
                        <div className="flex flex-col flex-1 gap-2">
                            <h4 className="text-base font-medium leading-7 text-emerald-500">
                                {formatDate(spawn.encounter_ms)}
                            </h4>
                            <p className="text-slate-500">
                                Showed up at latitude {spawn.lat}, longitude {spawn.lng}.
                            </p>

                            {/* Edit and Delete buttons */}
                            <div className="flex space-x-4">
                                <button className="text-indigo-600 hover:text-indigo-900">
                                    Edit
                                </button>
                                <button 
                                    onClick={() => handleDelete(spawn.spawnID)}
                                    className="text-red-600 hover:text-red-900">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PokemonSpawnTimeline;
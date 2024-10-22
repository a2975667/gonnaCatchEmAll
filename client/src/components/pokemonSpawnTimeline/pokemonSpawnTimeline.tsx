import React, { useEffect } from "react";
import { deletePokemonSpawn, PokemonSpawn, updatePokemonSpawn, addPokemonSpawn} from "../../services/services";
import SpawnForm from "../spawnForm/spawnForm";
import { getAddressFromLatLng } from "../../utils/geoTransform";

// Helper function to format time from Unix timestamp
const formatDate = (timestamp: number) => {
    if (timestamp === -1) return "Unknown";
    const date = new Date(timestamp);
    return date.toLocaleString();
};

interface PokemonSpawnTimelineProps {
    spawns: PokemonSpawn[];
    onDelete: (spawnID: number) => void;
    onUpdate: () => void;
    pokemonNum: number;
    pokemonName: string;
}

const PokemonSpawnTimeline: React.FC<PokemonSpawnTimelineProps> = ({ spawns, onDelete, onUpdate, pokemonName, pokemonNum }) => {

    const [isFormVistible, setIsFormVisible] = React.useState(false);
    const [spawnInformationToEdit, setSpawnInformationToEdit] = React.useState<PokemonSpawn | null>(null);
    const [resolvedAddresses, setResolvedAddresses] = React.useState<{ [key: number]: string }>({});

    const handleAddNewSpawn = () => {
        setSpawnInformationToEdit(null);
        setIsFormVisible(true);
    };

    const handleEditSpawn = (spawn: PokemonSpawn) => () => {
        setSpawnInformationToEdit(spawn);
        setIsFormVisible(true);
    };

    const handleDelete = async (spawnID: number) => {
        await deletePokemonSpawn(spawnID);
        onDelete(spawnID);
    };

    const handleFormSubmit = async (spawnData: Omit<PokemonSpawn, 'spawnID' | 'name' | 'num'>) => {
        const completeSpawnData = {
            ...spawnData,
            name: pokemonName,
            num: pokemonNum
        };

        if (spawnInformationToEdit) {
            await updatePokemonSpawn({ ...spawnInformationToEdit, ...completeSpawnData }); // right overwrites left
        } else {
            await addPokemonSpawn(completeSpawnData);
        }

        setSpawnInformationToEdit(null);
        setIsFormVisible(false);
        onUpdate();
    };

    useEffect(() => {
        const resolveAddresses = async () => {
          const newResolvedAddresses: { [key: number]: string } = {};
          for (const spawn of spawns) {
            try {
              const address = await getAddressFromLatLng(spawn.lat, spawn.lng);
              newResolvedAddresses[spawn.spawnID] = address;
            } catch {
              newResolvedAddresses[spawn.spawnID] = `Lat: ${spawn.lat}, Lng: ${spawn.lng}`;  // Fallback to coordinates
            }
          }
          setResolvedAddresses(newResolvedAddresses);
        };
    
        resolveAddresses();
      }, [spawns]);

    return (
        <div className="container mx-auto py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Spawn Timeline</h1>
                {/* Button to add a new spawn */}
                <button 
                onClick={handleAddNewSpawn}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    + New
                </button>
            </div>

            {/* Timeline List */}
            {spawns.length >0 && (<ul
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
                                {resolvedAddresses[spawn.spawnID] || `Lat: ${spawn.lat}, Lng: ${spawn.lng}`}  {/* Show address or fallback */}
                            </p>

                            {/* Edit and Delete buttons */}
                            <div className="flex space-x-4">
                                <button 
                                onClick={handleEditSpawn(spawn)}
                                className="text-indigo-600 hover:text-indigo-900">
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
            </ul>)}
            {
                spawns.length === 0 && (
                    <p className="text-lg text-slate-500">No spawn data available for this Pokémon.</p>
                )
            }
            {
			isFormVistible && (
				<SpawnForm onClose={() => setIsFormVisible(false)} 
				onSubmit={handleFormSubmit}
				defaultSpawnData={spawnInformationToEdit || undefined} />
			)
		}
        </div>
    );
}

export default PokemonSpawnTimeline;
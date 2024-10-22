import React from 'react';
import { PokemonSpawn } from '../../services/services';

interface spawnFormProps {
  onClose: () => void;
  onSubmit: (spawnData: Omit<PokemonSpawn, 'spawnID'| 'name' | 'num'> ) => void;
  defaultSpawnData?: Omit<PokemonSpawn, 'spawnID' | 'name' | 'num'>;
}

const SpawnForm: React.FC<spawnFormProps> = ({ onClose, onSubmit, defaultSpawnData }) => {

  const [lat, setLat] = React.useState<number>(defaultSpawnData?.lat || 0);
  const [lng, setLng] = React.useState<number>(defaultSpawnData?.lng || 0);
  const [encounterTime, setEncounterTime] = React.useState<number>(defaultSpawnData?.encounter_ms || 0);
  const [disappearTime, setDisappearTime] = React.useState<number>(defaultSpawnData?.disappear_ms || 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
        lat, lng, encounter_ms: encounterTime, disappear_ms: disappearTime,
    });
    onClose();
};

return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
          <h2 className="text-lg font-bold mb-4">
            {defaultSpawnData ? 'Edit Pokémon Spawn' : 'Add Pokémon Spawn'}
          </h2>
  
          <form onSubmit={handleSubmit}>
            {/* Latitude Field */}
            <div>
              <label htmlFor="lat" className="block text-sm font-medium text-gray-900">
                Latitude
              </label>
              <input
                id="lat"
                type="number"
                value={lat}
                onChange={(e) => setLat(Number(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
  
            {/* Longitude Field */}
            <div className="mt-4">
              <label htmlFor="lng" className="block text-sm font-medium text-gray-900">
                Longitude
              </label>
              <input
                id="lng"
                type="number"
                value={lng}
                onChange={(e) => setLng(Number(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
  
            {/* Encounter Time Field */}
            <div className="mt-4">
              <label htmlFor="encounterTime" className="block text-sm font-medium text-gray-900">
                Encounter Timestamp (ms)
              </label>
              <input
                id="encounterTime"
                type="number"
                value={encounterTime}
                onChange={(e) => setEncounterTime(Number(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
  
            {/* Disappear Time Field */}
            <div className="mt-4">
              <label htmlFor="disappearTime" className="block text-sm font-medium text-gray-900">
                Disappear Timestamp (ms)
              </label>
              <input
                id="disappearTime"
                type="number"
                value={disappearTime}
                onChange={(e) => setDisappearTime(Number(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
  
            {/* Buttons */}
            <div className="mt-6 flex justify-end gap-x-2">
              <button type="button" className="text-gray-900 font-semibold" onClick={onClose}>
                Cancel
              </button>
              <button
                type="submit"
                className="bg-indigo-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

export default SpawnForm;
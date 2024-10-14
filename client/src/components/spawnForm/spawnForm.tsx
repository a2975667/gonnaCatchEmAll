import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PokemonSpawn } from "../../services/services";
import { getLatLngFromAddress } from "../../utils/geoTransform";

interface spawnFormProps {
  onClose: () => void;
  onSubmit: (spawnData: Omit<PokemonSpawn, "spawnID" | "name" | "num">) => void;
  defaultSpawnData?: Omit<PokemonSpawn, "spawnID" | "name" | "num">;
}

const SpawnForm: React.FC<spawnFormProps> = ({
  onClose,
  onSubmit,
  defaultSpawnData,
}) => {
  const [address, setAddress] = React.useState<string>("");
  const [isResolving, setIsResolving] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const [lat, setLat] = React.useState<number>(defaultSpawnData?.lat || 0);
  const [lng, setLng] = React.useState<number>(defaultSpawnData?.lng || 0);
  const [encounterDate, setEncounterDate] = React.useState<Date | null>(
    defaultSpawnData ? new Date(defaultSpawnData.encounter_ms) : new Date()
  );
  const [disappearDate, setDisappearDate] = React.useState<Date | null>(
    defaultSpawnData ? new Date(defaultSpawnData.disappear_ms) : new Date()
  );

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
    setError(null);
  };

  const handleAddressBlur = async () => {
    if (address) {
        setIsResolving(true);
        try {
            const { lat, lng } = await getLatLngFromAddress(address);
            setLat(lat);
            setLng(lng);
        } catch (error) {
            setError("Failed to fetch coordinates from address. Please check the address or use random location.");
            setLat(Math.random() * 90);
            setLng(Math.random() * 180);
        } finally {
            setIsResolving(false);
        }
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!encounterDate || !disappearDate) {
      alert('Please select valid dates.');
      return;
    }

    onSubmit({
      lat,
      lng,
      encounter_ms: encounterDate.getTime(),
      disappear_ms: disappearDate.getTime(),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-lg font-bold mb-4">
          {defaultSpawnData ? "Edit Pokémon Spawn" : "Add Pokémon Spawn"}
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Address Field */}
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-900"
            >
              Address
            </label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={handleAddressChange}
              onBlur={handleAddressBlur}
              placeholder="Enter the address"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {isResolving && <p className="text-sm text-gray-500 mt-1">Resolving address...</p>}
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
          </div>

          {/* Latitude and Longitude */}
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              Latitude: {lat}, Longitude: {lng}
            </p>
          </div>

          {/* Encounter Date Field */}
          <div className="mt-4">
            <label
              htmlFor="encounterDate"
              className="block text-sm font-medium text-gray-900"
            >
              Encounter Date and Time
            </label>
            <DatePicker
              selected={encounterDate}
              onChange={(date: Date | null) => setEncounterDate(date)}
              showTimeSelect
              dateFormat="Pp"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>

          {/* Disappear Date Field */}
          <div className="mt-4">
            <label
              htmlFor="disappearDate"
              className="block text-sm font-medium text-gray-900"
            >
              Disappear Date and Time
            </label>
            <DatePicker
              selected={disappearDate}
              onChange={(date: Date | null) => setDisappearDate(date)}
              showTimeSelect
              dateFormat="Pp"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-end gap-x-2">
            <button
              type="button"
              className="text-gray-900 font-semibold"
              onClick={onClose}
            >
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

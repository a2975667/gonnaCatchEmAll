import axios from 'axios';

// read the API key from an environment variable

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

/**
 * Converts an address into latitude and longitude using the Google Geocoding API.
 * @param address The address to geocode.
 * @returns An object containing latitude and longitude.
 */
export const getLatLngFromAddress = async (address: string): Promise<{ lat: number; lng: number }> => {
  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
      params: {
        address,
        key: GOOGLE_MAPS_API_KEY,
      },
    });

    if (response.data.status === 'OK') {
      const { lat, lng } = response.data.results[0].geometry.location;
      return { lat, lng };
    } else {
      throw new Error(`Geocoding failed: ${response.data.status}`);
    }
  } catch (error) {
    console.error('Error fetching latitude and longitude:', error);
    throw error;
  }
};

/**
 * Converts latitude and longitude into a human-readable address using the Google Geocoding API.
 * @param lat The latitude.
 * @param lng The longitude.
 * @returns The address as a string.
 */
export const getAddressFromLatLng = async (lat: number, lng: number): Promise<string> => {
  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
      params: {
        latlng: `${lat},${lng}`,
        key: GOOGLE_MAPS_API_KEY,
      },
    });

    if (response.data.status === 'OK') {
      const address = response.data.results[0].formatted_address;
      return address;
    } else {
      throw new Error(`Reverse Geocoding failed: ${response.data.status}`);
    }
  } catch (error) {
    console.error('Error fetching address:', error);
    throw error;
  }
};

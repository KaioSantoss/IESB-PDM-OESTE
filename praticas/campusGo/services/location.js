import * as Location from 'expo-location';

export async function getCurrentPlace() {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      return null;
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    if (!location?.coords) {
      return {
        label: 'Localização indisponível no momento.',
      };
    }

    try {
      const [address] = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (address) {
        const street = [address.street, address.streetNumber].filter(Boolean).join(', ');
        const neighborhood = address.subregion || address.district || address.city;
        const city = address.city || 'localidade';
        const state = address.region || 'região';

        return {
          label: street || neighborhood || `${city} - ${state}`,
          city,
          state,
        };
      }
    } catch (geocodeError) {
      console.log('Erro ao geocodificar:', geocodeError);
    }

    return {
      label: `Latitude ${location.coords.latitude.toFixed(4)}, Longitude ${location.coords.longitude.toFixed(4)}`,
    };
  } catch (error) {
    console.log('Erro ao obter localização:', error);
    return {
      label: 'Não foi possível obter a localização atual.',
    };
  }
}

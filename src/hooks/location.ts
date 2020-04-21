import * as React from 'react';
import * as qs from 'querystring';
import * as api from './api';

interface Location {
  latitude: number;
  longitude: number;
  locality?: string;
  principalSubdivision?: string;
}

interface GeocodeResponse {
  locality: string;
  principalSubdivision: string;
}

export const useCurrentLocation = (): [Location | undefined, () => any] => {
  const { qslat, qslon } = qs.parse(window.location.search.substr(1));
  let initialLocation =
    qslat && qslon
      ? { latitude: Number(qslat), longitude: Number(qslon) }
      : undefined;

  const [location, setLocation] = React.useState<Location | undefined>(
    initialLocation,
  );

  const fetchLocation = React.useCallback(() => {
    return new Promise<Position>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }, []);

  const [_, fetchGeoData] = api.useGet<GeocodeResponse>(
    'https://api.bigdatacloud.net/data/reverse-geocode-client',
  );

  const fetchAll = React.useCallback(async () => {
    try {
      const { coords } = await fetchLocation();

      const geoData = await fetchGeoData({
        latitude: coords.latitude.toString(),
        longitude: coords.longitude.toString(),
      });

      setLocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
        locality: geoData.locality,
        principalSubdivision: geoData.principalSubdivision,
      });
    } catch (e) {
      console.log(e);
    }
  }, [fetchGeoData, fetchLocation]);

  return [location, fetchAll];
};

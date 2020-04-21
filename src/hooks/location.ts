import * as React from 'react';
import * as qs from 'querystring';
import * as api from './api';

interface LocationResponse {
  latitude: number;
  longitude: number;
  locality?: string;
  principalSubdivision?: string;
}

interface GeocodeResponse {
  locality: string;
  principalSubdivision: string;
}

export const useCurrentLocation = (): [
  LocationResponse | undefined,
  () => any,
] => {
  const { qslat, qslon } = qs.parse(window.location.search.substr(1));
  let initialLocation =
    qslat && qslon
      ? { latitude: Number(qslat), longitude: Number(qslon) }
      : undefined;

  const [location, setLocation] = React.useState<LocationResponse | undefined>(
    initialLocation,
  );

  const fetchLocation = React.useCallback(() => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    })
  }, []);

  const geocodeParams = React.useMemo(() => ({
    latitude: `${location?.latitude}`,
    longitude: `${location?.longitude}`
  }), [location]);

  const [geoData, fetchGeoData] = api.useGet<GeocodeResponse>('https://api.bigdatacloud.net/data/reverse-geocode-client', geocodeParams)

  React.useEffect(() => {
    if (!geoData && location) {
      fetchGeoData();
    }
  }, [geoData, fetchGeoData, location])

  React.useEffect(() => {
    if (geoData && location) {
      setLocation({
        latitude: location.latitude,
        longitude: location.longitude,
        locality: geoData.locality,
        principalSubdivision: geoData.principalSubdivision,
      })
    }
  }, [geoData, setLocation, location])

  const fetchAll = React.useCallback(async () => {
    try {
      const result = await fetchLocation();
      console.log(result);
    } catch (e) {
      console.log(e)
    }
  }, [fetchLocation]);

  return [location, fetchAll];
};

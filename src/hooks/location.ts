import * as React from 'react';
import * as qs from 'querystring';

interface LocationResponse {
  latitude: number;
  longitude: number;
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
    navigator.geolocation.getCurrentPosition((result) => {
      setLocation({
        latitude: result.coords.latitude,
        longitude: result.coords.longitude,
      });
    });
  }, []);

  return [location, fetchLocation];
};

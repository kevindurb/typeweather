import * as qs from 'querystring';
import * as api from './api';

interface LocationResponse {
  city?: string;
  country?: string;
  countryCode?: string;
  latitude: number;
  longitude: number;
  region?: string;
  regionName?: string;
  postal?: string;
}

export const useCurrentLocation = (): [
  LocationResponse | undefined,
  () => any,
] => {
  const { lat, lon } = qs.parse(window.location.search.substr(1));
  const [ipLocation, fetchIpLocation] = api.useGet<LocationResponse>(
    'https://ipapi.co/json',
  );

  if (lat && lon) {
    return [{ latitude: Number(lat), longitude: Number(lon) }, () => null];
  }

  return [ipLocation, fetchIpLocation];
};

import * as api from './api';

interface LocationResponse {
  city: string;
  country: string;
  countryCode: string;
  latitude: number;
  longitude: number;
  region: string;
  regionName: string;
  postal: string;
}

export const useCurrentLocation = () => {
  return api.useGet<LocationResponse>('https://ipapi.co/json');
};

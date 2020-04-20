import * as api from './api';

interface LocationResponse {
  city: string
  country: string
  countryCode: string
  lat: number
  lon: number
  region: string
  regionName: string
  zip: string
}

export const useCurrentLocation = () => {
  return api.useGet<LocationResponse>('http://ip-api.com/json');
}

import * as React from 'react';
import * as api from './api';
import { IconType } from '../components/Icon';

const BASE_URL = 'http://api.openweathermap.org/data/2.5';
const TOKEN = process.env.REACT_APP_OPEN_WEATHER_TOKEN as string;

type WeatherIcon =
  '04d';

interface Weather {
  description: string
  icon: WeatherIcon
}

interface CurrentWeather {
  main: {
    feelsLike: number;
    temp: number;
    tempMax: number;
    tempMin: number;
  };
  weather: Weather[]
}

interface OneCall {
}

export const useWeatherData = (lat: number, lon: number) => {
  const url = `${BASE_URL}/onecall`;

  const params = React.useMemo(() => ({
    lat: lat.toString(),
    lon: lon.toString(),
    appid: TOKEN,
    units: 'imperial',
  }), [lat, lon]);

  return api.useGet<OneCall>(url, params);
}

export const useCurrentWeather = (q: string) => {
  const url = `${BASE_URL}/weather`;

  const params = React.useMemo(() => ({
    q,
    appid: TOKEN,
    units: 'imperial',
  }), [q]);

  return api.useGet<CurrentWeather>(url, params);
};

export const useWeatherIcon = (icon: WeatherIcon) => {
  switch (icon) {
    case '04d': {
      return IconType.cloud;
    }
  }
}

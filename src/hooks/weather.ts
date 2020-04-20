import * as React from 'react';
import * as api from './api';
import { IconType } from '../components/Icon';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const TOKEN = process.env.REACT_APP_OPEN_WEATHER_TOKEN as string;

type WeatherIcon = '04d';

interface Weather {
  description: string;
  icon: WeatherIcon;
}

export interface CurrentWeather {
  clouds: number;
  dewPoint: number;
  dt: number;
  feelsLike: number;
  humidity: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  temp: number;
  uvi: number;
  visibility: number;
  weather: Weather[];
  windDeg: number;
  windSpeed: number;
}

export interface DailyWeather {
  clouds: number;
  dewPoint: number;
  dt: number;
  feelsLike: {
    eve: number;
    day: number;
    morn: number;
    night: number;
  };
  humidity: number;
  pressure: number;
  rain: number;
  sunrise: number;
  sunset: number;
  temp: {
    eve: number;
    day: number;
    min: number;
    max: number;
    morn: number;
    night: number;
  };
  weather: Weather[];
}

export interface HourlyWeather {
  clouds: number;
  dewPoint: number;
  dt: number;
  feelsLike: number;
  humidity: number;
  pressure: number;
  temp: number;
  weather: Weather[];
  windDeg: number;
  windSpeed: number;
  rain?: {
    ['1h']: number
  }
}

export interface OneCall {
  current: CurrentWeather;
  daily: DailyWeather[];
  hourly: HourlyWeather[];
}

export const useWeatherData = (lat?: number, lon?: number) => {
  const url = `${BASE_URL}/onecall`;

  const params = React.useMemo(
    () => ({
      lat: (lat ?? 0).toString(),
      lon: (lon ?? 0).toString(),
      appid: TOKEN,
      units: 'imperial',
    }),
    [lat, lon],
  );

  return api.useGet<OneCall>(url, params);
};

export const useWeatherIcon = (icon: WeatherIcon) => {
  switch (icon) {
    case '04d': {
      return IconType.cloud;
    }
  }
};

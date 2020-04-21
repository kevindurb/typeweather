import * as React from 'react';
import { OneCall } from '../hooks/weather';

export const WeatherContext = React.createContext<OneCall | undefined>(
  undefined,
);

import * as React from 'react';
import { CurrentWeather as CurrentWeatherType } from '../hooks/weather';

interface CurrentWeatherProps {
  currentData: CurrentWeatherType;
}

function CurrentWeather({ currentData }: CurrentWeatherProps) {
  return (
    <div className="row justify-content-center my-3">
      <h3>Current</h3>
    </div>
  );
}

export default React.memo(CurrentWeather);

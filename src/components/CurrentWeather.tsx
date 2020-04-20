import * as React from 'react';
import { CurrentWeather as CurrentWeatherType } from '../hooks/weather';

interface CurrentWeatherProps {
  currentData: CurrentWeatherType;
}

function CurrentWeather({ currentData }: CurrentWeatherProps) {
  return (
    <>
      <div className="row justify-content-center my-3">
        <h4 className="text-info text-center col">
          Currently {currentData.temp}&deg; and{' '}
          {currentData.weather[0].description}
        </h4>
      </div>
    </>
  );
}

export default React.memo(CurrentWeather);

import * as React from 'react';
import {
  CurrentWeather as CurrentWeatherType,
  DailyWeather,
} from '../hooks/weather';

interface CurrentWeatherProps {
  currentData: CurrentWeatherType;
  todayData: DailyWeather;
}

function CurrentWeather({ currentData, todayData }: CurrentWeatherProps) {
  return (
    <>
      <div className="row justify-content-center my-3">
        <h1 className="text-center col">
          Currently {currentData.temp}&deg; and{' '}
          {currentData.weather[0].description}
        </h1>
      </div>
      <div className="row justify-content-center mt-3">
        <h2>Today</h2>
      </div>
      <div className="row justify-content-center">
        <h4>
          <span className="text-danger">
            {todayData.temp.max.toFixed(0)}&deg;
          </span>{' '}
          /{' '}
          <span className="text-primary">
            {todayData.temp.min.toFixed(0)}&deg;
          </span>
        </h4>
      </div>
    </>
  );
}

export default React.memo(CurrentWeather);

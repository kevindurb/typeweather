import * as React from 'react';
import * as datefns from 'date-fns';
import * as weather from './hooks/weather';
import * as location from './hooks/location';
import { WeatherContext } from './contexts/weather';
import HourlyTemperature from './components/HourlyTemperature';
import DailyTemperature from './components/DailyTemperature';
import CurrentWeather from './components/CurrentWeather';

function App() {
  const [locationData, fetchLocation] = location.useCurrentLocation();
  const [weatherData, fetchWeather] = weather.useWeatherData(locationData?.latitude, locationData?.longitude);

  React.useEffect(() => {
    if (!locationData) {
      fetchLocation();
    } else if (!weatherData) {
      fetchWeather();
    }
  }, [fetchLocation, fetchWeather, locationData, weatherData]);

  const nowString = React.useMemo(() => datefns.format(new Date(), 'PPPP'), [])

  const locationString = React.useMemo(() => {
    if (!locationData?.locality) {
      return `${locationData?.latitude}, ${locationData?.longitude}`;
    }
    return `${locationData?.locality}, ${locationData?.principalSubdivision}`;
  }, [locationData]);

  if (!weatherData) return null;

  return (
    <WeatherContext.Provider value={weatherData}>
      <div className="container">
        <div className="row justify-content-center">
          <h6 className="text-secondary text-center col">{locationString}</h6>
        </div>
        <div className="row justify-content-center">
          <h6 className="text-secondary text-center col">{nowString}</h6>
        </div>
        <CurrentWeather />
        <HourlyTemperature />
        <DailyTemperature />
      </div>
    </WeatherContext.Provider>
  );
}

export default App


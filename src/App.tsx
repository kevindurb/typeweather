import * as React from 'react';
import * as weather from './hooks/weather';
import * as location from './hooks/location';
import HourlyTemperature from './components/HourlyTemperature';

function App() {
  const [locationData, fetchLocation] = location.useCurrentLocation();
  const [weatherData, fetchWeather] = weather.useWeatherData(locationData?.lat ?? 0, locationData?.lon ?? 0);

  React.useEffect(() => {
    if (!locationData) {
      fetchLocation();
    } else if (!weatherData) {
      fetchWeather();
    }
  }, [fetchLocation, fetchWeather, locationData, weatherData]);

  if (!weatherData) return null;

  return (
    <div className="container">
      <div className="row justify-content-center my-3">
        <h2>{locationData?.city}, {locationData?.region}</h2>
      </div>
      <HourlyTemperature hourlyData={weatherData.hourly} />
    </div>
  );
}

export default App


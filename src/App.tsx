import * as React from 'react';
import * as weather from './hooks/weather';
import * as location from './hooks/location';
import HourlyTemperature from './components/HourlyTemperature';
import DailyTemperature from './components/DailyTemperature';

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
      <div className="row justify-content-center my-3">
        <h3>Hourly</h3>
      </div>
      <HourlyTemperature
        hourlyData={weatherData.hourly}
        maxTemp={weatherData.daily[0]?.temp.max}
        minTemp={weatherData.daily[0]?.temp.min}
      />
      <div className="row justify-content-center my-3">
        <h3>Daily</h3>
      </div>
      <DailyTemperature
        dailyData={weatherData.daily}
      />
    </div>
  );
}

export default App


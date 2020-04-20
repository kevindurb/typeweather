import * as React from 'react';
import * as datefns from 'date-fns';
import * as weather from './hooks/weather';
import * as location from './hooks/location';
import HourlyTemperature from './components/HourlyTemperature';
import DailyTemperature from './components/DailyTemperature';
import CurrentWeather from './components/CurrentWeather';

function App() {
  const [locationData, fetchLocation] = location.useCurrentLocation();
  const [weatherData, fetchWeather] = weather.useWeatherData(locationData?.lat ?? 0, locationData?.lon ?? 0);
  const [now, setNow] = React.useState(new Date());

  React.useEffect(() => {
    if (!locationData) {
      fetchLocation();
    } else if (!weatherData) {
      fetchWeather();
    }
  }, [fetchLocation, fetchWeather, locationData, weatherData]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date())
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  const nowString = React.useMemo(() => datefns.format(now, 'PPpp'), [now])

  if (!weatherData) return null;

  return (
    <div className="container">
      <div className="row justify-content-center">
        <h6 className="text-secondary text-center col">{locationData?.city}, {locationData?.region}</h6>
      </div>
      <div className="row justify-content-center">
        <h6 className="text-secondary text-center col">{nowString}</h6>
      </div>
      <CurrentWeather
        currentData={weatherData.current}
      />
      <HourlyTemperature
        hourlyData={weatherData.hourly}
        maxTemp={weatherData.daily[0]?.temp.max}
        minTemp={weatherData.daily[0]?.temp.min}
      />
      <DailyTemperature
        dailyData={weatherData.daily}
      />
    </div>
  );
}

export default App


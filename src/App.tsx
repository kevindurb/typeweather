import * as React from 'react';
import * as weather from './hooks/weather';
import * as form from './hooks/form';
import Icon from './components/Icon';

function App() {
  const [location, setLocation] = form.useInputValue('Colorado Springs')
  const [data, execute] = weather.useCurrentWeather(location);

  const iconType = weather.useWeatherIcon(data?.weather[0].icon!);

  React.useEffect(() => {
    execute();
  }, [execute]);

  return (
    <div className="container">
      <div className="row justify-content-center my-3">
        <input
          type="text"
          value={location}
          onChange={setLocation}
          className="col-6"
        />
      </div>
      <div className="row justify-content-center my-3">
        <h2>{data?.weather[0].description}</h2>
      </div>
      <div className="row justify-content-center my-3">
        <Icon type={iconType} size={128}/>
      </div>
    </div>
  );
}

export default App;

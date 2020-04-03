import * as React from 'react';
import * as weather from './hooks/weather';

function App() {
  const [data, execute] = weather.useCurrentWeather('Colorado Springs');

  React.useEffect(() => {
    execute();
  }, [execute]);

  console.log(data);

  return (
    <div className="App">
    </div>
  );
}

export default App;

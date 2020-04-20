import * as React from 'react';
import * as Recharts from 'recharts';
import * as datefns from 'date-fns';
import { HourlyWeather } from '../hooks/weather';
import * as dom from '../hooks/dom';

interface HourlyTemperatureProps {
  hourlyData: HourlyWeather[];
  maxTemp: number;
  minTemp: number;
}

function HourlyTemperature({
  hourlyData,
  maxTemp,
  minTemp,
}: HourlyTemperatureProps) {
  const [container, width] = dom.useRefWidth<HTMLDivElement>();

  const subset = React.useMemo(() => hourlyData.slice(0, 24), [hourlyData]);
  const height = React.useMemo(() => width * (9 / 16), [width]);
  const domain = React.useMemo(() => ['dataMin', 'dataMax'], []);
  const xFormatter = React.useCallback(
    (dt: number) => datefns.format(dt * 1000, 'haaaaa'),
    [],
  );

  const margin = React.useMemo(
    () => ({
      top: 4,
      right: 4,
      left: 4,
      bottom: 0,
    }),
    [],
  );

  return (
    <>
      <div className="row justify-content-center my-3">
        <h3>Hourly</h3>
      </div>
      <div className="row justify-content-center my-3">
        <h5>
          <span className="text-danger">{maxTemp.toFixed(0)}&deg;</span> /{' '}
          <span className="text-primary">{minTemp.toFixed(0)}&deg;</span>
        </h5>
      </div>
      <div ref={container}>
        <Recharts.LineChart
          data={subset}
          width={width}
          height={height}
          margin={margin}
        >
          <Recharts.CartesianGrid strokeDasharray="3 3" stroke="#6c757d" />
          <Recharts.XAxis
            dataKey="dt"
            tickFormatter={xFormatter}
            axisLine={false}
          />
          <Recharts.YAxis
            hide={true}
            dataKey="temp"
            domain={domain as [Recharts.AxisDomain, Recharts.AxisDomain]}
          />
          <Recharts.Line
            type="monotone"
            dataKey="temp"
            stroke="#343a40"
            strokeWidth={2}
            isAnimationActive={false}
            dot={false}
          />
          <Recharts.Tooltip
            labelFormatter={xFormatter as Recharts.LabelFormatter}
          />
          <Recharts.ReferenceLine
            y={maxTemp}
            stroke="#dc3545"
            strokeWidth={2}
          />
          <Recharts.ReferenceLine
            y={minTemp}
            stroke="#007bff"
            strokeWidth={2}
          />
        </Recharts.LineChart>
      </div>
    </>
  );
}

export default React.memo(HourlyTemperature);

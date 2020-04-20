import * as React from 'react';
import * as Recharts from 'recharts';
import { DailyWeather } from '../hooks/weather';
import * as dom from '../hooks/dom';

interface DailyTemperatureProps {
  dailyData: DailyWeather[];
}

function DailyTemperature({ dailyData }: DailyTemperatureProps) {
  const [container, width] = dom.useRefWidth<HTMLDivElement>();

  const subset = React.useMemo(() => dailyData.slice(0, 7), [dailyData]);
  const height = React.useMemo(() => width * (9 / 16), [width]);
  const domain = React.useMemo(() => ['dataMin', 'dataMax'], []);
  const xFormatter = React.useCallback((dt: number) => {
    const date = new Date(dt * 1000);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  }, []);

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
        <h3>Daily</h3>
      </div>
      <div ref={container}>
        <Recharts.LineChart
          data={subset}
          width={width}
          height={height}
          margin={margin}
        >
          <Recharts.XAxis
            dataKey="dt"
            tickFormatter={xFormatter}
            axisLine={false}
          />
          <Recharts.YAxis
            hide={true}
            domain={domain as [Recharts.AxisDomain, Recharts.AxisDomain]}
          />
          <Recharts.Line
            type="monotone"
            dataKey="temp.max"
            stroke="#dc3545"
            strokeWidth={2}
          />
          <Recharts.Line
            type="monotone"
            dataKey="temp.min"
            stroke="#007bff"
            strokeWidth={2}
          />
          <Recharts.Tooltip
            labelFormatter={xFormatter as Recharts.LabelFormatter}
          />
        </Recharts.LineChart>
      </div>
    </>
  );
}

export default React.memo(DailyTemperature);

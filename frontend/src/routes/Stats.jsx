import React, { useEffect, useState } from 'react';
import {
  CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis,
} from 'recharts';
import Loader from 'react-loader-spinner';
import getStats from '../internalapi/stats';
import '../css/Stats.scss';

export default function Stats() {
  const [counts, setCounts] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(async () => {
    const m = await getStats();
    setCounts(m.counts);
    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <Loader
        className="loader"
        type="Grid"
        color="#00BFFF"
        height={25}
        width={25}
      />
    );
  }

  return (
    <LineChart className="chart" width={600} height={300} data={counts}>
      <Legend verticalAlign="top" height={36} />
      <Line name="Server Count" type="monotone" dataKey="guild_count" stroke="#a7a3ff" />
      <Line name="Subscribed Channel Count" type="monotone" dataKey="subscribed_count" stroke="#13f088" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
}

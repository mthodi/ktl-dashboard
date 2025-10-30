import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatDate } from '@/_utilities/formatters';

/**
 * LocalityTrendChart Component
 * Displays locality score trend over time as a line chart
 */
export default function LocalityTrendChart({ data }) {
  const [mounted, setMounted] = useState(false);

  // Prevent SSR issues with Recharts
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !data || data.length === 0) {
    return <div className="text-center py-8">Loading chart...</div>;
  }

  const chartData = data.map(item => ({
    date: formatDate(item.date),
    score: item.locality_score
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="score"
          stroke="#1890ff"
          activeDot={{ r: 8 }}
          name="Locality Score"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

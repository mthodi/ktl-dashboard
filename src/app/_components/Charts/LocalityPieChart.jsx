import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

/**
 * LocalityPieChart Component
 * Displays byte-weighted locality distribution as a pie chart
 */
export default function LocalityPieChart({ data }) {
  const [mounted, setMounted] = useState(false);

  // Prevent SSR issues with Recharts
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !data) {
    return <div className="text-center py-8">Loading chart...</div>;
  }

  const chartData = [
    {
      name: 'Local Traffic',
      value: data.local_bytes,
      percentage: data.local_percentage
    },
    {
      name: 'External Traffic',
      value: data.external_bytes,
      percentage: data.external_percentage
    }
  ];

  const COLORS = ['#52c41a', '#1890ff'];

  const renderLabel = ({ name, percentage }) => {
    return `${name}: ${percentage}%`;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

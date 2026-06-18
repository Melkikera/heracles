import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function BacklogStats() {
  const data = [
    { type: 'Feature', count: 12 },
    { type: 'Bug', count: 5 },
    { type: 'Initiative', count: 3 },
  ];

  return (
    <div className="stats-card">
      <h3>Backlog par Type</h3>
      <BarChart width={300} height={200} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="type" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#4f46e5" />
      </BarChart>
    </div>
  );
}
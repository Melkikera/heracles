import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { RoadmapItem } from '../Roadmap/RoadmapCard';

const COLORS = ['#4f46e5', '#ef4444', '#10b981', '#f59e0b'];

export function RoadmapStats({ items }: { items: RoadmapItem[] }) {
  const q1 = items.filter((i) => i.quarter?.includes('Q1')).length;
  const q2 = items.filter((i) => i.quarter?.includes('Q2')).length;
  const q3 = items.filter((i) => i.quarter?.includes('Q3')).length;
  const q4 = items.filter((i) => i.quarter?.includes('Q4')).length;

  const data = [
    { name: 'Q1', value: q1 },
    { name: 'Q2', value: q2 },
    { name: 'Q3', value: q3 },
    { name: 'Q4', value: q4 },
  ].filter((item) => item.value > 0);

  return (
    <article className="chart-card">
      <span className="chart-card__label">Total roadmap</span>
      <strong className="chart-card__value">{items.length}</strong>
      <span className="chart-card__hint">All roadmap items</span>

      <div className="chart-container">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={90}
              label
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}
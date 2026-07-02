import type { BacklogItem } from '../Backlog/BacklogCard';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#4f46e5', '#ef4444', '#10b981', '#f59e0b'];

export function BacklogStats({ items }: { items: BacklogItem[] }) {
  const features = items.filter((i) => i.type === 'feature').length;
  const bugs = items.filter((i) => i.type === 'bug').length;
  const inProgress = items.filter((i) => i.status === 'in_progress').length;
  const other = Math.max(items.length - features - bugs - inProgress, 0);

  const data = [
    { name: 'Features', value: features },
    { name: 'Bugs', value: bugs },
    { name: 'In progress', value: inProgress },
    { name: 'Other', value: other },
  ].filter((item) => item.value > 0);

  return (
    <article className="chart-card">
      <span className="chart-card__label">Total backlog</span>
      <strong className="chart-card__value">{items.length}</strong>
      <span className="chart-card__hint">All backlog elements</span>

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
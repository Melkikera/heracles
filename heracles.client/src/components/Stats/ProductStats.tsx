import type { Product } from '../../types/product';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#4f46e5', '#ef4444', '#10b981', '#f59e0b'];

export function ProductStats({ products, totalCount }: { products: Product[]; totalCount: number }) {
  const activeCount = products.filter((p) => p.isActive).length;
  const inactiveCount = products.filter((p) => !p.isActive).length;
  const totalImages = products.reduce((acc, p) => acc + (p.images?.length ?? 0), 0);
  const totalTags = products.reduce((acc, p) => acc + (p.tags?.length ?? 0), 0);

  const data = [
    { name: 'Active', value: activeCount },
    { name: 'Inactive', value: inactiveCount },
    { name: 'Images', value: totalImages },
    { name: 'Tags', value: totalTags },
  ].filter((item) => item.value > 0);

  return (
    <article className="chart-card">
      <span className="chart-card__label">Product statistics</span>
      <strong className="chart-card__value">{totalCount}</strong>
      <span className="chart-card__hint">All items in database</span>

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
// src/components/common/StatsGrid.tsx
import './stats.css';

type StatsGridProps = {
  children: React.ReactNode;
};

export function StatsGrid({ children }: StatsGridProps) {
  return <section className="stats-grid">{children}</section>;
}